import React from "react";
import { useSelector } from "react-redux";

const Dashboard = props => {
    const portfolioValue = useSelector((state) => state.assets.portfolioValue);
    const cashValue = useSelector((state) => state.assets.cashValue);
    return (
        <div class="formContainer">
            <span class="money">Portfolio Value: ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span class="money">Cash Value: ${cashValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
    )
}

export default Dashboard;