import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Authentication.css';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";

function Register() {
  const [inputs, setInputs] = useState({  username: "", email: "", password: "", confirmPassword: "" });
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
          <Link to="/Home">
            <AiOutlineHome className="homeIcon" />
          </Link>
          <Link to="/Home" className="homeText">Back to Home</Link>
        </div>
        <p className="title">Sign Up</p>
        <form onSubmit={handleSubmit} className="form">
        <div className="inputContainer">
            <input
              type="text"
              name="username"
              value={inputs.username}
              placeholder="Username"
              onChange={handleChange}
              className="inputField"
            />
          </div>
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
            <div className="eyeIcon" onClick={togglePasswordVisibility}>
              {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
          </div>
          <div className="inputContainer">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={inputs.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              className="inputField"
            />
            <div className="eyeIcon" onClick={togglePasswordVisibility}>
              {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
          </div>
          <button className="submitButton" type="submit">Continue</button>
          <p style={{ fontFamily: 'Montserrat-Regular' }}>
            Already have an account?
            <Link to="/Login" className='anchor' style={{ marginLeft: '4px', fontWeight: 'bold' }}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
