import React from "react";
import { useDispatch } from "react-redux";
import { loadAssets } from "../slices/assetsSlice";

const App = props => {
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
        const newState = await props.updatePortfolio(data);
        console.log(newState);
        dispatch(loadAssets(newState));
    } catch {
        console.log('Sell asset failed')
    }
  }
    return (
        <div>
          <ul style={{listStyle:'none'}}>
            <li><b>Name:</b> {props.items.assetName}</li>
            <li><b>Type:</b> {props.items.assetType}</li>
            <li><b>Symbol:</b> {props.items.assetSymbol}</li>
            <li><b>Quantity:</b> {props.items.quantity}</li>
            <li><b>Price:</b> {props.items.price.toFixed(2)}</li>
          </ul>
          <form onSubmit={handleSell}>
            <input name="quantity" type="text" placeholder="Quantity" ></input>
            <input type="submit" value="Sell"></input>
          </form>
        </div>
      );
}

export default App;