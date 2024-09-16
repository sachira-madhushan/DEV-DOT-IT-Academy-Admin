import './Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { axiosInstance } from '../../axios/axios';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const loginFunction = async () => {
        try{
            const response = await axiosInstance.post("/login", {
                a_email: email,
                a_password: password
            })
            if (response.status === 200) {
                localStorage.setItem("admin-token",response.data.token)
                localStorage.setItem("logged-in",true)
                window.location.reload();
            }
        }catch{
            setError(true);
            console.log("Incorrect username or password");
        }
        
    }

    return (
        <>
            <div className="card">
                <h2>Login</h2>
                <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value) } /><br />
                <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} /><br />
                <p style={error?{display:'block'}:{display:'none'}}>Incorrect username or password</p>
                {/* <Link className='link'>Forgot password?</Link><br /> */}
                <button className='loginButton' onClick={() => { loginFunction() }}>login</button>
            </div>
        </>
    )
}

export default Login