import './Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
function Login(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    function login(){
        
    }

    return(
        <>
            <div className="card">
                <h2>Login</h2>
                <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/><br />
                <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/><br />
                {/* <Link className='link'>Forgot password?</Link><br /> */}
                <button className='loginButton' onClick={()=>{login()}}>login</button>
            </div>
        </>
    )   
}

export default Login