import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
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
      console.log("Successfully registered. Tranfer to login page")
    }
  }
  return (
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
        <p className="loginsignup-login">Already have an account? <span>Login here</span></p>
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
  )
}

export default LoginSignup
