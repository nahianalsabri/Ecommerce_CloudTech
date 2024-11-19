import React, { useState } from 'react'
import '../CSS/LoginSignup.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { setTemplateAddress, emailCheck, generateOTP } from '../../Components/Registration/registration'
import { setTemplateAddress_seller, emailCheck_seller, generateOTP_seller } from '../../Components/Registration/registration_seller'

const Forgetpassword = () => {
    const {role} = useParams();
    const [userEmailAddress, setuserEmailAddress] = useState("");
    const [inputCheck, setInputCheck] = useState(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate = useNavigate();

    const handleChange = (event) => {
        const value = event.target.value;
        setuserEmailAddress(value);
    }
    
    const continueReset = () => {
        const check = (role === "customer") ? 
            (emailRegex.test(userEmailAddress) && emailCheck(userEmailAddress)) : 
            (emailRegex.test(userEmailAddress) && emailCheck_seller(userEmailAddress));
        setInputCheck(check);
        if (check){
            if (role === "cutomer"){
                setTemplateAddress(userEmailAddress);
                generateOTP();
            }
            else if(role === "seller"){
                setTemplateAddress_seller(userEmailAddress);
                generateOTP_seller();
            }
            navigate(`/resetPWD/${role}`);
        };
    }

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <div className="loginsignup-fields">
                    <p className="loginsignup-login"><span><Link to={`/login_${role}`}>{"<-"} back</Link></span></p>
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