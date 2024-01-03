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
        <form onSubmit={handleSignup}>
            <input name="username" type="text" placeholder="username"></input>
            <input name="password" type="password"></input>
            <input type="submit" value="create user"></input>
        </form>
    )
}

export default Signup;