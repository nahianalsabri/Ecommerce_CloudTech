import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import { Link, useNavigate } from 'react-router-dom'
import {register, loginCheck} from '../Components/Registration/registration'

const LoginSignup = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('signin');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isChecked, setIsChecked] = useState(false);
  const [formValues, setFormValues] = useState({
    userName: '',
    userEmailAddress: '',
    userPassword: '',
    userPasswordRewrite: ''
  });
  const [inputCorrectnessCheck, setInputCorrectness] = useState({
    isValidEmail: true, // Check if email address is correctly written
    passwordConsistency: true, // Check if input password 
    ifAnyEmpty: false, // Check if any empty input exists
    isCheckedCorrectness: true // Check if checkbox is marked
  });
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const handleChange = (name, event) => {
    const value = event.target.value;
      setFormValues(previousState => {
        return { ...previousState, [name]: value }
      });
  }
  const continueSignin = () =>{
    console.log(formValues.userName);
    console.log(formValues.userEmailAddress);
    console.log(formValues.userPassword);
    console.log(formValues.userPasswordRewrite);
    // Check login information correctness
    const setIsValidEmail = emailRegex.test(formValues.userEmailAddress);
    const setPasswordConsistency = (formValues.userPassword === formValues.userPasswordRewrite);
    const setIfAnyEmpty = (formValues.userName.trim() === "" || 
                        formValues.userEmailAddress.trim() === "" || 
                        formValues.userPassword.trim() === "" || 
                        formValues.userPasswordRewrite.trim() === "");
    const setIsCheckedCorrectness = isChecked;
    setInputCorrectness({
      isValidEmail: setIsValidEmail, 
      passwordConsistency: setPasswordConsistency,
      ifAnyEmpty: setIfAnyEmpty,
      isCheckedCorrectness: setIsCheckedCorrectness
    });
    // Upload login information
    //**********//
    // Transfer to login page
    if (setIsValidEmail && setPasswordConsistency && !setIfAnyEmpty && setIsCheckedCorrectness){
      console.log("Successfully registered. Tranfer to login page");
      const registration_information = {
        userName: formValues.userName,
        userEmailAddress: formValues.userEmailAddress,
        userPassword: formValues.userPassword
      }
      register(registration_information);
      shiftToLogin();
    }
  }
  const continueLogin = () =>{
    const login_information = {
      userEmailAddress: formValues.userEmailAddress,
      userPassword: formValues.userPassword
    }
    const setIsValidEmail = emailRegex.test(formValues.userEmailAddress);
    const setIfAnyEmpty = (formValues.userEmailAddress.trim() === "" || 
                        formValues.userPassword.trim() === "");
    const setIsCheckedCorrectness = loginCheck(login_information);
    setInputCorrectness({
      ...formValues,
      isValidEmail: setIsValidEmail,
      ifAnyEmpty: setIfAnyEmpty,
      isCheckedCorrectness: setIsCheckedCorrectness
    })
    if(setIsValidEmail && !setIfAnyEmpty && setIsCheckedCorrectness){
      console.log("successfully login!");
      navigate("/");
    }
  }
  const resetForm = () =>{
    setFormValues({
      userName: '',
      userEmailAddress: '',
      userPassword: '',
      userPasswordRewrite: ''
    });
    setInputCorrectness({
      isValidEmail: true,
      passwordConsistency: true,
      ifAnyEmpty: false,
      isCheckedCorrectness: true
    });
  }
  const shiftToLogin = () =>{
    resetForm();
    setView('login'); 
  }
  const shiftToSignin = () =>{
    resetForm();
    setView('signin'); 
  }
  return (
    <div>
      {view === 'signin' && (
        <div className='loginsignup'>
          <div className="loginsignup-container">
            <h1>Sign Up</h1>
            <div className="loginsignup-fields">
              <input type="text" value={formValues.userName} onChange={(event) => handleChange('userName', event)} placeholder='Your Name' />
              <input type="email" value={formValues.userEmailAddress} onChange={(event) => handleChange('userEmailAddress', event)} placeholder='Email Address' />
              {!inputCorrectnessCheck.isValidEmail && <p style={{ color: 'red' }}>Please type a valid email address</p>}
              <input type="password" value={formValues.userPassword} onChange={(event) => handleChange('userPassword', event)} placeholder='Password' />
              <input type="password" value={formValues.userPasswordRewrite} onChange={(event) => handleChange('userPasswordRewrite', event)} placeholder='Repeat Password' />
              {!inputCorrectnessCheck.passwordConsistency && <p style={{ color: 'red' }}>The password is not correctly typed, please check again</p>}
            </div>
            <button onClick={continueSignin}>Continue</button>
            {inputCorrectnessCheck.ifAnyEmpty && <p style={{ color: 'red' }}>The input cannot be empty</p>}
            <p className="loginsignup-login">Already have an account? <span><Link onClick={shiftToLogin}>Login here</Link></span></p>
            <div className="loginsignup-agree">
              <input type="checkbox" 
              checked={isChecked}
              onChange={handleCheckboxChange}
              name='' id='' />
              <p>By continuing, i agree to the terms of use & privacy policy.</p>
              {!inputCorrectnessCheck.isCheckedCorrectness && <p style={{ color: 'red' }}>Please agree our privacy policy to continue</p>}
            </div>
          </div>
        </div>
      )}
      {view === 'login' && (
        <div className='loginsignup'>
          <div className="loginsignup-container">
            <h1>Log In</h1>
            <div className="loginsignup-fields">
              <input type="email" value={formValues.userEmailAddress} onChange={(event) => handleChange('userEmailAddress', event)} placeholder='Email Address' />
              {!inputCorrectnessCheck.isValidEmail && <p style={{ color: 'red' }}>Please type a valid email address</p>}
              <input type="password" value={formValues.userPassword} onChange={(event) => handleChange('userPassword', event)} placeholder='Password' />
              {!inputCorrectnessCheck.isCheckedCorrectness && <p style={{ color: 'red' }}>The password or email address may not be correctly typed, please check and type again</p>}
            </div>
            <button onClick={continueLogin}>Login</button>
            {inputCorrectnessCheck.ifAnyEmpty && <p style={{ color: 'red' }}>The input cannot be empty</p>}
            <p className="loginsignup-login"><span><Link onClick={shiftToSignin}>Create new account here</Link></span></p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginSignup
