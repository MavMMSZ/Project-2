import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';
import { Signup } from "../api/authAPI";

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };

  const validateInputs = () => {
    if (!signupData.username || !signupData.password) {
      alert('Please fill in all fields.');
      return false;
    }
    if (signupData.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return
    try {
      const data = await Signup(signupData);
      Auth.Signup(data.token);
    } catch (err) {
      console.error('Failed to Signup', err);
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <label >Username</label>
        <input 
          type='text'
          name='username'
          value={signupData.username || ''}
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={signupData.password || ''}
          onChange={handleChange}
        />
        <button type='submit'>Submit Form</button>
      </form>
    </div>
    
  )
};

export default SignupPage;
