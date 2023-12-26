import React from "react";

function Login() {
    return (
        <form method='POST' action='/api/login'>
            <input name="username" type="text" placeholder="username"></input>
            <input name="password" type="password"></input>
            <input type="submit" value="create user"></input>
        </form>
    )
}

export default Login;