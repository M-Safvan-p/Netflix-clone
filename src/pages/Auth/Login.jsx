import React from 'react';
import logo from '../../assets/logo.png';
import "./Login.css"

const Login = () => {
  return (
    <div className='login'>
      <img src={logo} className='Login-log' alt="" />
      <div className="login-form">
        <h1>Sign Un</h1>
        <form>
            <input type="text" name="" placeholder='Your name' id="" />
            <input type="email" name="" placeholder='Email' id="" />
            <input type="password" name="" placeholder='Password' id="" />
            <button>Sign Un</button>
            <div className="form-help">
                <div className="remembe">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Remember Me</label>
                </div>
                <p>Need Help?</p>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
