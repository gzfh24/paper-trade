import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAssets, setCurrentAsset, buyAsset } from "../slices/assetsSlice";


// useEffect to dispatch loadAssets on mount
function Portfolio() {
    const dispatch = useDispatch();
    useEffect(async () => {
        const response = await fetch('http://localhost:3000/api/portfolio', {
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json();
        console.log(data);
        // data is in form [ARRAY]
        // for (const asset of data) {
        //   state.totalAssets++;
        //   // make a fetch request for each asset to get current price and sum up the value
        // }
        // dispatch(loadAssets(data));
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
                body: JSON.stringify({asset: currentAsset, quantity})
            })
            const data = await response.json();
            console.log(data);
            dispatch(buyAsset(data));
        } catch {
            console.log('Buy asset failed')
        }
    }

    return (
        <>
            <form onSubmit={handleLookup}>
                <input name="asset" type="text" placeholder="AAPL, GOOG, ..."></input>
                <input type="submit" value="Lookup"></input>
            </form>
            <div>
            {quote.price !== undefined && (
                <div>
                    <span>{`Price: ${quote.price} ${quote.currency}`}</span>
                    <form onSubmit={handleBuy}>
                        <input name="quantity" type="text" ></input>
                        <input type="submit" value="Buy"></input>
                    </form>
                </div>
            )}
            </div>
        </>

    )
}

export default Portfolio