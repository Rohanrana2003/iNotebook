/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})
    let history = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
          });
          const json = await response.json();
          console.log(json)

          if(json.success){
            //redirect
            localStorage.setItem('token', json.authtoken)
            history("/")
            props.showAlert("Account created Successfully", "success")
          } 
          else{
            props.showAlert("Invalid Details", "danger")
          }
    }

    const handleChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name='name' id="name" onChange={handleChange} aria-describedby="emailHelp" placeholder="Enter name"/>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" onChange={handleChange} aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name='password' id="password" minLength={3} required onChange={handleChange} placeholder="Password"/>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' id="cpassword" minLength={3} required onChange={handleChange} placeholder="Confirm password"/>
                </div>
               
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
