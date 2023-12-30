import React from "react";
import { useState, useEffect } from "react";

function Portfolio() {
    const [quote, setQuote] = useState({});

    async function handleLookup(event) {
        event.preventDefault();
        const asset = event.target.asset.value;
        try {
            const response = await fetch('http://localhost:3000/api/lookup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({asset})
            })
            const data = await response.json();
            // const data = await response.json();
            setQuote(data);
        } catch {
            alert('Lookup failed');
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
                </div>
            )}
            </div>
        </>

    )
}

export default Portfolio