/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'


const Login = () => {
    const [credentials, setCredentials] = useState({email:"", password:""})
    let history = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json = await response.json();
          console.log(json)

          if(json.success){
            //redirect
            localStorage.setItem('token', json.authtoken)
            history("/")

          } 
          else{
            alert("Invalid Credentials")
          }
    }

    const handleChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={handleChange} name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label  htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={handleChange} name='password' id="password" placeholder="Password"/>
                </div>
               
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
