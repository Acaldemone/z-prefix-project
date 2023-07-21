import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import './login.css'

export default function Login () {
    const [userId, setUserId] = useState(null)
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggedOn, setIsLoggedOn] = useState(false);
    const [token, setToken] = useState('');
    const navigate = useNavigate()
   
    const loginAccount = async () => {
        try {
           const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });

            if (response.ok) {
                const data = await response.json()
                console.log(data.id)
                setIsLoggedOn(true);
                setToken(data.token);
                setUserId(data.id);
                console.log(userId)
                Cookies.set("token", data.token);
                Cookies.set("user_id", data.id);
                navigate(`/users/${data.id}`);
                setUserName('');
                setPassword('');
        
              } 
              console.log(userId)
        } catch (error) {
          console.error('An error occurred during login:', error);
        }
    }
    return(
        
        <div className = 'loginContainer'>
            <div>
                <Link to="/login/createAccount" >
                    Create account
                </Link>
                <p></p>
                <Link to="/" >
                    Inventory
                </Link>
            </div>
            {isLoggedOn && <p>{username} is logged on!</p>}
            <h2>Login</h2>
            <input placeholder="Username" value={username} type="username" onChange={(e) => setUserName(e.target.value)} />
            <input placeholder="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => loginAccount()}>Login</button>
            
        </div>
    )
}