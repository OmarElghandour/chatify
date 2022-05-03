import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API;

 const Register = () => {
    const navigate = useNavigate();

    const initialState = {
        userName : "",
        password : "",
        email    : ""
    }

    const [inputs,setInputs] = useState(initialState);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(BASE_URL + '/register', inputs)
        .then(data => {
            console.log(data);
            navigate("/login");
        }).catch(e => {
            console.log(e)
        })
    }    
    
    useEffect(() => {
        console.log(inputs)
    },[inputs]);

    return(
        <div className="login-wrapper section container">
            <h1 className='section__title'>Please Log In</h1>
            <form onSubmit={event => handleSubmit(event)} className="form-group">
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
                    <p>email</p>
                    <input 
                    className='form-control'
                    type="email" 
                    name='email'
                    key={'email'}
                    onChange={({target}) => setInputs(state => ({...state,email:target.value}))}
                    value={inputs.email}
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

export default Register;