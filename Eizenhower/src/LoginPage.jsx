import axios from'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from './context/AuthContext';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async(event) => {
    event.preventDefault();
    setLoading(true);
    try{
      const response = await axios.post("https://eizenhower-to-do-board-backend.onrender.com/login", {
        username: username,
        password: password,
      });
      const user = response.data.user;
      login(user.id);
      toast.success("Login successful")
      navigate('/task')
    } catch(err){
      toast.error("Login failed")
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-14 p-8">
      <div className='flex items-center justify-center mb-4'>
        <h1 className="text-3xl font-bold text-blue-600">EizenHower To-do list</h1>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled = {loading}
        >
          {(loading)? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href="http://localhost:5174/signup"
              className="text-blue-500 hover:underline"
            >
              Register here
            </a>
          </p>
        </div>
    </div>
  );
};

export default LoginPage;
