import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = (event) => {
    event.preventDefault();
    if (password == confirmPassword) {
      axios
        .post("https://eizenhower-to-do-board-backend.onrender.com/signup", {
          username: username,
          password: password,
        })
        .then((response) => {
          // onSignup(email, password);
          console.log("Signup successful", response.data);
          setUsername('');
          setPassword('');
          setConfirmPassword('');
          login(response.data.id);
          navigate('/task');
        })
        .catch((error) => {
          console.log("Error signing in:", error);
        })
    }
    else{
      alert("Passwords do not match!");
      return;
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-14 p-8">
      <div className='flex items-center justify-center mb-4'>
        <h1 className="text-3xl font-bold text-blue-600">EizenHower To-do list</h1>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Signup</h2>
      <form onSubmit={handleSignup}>
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
        <div className="mb-10">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Confirm your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
