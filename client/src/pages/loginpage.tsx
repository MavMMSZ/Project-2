import { useState, FormEvent, ChangeEvent } from "react";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";

import '../styles/loginpage.css';


const Login = () => {
  const [error, setError] = useState('');
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      setError('Please fill in all fields');
    } else {
      try {
        const data = await login(loginData);
        Auth.login(data.token);
      } catch (err) {
        setError('Failed to login');
      }
    }
  };

  return (
    <div className='container'>
      <form  onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label >Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <button type='submit'>Click to login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
    
  )
};

export default Login;
