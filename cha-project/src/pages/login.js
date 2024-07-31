import React, { useState } from "react";
import './login.css';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

function Login() {
  const [inputs, setInputs] = useState({ email: "", password: "", rememberPassword: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Logging in with", inputs);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="pageContainer">
      <div className="brandContainer">
        <p className="brand">BrandTailors<br />Co.</p>
        <p className="subtitle">- All your needs,<br />tailored just for you</p>
      </div>
      <div className="formContainer">
        <p className="title">Sign In</p>
        <form onSubmit={handleSubmit}>
          <div className="inputContainer">
            <input
              type="email"
              name="email"
              value={inputs.email}
              placeholder="Email"
              onChange={handleChange}
              className="inputField"
            />
          </div>
          <div className="inputContainer">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={inputs.password}
              placeholder="Password"
              onChange={handleChange}
              className="inputField"
            />
            <div className="icon" onClick={togglePasswordVisibility}>
              {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
          </div>
          <input
            type="checkbox"
            name="rmbPassword"
            value={inputs.rememberPassword}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
