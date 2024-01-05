import React from "react";
import { Link } from "react-router-dom"

function Home() {
    return (
        <div class="columnContainer">
            <div>
                <h1>PaperTrade</h1>
            </div>
            <div>
                <Link to="/login"><button class="primaryButton"><span class="button_text">Login</span></button></Link>
                <Link to="/signup"><button class="secondaryButton"><span class="button_text">Signup</span></button></Link>
            </div>
        </div>

    )
}

export default Home;