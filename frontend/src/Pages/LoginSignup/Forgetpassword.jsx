import React, { useState } from 'react'
import '../CSS/LoginSignup.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { postInformationToBackend } from '../../Components/Registration/registration'

const Forgetpassword = () => {
    const {role} = useParams();
    const [userEmailAddress, setuserEmailAddress] = useState("");
    const [inputCheck, setInputCheck] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate = useNavigate();

    const handleChange = (event) => {
        const value = event.target.value;
        setuserEmailAddress(value);
    }
    
    const continueReset = async() => {
        // const check = (role === "user") ? 
        //     (emailRegex.test(userEmailAddress) && emailCheck(userEmailAddress)) : 
        //     (emailRegex.test(userEmailAddress) && emailCheck_seller(userEmailAddress));
        const checkInput = (userEmailAddress === "" || !emailRegex.test(userEmailAddress));
        setInputCheck(checkInput);

        const ifValid = await postInformationToBackend("forgetPWD", role, {email: userEmailAddress})
        if (ifValid && !checkInput){
            // if (role === "cutomer"){
            //     generateOTP({email: userEmailAddress});
            // }
            // else if(role === "seller"){
            //     generateOTP_seller({email: userEmailAddress});
            // }
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
                    {inputCheck && <p style={{ color: 'red' }}>Your email address is incorrect. Please type a valid email address</p>}
                </div>
            <button onClick={continueReset}>Continue</button>
            </div>
        </div>
    )
}

export default Forgetpassword