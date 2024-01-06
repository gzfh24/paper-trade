import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadAssets } from "../slices/assetsSlice";

const App = props => {
  const [moreInfo, setMoreInfo] = useState(false)
  const handleDropDown = () => {
    moreInfo ? setMoreInfo(false) : setMoreInfo(true);
  }
  const dispatch = useDispatch();
  const handleSell = async (event) => {
    event.preventDefault();
    const quantity = event.target.quantity.value;
    try {
        const response = await fetch('http://localhost:3000/api/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({asset:props.items.assetSymbol, assetId: props.items._id.toString(), quantity})
        })
        const data = await response.json();
        if (data.value === false) {
          alert('Maximum quantity exceeded')
        }
        const newState = await props.updatePortfolio(data);
        console.log(newState);
        dispatch(loadAssets(newState));
    } catch {
        console.log('Sell asset failed')
    }
  }
    return (
      <div>
        <div className="assetContainer">
          <div><span className="bold">{props.items.assetSymbol}</span></div>
          <div><span className={props.items.priceChange >= 0 ? "positive" : "negative"}>{props.items.priceChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</span></div>
          <div><span>${props.items.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
          <div><button className="moreInfoArrow" onClick={handleDropDown}></button></div>
        </div>
        <div>
          {moreInfo === true && (
            <div className="moreInfoContainer">
            <ul style={{listStyle:'none'}}>
            <li>Name: {props.items.assetName}</li>
            <li>Type: {props.items.assetType}</li>
            <li>Quantity: {props.items.quantity}</li>
            </ul>
          <form className="horizontalContainer"onSubmit={handleSell}>
            <input className="sellInput" name="quantity" type="text" placeholder="Quantity" ></input>
            <input className="sellButton" type="submit" value="Sell"></input>
          </form>
            </div>
          )}
        </div>
      </div>
      );
}

export default App;