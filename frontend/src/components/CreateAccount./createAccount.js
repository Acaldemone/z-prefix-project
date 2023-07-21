
import { useState } from "react"
import './createAccount.css'
import { Link } from "react-router-dom"

export default function CreateAccount () {
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/login/createAccount', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                first_name: first_name,
                last_name: last_name,
                username: username,
                password: password,
                role_id: 1,
              }),
            });
        
            if (response.ok) {
                setFirstName('');
                setLastName('');
                setUsername('');
                setPassword('');
            } else {
              return console.log(await response.json())
            }
          } catch (error) {
            console.error('An error occurred during account creation:', error);
          }
        };
    return(
        <div className="createAccountContainer">
            <div>
            <Link to="/login" >
                    Login
                </Link>
            </div>
            <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="first_name" value="First Name"> First Name:
                        <input
                            id="first_name"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            type="text"
                            required
                        />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="last_name" value="Last Name" > Last Name:
                        <input
                            id="last_name"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            type="text"
                            required
                        />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="username" value="Username" > Username:
                        <input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            type="username"
                            required
                        />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="password" value="Password" > Password:
                        <input
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            type="password"
                            required
                        />
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
        </div>
    )
}