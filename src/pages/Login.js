import { useState } from 'react';
import './LoginStyle.css';

function Loginpage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false); // State to track login success

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/student/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);
    
    // Assume data.success is a boolean indicating login success
    if (data.success) {
      setLoginSuccess(true);
    }
  }

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      {/* Display login success message if login is successful */}
      {loginSuccess ? (
        <div className="login-success">
          <p>Login successful! Click below to access the course.</p>
          <button className="continue-button">Continue</button>
        </div>
      ) : (
        // Display login form if login is not successful
        <form className="login-form" onSubmit={loginUser}>
          <p className="access-message">Login to access course</p>
          <input
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
          <input
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="login-button" type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default Loginpage;
