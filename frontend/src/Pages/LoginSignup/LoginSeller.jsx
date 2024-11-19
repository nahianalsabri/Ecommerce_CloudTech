import React, { useState } from 'react'
import '../CSS/LoginSignup.css'
import { Link, useNavigate } from 'react-router-dom'
import {loginCheck_seller} from '../../Components/Registration/registration_seller'

const LoginSeller = () => {
    const navigate = useNavigate();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [formValues, setFormValues] = useState({
      userEmailAddress: '',
      userPassword: '',
    });
    const [inputCorrectnessCheck, setInputCorrectness] = useState({
      isValidEmail: true, // Check if email address is correctly written
      ifAnyEmpty: false, // Check if any empty input exists
      isCheckedCorrectness: true // Check if checkbox is marked
    });

    const handleChange = (name, event) => {
        const value = event.target.value;
          setFormValues(previousState => {
            return { ...previousState, [name]: value }
        });
    }

    const continueLogin = () =>{
        const login_information = {
          userEmailAddress: formValues.userEmailAddress,
          userPassword: formValues.userPassword
        }
        const setIsValidEmail = emailRegex.test(formValues.userEmailAddress);
        const setIfAnyEmpty = (formValues.userEmailAddress.trim() === "" || 
                            formValues.userPassword.trim() === "");
        const setIsCheckedCorrectness = loginCheck_seller(login_information);
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
          userEmailAddress: '',
          userPassword: '',
        });
        setInputCorrectness({
          isValidEmail: true,
          ifAnyEmpty: false,
          isCheckedCorrectness: true
        });
    }

    return (
        <div className='loginsignup'>
          <div className="loginsignup-container">
            <h1>Log In as Sellers</h1>
            <div className="loginsignup-fields">
                <input type="email" value={formValues.userEmailAddress} onChange={(event) => handleChange('userEmailAddress', event)} placeholder='Email Address' />
                {!inputCorrectnessCheck.isValidEmail && <p style={{ color: 'red' }}>Please type a valid email address</p>}
                <input type="password" value={formValues.userPassword} onChange={(event) => handleChange('userPassword', event)} placeholder='Password' />
                {!inputCorrectnessCheck.isCheckedCorrectness && <p style={{ color: 'red' }}>The password or email address may not be correctly typed, please check and type again</p>}      
            </div>
            <button onClick={continueLogin}>Login</button>
            {inputCorrectnessCheck.ifAnyEmpty && <p style={{ color: 'red' }}>The input cannot be empty</p>}
            <p className="loginsignup-login"><span><Link to={"/signup_seller"} onClick= {resetForm}>Create new account here</Link></span></p>
            <p className="loginsignup-login"><span><Link to={"/forgetPWD/seller"}>Forget Password?</Link></span></p>
          </div>
        </div>
    )
}

export default LoginSeller