import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAssets, setCurrentAsset, buyAsset } from "../slices/assetsSlice";
import PortfolioDisplay from "../components/PortfolioDisplay"
import Dashboard from "../components/Dashboard"

// useEffect to dispatch loadAssets on mount
function Portfolio() {
    async function updatePortfolio(portfolio) {
        let portfolioValue = portfolio.cash;
        for (const curr of portfolio.assets) {
            try {
                const response = await fetch('http://localhost:3000/api/lookup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({asset: curr.assetSymbol})
                });
                const priceData = await response.json();
                const price = priceData.regularMarketPrice;
                curr.price = price;
                curr.priceChange = priceData.regularMarketChangePercent;
                portfolioValue += (curr.quantity * price);
            } catch {
                console.log('error fetching data for', curr.assetName);
            }
        }
        const newState = {
            totalAssets: portfolio.assets.length,
            portfolioValue,
            cashValue: portfolio.cash,
            assetList: portfolio.assets,
        }
        return newState
    }

    const dispatch = useDispatch();
    useEffect(async () => {
        const response = await fetch('http://localhost:3000/api/portfolio', {
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json();
        const newState = await updatePortfolio(data);
        console.log(newState);
        dispatch(loadAssets(newState));
    }, []);

    const [quote, setQuote] = useState({});

    async function handleLookup(event) {
        event.preventDefault();
        const asset = event.target.asset.value;
        dispatch((setCurrentAsset(asset)));
        try {
            const response = await fetch('http://localhost:3000/api/lookup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({asset})
            })
            const data = await response.json();
            setQuote({
                price: data.regularMarketPrice,
                currency: data.currency
            });
        } catch {
            console.log('Lookup failed');
        }
    }
    const currentAsset = useSelector((state) => state.assets.currentAsset)
    async function handleBuy(event) {
        event.preventDefault();
        const quantity = event.target.quantity.value;
        try {
            const response = await fetch('http://localhost:3000/api/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({asset: currentAsset, quantity})
            })
            const data = await response.json();
            if (data.value === false) {
                alert('Insufficient Funds')
            }
            const newState = await updatePortfolio(data);
            console.log(newState);
            dispatch(loadAssets(newState));
        } catch {
            console.log('Buy asset failed')
        }
    }

    return (
        <>
            <h2>PaperTrade</h2>
            <Dashboard/>
            <form onSubmit={handleLookup}>
                <input name="asset" type="text" placeholder="AAPL, GOOG, ..."></input>
                <input type="submit" value="Lookup" class="primaryButton"></input>
            </form>
            <div>
            {quote.price !== undefined && (
                <div>
                    <span>{`Price: ${quote.price} ${quote.currency}`}</span>
                    <form onSubmit={handleBuy}>
                        <input name="quantity" type="text" placeholder="Quantity"></input>
                        <input type="submit" value="Buy" class="primaryButton"></input>
                    </form>
                </div>
            )}
            </div>
            <PortfolioDisplay updatePortfolio={updatePortfolio}/>
        </>

    )
}

export default Portfolio