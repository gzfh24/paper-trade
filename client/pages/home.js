import React from "react";
import { Link } from "react-router-dom"

function Home() {
    return (
        <div className="columnContainer">
            <div>
                <h1>PaperTrade</h1>
            </div>
            <div className="horizontalContainer">
                <Link to="/login"><button className="primaryButton"><span className="button_text">Login</span></button></Link>
                <Link to="/signup"><button className="secondaryButton"><span className="button_text">Signup</span></button></Link>
            </div>
        </div>

    )
}

export default Home;