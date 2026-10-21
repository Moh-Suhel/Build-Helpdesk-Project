
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Register.css";
function Register() {
   const navigate = useNavigate();
const [username, setUsername] = useState('');
const [fullname, setFullname] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const [message , setMessage] = useState('')

  async  function handleSubmit(event) {
          event.preventDefault();

          if (username ==='' || fullname ==='' || email ==='' || password ==='') {
            alert("Please fill all fields")
            return;
          }
          else{
            alert("all fields are filled")

            const response = await fetch("http://localhost:8000/api/v1/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            fullName: fullname,
            password
        })
    })
        const data = await response.json();

if (response.ok) {
    setMessage("Registration successful!");
     navigate("/ticket");
} else {
    setMessage(data.message || "Registration failed!");
}

console.log(data);
          }

          console.log(username);
          console.log(fullname);
          console.log(email);
          console.log(password);

          setUsername('');
          setEmail('');
          setFullname('');
          setPassword('')

        
    }
     return (
        <>
        <div className ="perent">
        <div className = "register-hero">
          <h1>Support Made Simple</h1>
          <p>TO HELP HELPDESK USERS SOME ISSEU AND TRACK TICKET</p>
        </div> 
        <div className = "register-card">
        <h1> Register </h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username" >username</label>
            <input type = "text"
               id="username"
                 name = "username"
                   placeholder="enter your username"
                     value={username}
                       onChange={(e) => setUsername(e.target.value)}
                        /> 
              <label htmlFor="email" >email</label>
            <input type = "email"   id="email" name = "email"  placeholder="enter your email"  value={email}   onChange={(e) => setEmail(e.target.value)}/> 
              <label htmlFor="fullname" >fullname</label>
            <input type = "text"   id="fullname" name = "fullname" placeholder="enter your fullname"  value={fullname}  onChange={(e) => setFullname(e.target.value)} /> 
              <label htmlFor="password" >password</label>
            <input type = "password"   id="password" name = "password" placeholder="enter your password"  value={password}  onChange={(e) => setPassword(e.target.value)}/> 
             <button type="submit">register</button>
        </form>
        {message}
        <p>
        Already have an account? <Link to="/login">Login</Link>
       </p>
        </div>
        
        </div>
        </>
    
        
       
     )
    
}

export { Register }