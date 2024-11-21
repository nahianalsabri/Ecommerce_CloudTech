import React, { useState } from 'react'
import '../CSS/LoginSignup.css'
import { Link, useNavigate } from 'react-router-dom'
import {register_seller, generateOTP_seller, checkOTP_seller, sendDataToBackend} from '../../Components/Registration/registration_seller'

const SignupSeller = () => {
    const [view, setview] = useState("signup");
    const navigate = useNavigate();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [isChecked, setIsChecked] = useState(false);
    const [formValues, setFormValues] = useState({
        userName: '',
        userEmailAddress: '',
        userPassword: '',
        userPasswordRewrite: '',
        userOTP: ''
    });
    const [inputCorrectnessCheck, setInputCorrectness] = useState({
      isValidEmail: true, // Check if email address is correctly written
      passwordConsistency: true, // Check if input password 
      ifAnyEmpty: false, // Check if any empty input exists
      isCheckedCorrectness: true, // Check if checkbox is marked
      isOTPcorrect: true // Check if OTP code is correctly typed
    });
    const [ifApproved, setIfApproved] = useState(false)
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
        if(view === "signup"){
            // Check login information correctness
            const setIsValidEmail = emailRegex.test(formValues.userEmailAddress);
            const setPasswordConsistency = (formValues.userPassword === formValues.userPasswordRewrite);
            const setIfAnyEmpty = (formValues.userName.trim() === "" || 
                                formValues.userEmailAddress.trim() === "" || 
                                formValues.userPassword.trim() === "" || 
                                formValues.userPasswordRewrite.trim() === "");
            const setIsCheckedCorrectness = isChecked;
            setInputCorrectness({
                ...inputCorrectnessCheck,
                isValidEmail: setIsValidEmail, 
                passwordConsistency: setPasswordConsistency,
                ifAnyEmpty: setIfAnyEmpty,
                isCheckedCorrectness: setIsCheckedCorrectness
            });
            // Upload login information
            //**********//
            // Transfer to login page
            if (setIsValidEmail && setPasswordConsistency && !setIfAnyEmpty && setIsCheckedCorrectness){
                generateOTP_seller();
                setview("OTP");
            }
        }
        else if(view === "OTP"){
            console.log(inputCorrectnessCheck.isOTPcorrect)
            const verify = checkOTP_seller(formValues.userOTP)
            setInputCorrectness({
                ...inputCorrectnessCheck,
                isOTPcorrect: verify
            })
            if(verify){
                const registration_information = {
                    userName: formValues.userName,
                    userEmailAddress: formValues.userEmailAddress,
                    userPassword: formValues.userPassword
                }
                register_seller(registration_information);
                
                //sendDataToBackend(registration_information);
                
                {
                    let remainingTime = 5;
                    const interval = setInterval(() => {
                        if (remainingTime <= 0) {
                            clearInterval(interval);
                            console.log("Time out! ");
                            navigate("/AddProduct");
                        } else {
                            console.log(`time: ${remainingTime} s`);
                            remainingTime--;
                        }
                    }, 1000);
                }

                resetForm();
                setview("waiting");
                // 
            }
        }
    }
    const resetForm = () =>{
      setFormValues({
        userName: '',
        userEmailAddress: '',
        userPassword: '',
        userPasswordRewrite: '',
        userOTP: ''
      });
      setInputCorrectness({
        ...inputCorrectnessCheck,
        isValidEmail: true,
        passwordConsistency: true,
        ifAnyEmpty: false,
        isCheckedCorrectness: true
      });
    }

    return (
        <div>
        {view === 'signup' && (
        <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>Sign Up as Seller</h1>
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
          <p className="loginsignup-login">Already have an account? <span><Link to={"/login_seller"} onClick= {resetForm}>Login here</Link></span></p>
          <div className="loginsignup-agree">
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} name='' id='' />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
            {!inputCorrectnessCheck.isCheckedCorrectness && <p style={{ color: 'red' }}>Please agree our privacy policy to continue</p>}
          </div>
        </div>
        </div>
        )}
        {view === 'OTP' && (
            <div className='loginsignup'>
            <div className="loginsignup-container">
              <h1>We have send an OTP code to the email address you provide. Please type the OTP code for verifying</h1>
              <div className="loginsignup-fields">
                <input type="text" value={formValues.userOTP} onChange={(event) => handleChange('userOTP', event)} placeholder='OTP code' />
                {!inputCorrectnessCheck.isOTPcorrect && <p style={{ color: 'red' }}>Incorrect OTP code, please check again</p>}
              </div>
              <button onClick={continueSignin}>Continue</button>
            </div>
            </div>
        )}
        {view === "waiting" && (
            <div className='loginsignup'>
                <div className="loginsignup-container">
                    <h1> Please wait for admit's approvement...</h1>
                </div>
            </div>
        )}
        </div>
    )
}
export default SignupSeller