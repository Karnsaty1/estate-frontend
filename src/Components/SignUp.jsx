import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Comp.css';

export default function SignUp() {
  const [cred, setCred] = useState({ email: '', password: '' });
  const [isOtp, setIsOtp] = useState(false); 
  const [otp, setOtp] = useState(''); 
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cred),
      });
const data = await response.json(); 
      if (!response.ok) {
         console.log('Error:', response.status, data);
      } else {
        setIsOtp(true); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/auth/verifyOTP`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cred.email,password:cred.password, otp,isSignup:true }),
      });

      if (response.ok) {
        navigate('/prop');
      } else {
        console.log('Invalid OTP');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setCred((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onOtpChange = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div className='container_01'>
      <h1>Register User</h1>
      <Link to='/signin' className='small-div'><small>Already have an account?</small></Link>

      {!isOtp ? (
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={cred.email}
              onChange={onChange}
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={cred.password}
              onChange={onChange}
              placeholder="Password"
            />
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      ) : (
        <div>
          <h3>Verify OTP</h3>
          <form onSubmit={onOtpSubmit}>
            <div className="form-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                className="form-control"
                id="otp"
                value={otp}
                onChange={onOtpChange}
                placeholder="Enter OTP"
              />
            </div>
            <button type="submit" className="btn btn-primary">Verify OTP</button>
          </form>
        </div>
      )}

      <div className="google-btn">
        <a href={`${import.meta.env.VITE_BACKEND_API}/auth/google`}>
          <button className="btn btn-danger">Login with Google</button>
        </a>
      </div>
    </div>
  );
}
