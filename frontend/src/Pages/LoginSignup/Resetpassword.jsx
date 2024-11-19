import React, {useState} from 'react'
import '../CSS/LoginSignup.css'
import { resetPWD, getTemplateAddress, checkOTP, resetOTP } from '../../Components/Registration/registration'
import { resetPWD_seller, getTemplateAddress_seller, checkOTP_seller, resetOTP_seller } from '../../Components/Registration/registration_seller'
import { Link, useNavigate, useParams } from 'react-router-dom';

const Resetpassword = () => {
    const {role} = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        OTPcode: '',
        userEmailAddress: (role === "customer") ? getTemplateAddress() : getTemplateAddress_seller(),
        userPassword: '',
        userPasswordReapt: ''
    });
    const [inputCorrectnessCheck, setInputCorrectness] = useState({
        isValidOTP: true, // Check if OTP is correctly matched
        passwordConsistency: true, // Check if input password 
        ifAnyEmpty: false, // Check if any empty input exists
    });
    const handleChange = (name, event) => {
        const value = event.target.value;
            setFormValues(previousState => {
            return { ...previousState, [name]: value }
            });
    }

    const continueLogin = () => {
        const setIsValidOTP = (role === "customer") ? checkOTP(formValues.OTPcode) : checkOTP_seller(formValues.OTPcode); // WE get OTP from backend API, currently set true
        const setPasswordConsistency = (formValues.userPassword === formValues.userPasswordReapt);
        const setIfAnyEmpty = (formValues.OTPcode.trim() === "" ||  
                            formValues.userPassword.trim() === "" || 
                            formValues.userPasswordReapt.trim() === "");
        setInputCorrectness({
            isValidOTP: setIsValidOTP,
            passwordConsistency: setPasswordConsistency,
            ifAnyEmpty: setIfAnyEmpty
        });
        if(setIsValidOTP && !setIfAnyEmpty && setPasswordConsistency){
            const registration_information = {
                userEmailAddress: formValues.userEmailAddress,
                userPassword: formValues.userPassword
            }
            if (role === "cutomer"){            
                resetOTP()
                resetPWD(registration_information);
            }
            else if(role === "seller"){
                resetOTP_seller()
                resetPWD_seller(registration_information);
            }
            navigate(`/login_${role}`);
        }
    }
    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <div className="loginsignup-fields">
                    <p className="loginsignup-login"><span><Link to={"/login"} onClick={resetOTP}>{"<-"} back</Link></span></p>
                    <p>Please type OTP code you receive from your email address</p>
                    <input type="text" value={formValues.OTPcode} onChange={(event) => handleChange("OTPcode", event)} placeholder='OTP code' />
                    {!inputCorrectnessCheck.isValidOTP && <p style={{ color: 'red' }}>Invalid OTP, please check again</p>}
                    <p>Please reset your password here</p>
                    <input type="password" value={formValues.userPassword} onChange={(event) => handleChange('userPassword', event)} placeholder='Password' />
                    <input type="password" value={formValues.userPasswordReapt} onChange={(event) => handleChange('userPasswordReapt', event)} placeholder='Repeat Password' />
                    {!inputCorrectnessCheck.passwordConsistency && <p style={{ color: 'red' }}>The password is not correctly typed, please check again</p>}
                </div>
                <button onClick={continueLogin}>Continue</button>
                {inputCorrectnessCheck.ifAnyEmpty && <p style={{ color: 'red' }}>The input cannot be empty</p>}
            </div>
        </div>
    )
}

export default Resetpassword