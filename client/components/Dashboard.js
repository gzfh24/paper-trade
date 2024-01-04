import React from "react";
import { useSelector } from "react-redux";

const Dashboard = props => {
    const portfolioValue = useSelector((state) => state.assets.portfolioValue);
    const cashValue = useSelector((state) => state.assets.cashValue);
    return (
        <div>
            <h4>Portfolio Value: {portfolioValue.toFixed(2)}</h4>
            <h4>Cash Value: {cashValue.toFixed(2)}</h4>
        </div>
    )
}

export default Dashboard;