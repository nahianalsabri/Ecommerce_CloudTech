import React, { useState } from 'react'
import '../CSS/SellerLoginSignup.css'
import { Link, useNavigate } from 'react-router-dom'
import {register_seller} from '../../Components/Registration/registration_seller'

const SignupSeller = () => {
    const navigate = useNavigate();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [isChecked, setIsChecked] = useState(false);
    const [formValues, setFormValues] = useState({
        userName: '',
        userEmailAddress: '',
        userPassword: '',
        userPasswordRewrite: '',
        userCompanyName: '',
        userProductionName: '',
        userProductPrice: '',
        userProductDescription: ''
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
                          formValues.userPasswordRewrite.trim() === "" || 
                          formValues.userCompanyName.trim() === "" || 
                          formValues.userProductPrice.trim() === "" || 
                          formValues.userProductDescription.trim() === "");
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
          userPassword: formValues.userPassword,
          userCompanyName: formValues.userCompanyName,
          userProductionName: formValues.userProductionName,
          userProductPrice: formValues.userProductPrice,
          userProductDescription: formValues.userProductDescription
        }
        register_seller(registration_information);
        navigate("/login_seller")
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
    
    return (
      <div className='loginsignupseller'>
        <h1 className="loginsignupseller-container">Sign Up as Sellers</h1>
        <div className="loginsignupseller-container">
            <div className="left">
                <div className="loginsignupseller-fields">
                    <input type="text" value={formValues.userName} onChange={(event) => handleChange('userName', event)} placeholder='Your Name' />
                    <input type="email" value={formValues.userEmailAddress} onChange={(event) => handleChange('userEmailAddress', event)} placeholder='Email Address' />
                    {!inputCorrectnessCheck.isValidEmail && <p style={{ color: 'red' }}>Please type a valid email address</p>}
                    <input type="password" value={formValues.userPassword} onChange={(event) => handleChange('userPassword', event)} placeholder='Password' />
                    <input type="password" value={formValues.userPasswordRewrite} onChange={(event) => handleChange('userPasswordRewrite', event)} placeholder='Repeat Password' />
                    {!inputCorrectnessCheck.passwordConsistency && <p style={{ color: 'red' }}>The password is not correctly typed, please check again</p>}
                </div>
                <div className="loginsignupseller-agree">
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} name='' id='' />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                    {!inputCorrectnessCheck.isCheckedCorrectness && <p style={{ color: 'red' }}>Please agree our privacy policy to continue</p>}
                </div>
                <div className="loginsignupseller-fields">
                    <button onClick={continueSignin}>Continue</button>
                    {inputCorrectnessCheck.ifAnyEmpty && <p style={{ color: 'red' }}>The input cannot be empty</p>}
                    <p className="loginsignupseller-login">Already have an account? <span><Link to={"/login_seller"} onClick= {resetForm}>Login here</Link></span></p>
                </div>
            </div>
            <div className="dashboard-fields right">
                <input type="text" value={formValues.userCompanyName} onChange={(event) => handleChange('userCompanyName', event)} placeholder='Company name' />
                <input type="text" value={formValues.userProductionName} onChange={(event) => handleChange('userProductionName', event)} placeholder='Product name' />
                <input type="text" value={formValues.userProductPrice} onChange={(event) => handleChange('userProductPrice', event)} placeholder='Product price' />
                <textarea value={formValues.userProductDescription} onChange={(event) => handleChange('userProductDescription', event)} placeholder='Product descrption' />
            </div>
        </div>
      </div>
    )
}

export default SignupSeller