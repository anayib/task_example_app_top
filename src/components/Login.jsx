import { useState } from 'react';
import {login, isAuthenticated} from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate  = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    
    try {
      const isAuthorized = await login({ userName, password });
      if (isAuthorized) {
        navigate('/dashboard');
      } else {
        alert('User not authorized. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      alert('An error occurred during login. Please try again.');
    }
  }
  

  return (
    <>
    <h2>Login</h2>
    <div>
      <form onSubmit={handleLogin}>
        <input 
         type="text" 
         value= {userName}
         placeholder='user name'
         className='relative mb-4'
         onChange={(e) => {setUserName(e.target.value)}}
         required
         />
        <input 
        type="text" 
        value={password}
        placeholder='password'
        className='relative mb-4'
        onChange={(e) => {setPassword(e.target.value)}}
        required
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
    </>

  );

}

export default Login;