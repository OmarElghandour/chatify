import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API;

 const Login = () => {
    let navigate = useNavigate();

    const initialState = {
        userName : "",
        password : ""
    }

    const [inputs,setInputs] = useState(initialState);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(BASE_URL + '/login', inputs)
        .then(response => {
            console.log(response);
            localStorage.setItem("token", response.data.token);
            navigate.push("/", { replace: true });
        }).catch(e => {
            console.log(e)
        })
    }    
    
    useEffect(() => {
        console.log(inputs)
    },[inputs]);

    return(
        <div className="login-wrapper section">
            <h1 className='section__title'>Please Log In</h1>
            <form onSubmit={event => handleSubmit(event)}>
                <label>
                    <p>Username</p>
                    <input 
                    className='form-control'
                    type="text" 
                    name='userName'
                    key={'userName'}
                    onChange={({target}) => setInputs(state => ({...state,userName:target.value}))}
                    value={inputs.userName}
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input
                     className='form-control'
                     type="password" 
                     name='password'
                     key={'password'}
                     onChange={({target}) => setInputs(state => ({...state,password:target.value}))}
                     value={inputs.password}                    
                    />
                </label>
                <div>
                    <button className='btn' type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login