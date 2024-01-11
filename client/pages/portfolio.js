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
                currency: data.currency,
                name: data.shortName
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
        <div className="portfolioContainer">
            <div className="container">
                <h2>PaperTrade</h2>
                <Dashboard/>
                <form className="horizontalContainer"onSubmit={handleLookup}>
                    <input className="lookupInput"name="asset" type="text" placeholder="AAPL, GOOG, ..."></input>
                    <input type="submit" value="Lookup" className="primaryButton"></input>
                </form>
                <div>
                {quote.price !== undefined && (
                    <div className="moreInfoContainer">
                        <div><span>{`Name: ${quote.name}`}</span></div>
                        <div><span>{`Price: ${quote.price} ${quote.currency}`}</span></div>
                        <form className="horizontalContainer" onSubmit={handleBuy}>
                            <input className="sellInput"name="quantity" type="text" placeholder="Quantity"></input>
                            <input className="buyButton"type="submit" value="Buy" ></input>
                        </form>
                    </div>
                )}
                </div>
                <PortfolioDisplay updatePortfolio={updatePortfolio}/>
            </div>
        </div>

    )
}

export default Portfolio