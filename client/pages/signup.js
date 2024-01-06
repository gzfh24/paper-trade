import React from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    async function handleSignup(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        try {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({username, password})
            })
            console.log(response);
            const data = await response.json();
            if (data.value === true) {
                navigate('/portfolio')
            } else {
                throw new Error;
            }
        } catch {
            alert("Signup failed");
        }
    }
    return (
        <div className="columnContainer">
            <div>
                <h1>PaperTrade</h1>
            </div>
            <form className="formContainer" onSubmit={handleSignup}>
                <input className = "loginInput" name="username" type="text" placeholder="Username"></input>
                <input className = "loginInput" name="password" type="password" placeholder="Password"></input>
                <input type="submit" value="Signup" className="primaryButton"></input>
            </form>
        </div>
    )
}

export default Signup;