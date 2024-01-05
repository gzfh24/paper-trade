import React from 'react';
import Asset from './Asset';
import { useSelector } from 'react-redux';

const PortfolioDisplay = props => {
    const assetList = useSelector((state) => state.assets.assetList);
    const assetListMapped = assetList.map((items, index) => <Asset items = {items} key = {index} updatePortfolio = {props.updatePortfolio}/>)
    return (
        <div>
            <h4>My Assets</h4>
            {assetListMapped}
        </div>
    )
}

export default PortfolioDisplay