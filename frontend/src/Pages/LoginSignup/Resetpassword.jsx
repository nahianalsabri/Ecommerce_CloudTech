import React, {useState} from 'react'
import '../CSS/LoginSignup.css'
import { postInformationToBackend, getInformationToBackend } from '../../Components/Registration/registration'
import { Link, useNavigate, useParams } from 'react-router-dom';

const Resetpassword = () => {
    const {role} = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        OTPcode: '',
        userEmailAddress: async() => {
            const output = await getInformationToBackend("forgetPWD", role);
            return output?.data.email;
        }, // Here might be an error, I try to write a GET function to get users email address from backend 
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

    const continueLogin = async() => {
        const registration_information = {
            email: formValues.userEmailAddress,
            otp: formValues.OTPcode,
            newPassword: formValues.userPassword,
        }
        const setIsValidOTP = await postInformationToBackend("resetPWD", role, registration_information)
        // const setIsValidOTP = (role === "customer") ? checkOTP(formValues.OTPcode) : checkOTP_seller(formValues.OTPcode); // WE get OTP from backend API, currently set true
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
            // if (role === "cutomer"){
            //     resetPWD(registration_information);
            // }
            // else if(role === "seller"){
            //     resetPWD_seller(registration_information);
            // }
            navigate(`/login_${role}`);
        }
    }
    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <div className="loginsignup-fields">
                    <p className="loginsignup-login"><span><Link to={`/login_${role}`}>{"<-"} back</Link></span></p>
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