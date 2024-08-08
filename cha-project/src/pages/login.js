import React, { useState } from "react";
import './login.css';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineHome } from "react-icons/ai";

function Login() {
  const [inputs, setInputs] = useState({ email: "", password: "", rememberPassword: false });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
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
        <div className="homeContainer">
          <AiOutlineHome className="homeIcon" />
          <p className="homeText">Back to Home</p>
        </div>
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
          <div className="checkboxContainer">
            <label>
              <input
                type="checkbox"
                name="rememberPassword"
                checked={inputs.rememberPassword}
                onChange={handleChange}
              />
              Remember Password
            </label>
            <a href="ForgotPassword.js">
              Forgot Password?
            </a>
          </div>
          <button className="submitButton" type="submit">Sign In</button>
          <div className="separator">or</div>
          <button className="googleButton">
            <FcGoogle className="googleIcon"/>
            Sign In With Google
          </button>
          <p>
            Don't have an account?
            <a href="Register.js" style={{marginLeft: '4px'}}>Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;