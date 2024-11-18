import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import { Link, useNavigate } from 'react-router-dom'
import { setTemplateAddress, emailCheck, generateOTP } from '../Components/Registration/registration'

const Forgetpassword = () => {
    const [userEmailAddress, setuserEmailAddress] = useState("");
    const [inputCheck, setInputCheck] = useState(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate = useNavigate();

    const handleChange = (event) => {
        const value = event.target.value;
        setuserEmailAddress(value);
    }
    
    const continueReset = () => {
        const check = (emailRegex.test(userEmailAddress) && emailCheck(userEmailAddress))
        setInputCheck(check);
        if (check){
            setTemplateAddress(userEmailAddress);
            generateOTP();
            navigate("/resetPWD");
        };
    }

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <div className="loginsignup-fields">
                    <p className="loginsignup-login"><span><Link to={"/login"}>{"<-"} back</Link></span></p>
                    <p>Please type your email address you registered to receive OTP code</p>
                    <input type="text" value={userEmailAddress} onChange={(event) => handleChange(event)} placeholder='Your email address' />
                    {!inputCheck && <p style={{ color: 'red' }}>Your email address is incorrect. Please type a valid email address</p>}
                </div>
            <button onClick={continueReset}>Continue</button>
            </div>
        </div>
    )
}

export default Forgetpassword