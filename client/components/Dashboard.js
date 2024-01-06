import React from "react";
import { useSelector } from "react-redux";

const Dashboard = props => {
    const portfolioValue = useSelector((state) => state.assets.portfolioValue);
    const cashValue = useSelector((state) => state.assets.cashValue);
    return (
        <div className="dashboardContainer">
            <div><span className="money">Portfolio Value: ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
            <div><span className="money">Cash Value: ${cashValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
        </div>
    )
}

export default Dashboard;