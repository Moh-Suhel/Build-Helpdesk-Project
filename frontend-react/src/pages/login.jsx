import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
    const[username, setUsername] = useState("")
    const[email, setEmail] = useState("")
    const[password , setPassword] = useState("")
    const[message, setMessage] = useState("")

   async function handleSubmit(event) {
           event.preventDefault();

    if (username ==='' || email ==='' || password ==='') {
            alert("Please fill all fields")
            return;
          }
          else{
            alert("all fields are filled")

            const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    })
        const data = await response.json();

if (response.ok) {
    setMessage("login  successful!");
    navigate("/ticket");
} else {
    setMessage(data.message || "login failed!");
}


}
 }
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <p>Welcome back! Please login to your account.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={ (e) => setUsername(e.target.value) }

          />

        <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }

          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
             value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />

          <button type="submit">Login</button>
          <p>{message}</p> 
          <p>
       Don't have an account?  <Link to="/register">Sign Up</Link>
       </p>
        </form>
      </div>
    </div>
  );
   }


export {Login};