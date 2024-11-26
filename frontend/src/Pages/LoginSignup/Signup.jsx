import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postInformationToBackend } from "../../Components/Registration/registration";
import "../CSS/LoginSignup.css";

const Signup = () => {
  const [view, setview] = useState("signup");
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isChecked, setIsChecked] = useState(false);
  const [formValues, setFormValues] = useState({
    userFirstName: "",
    userLastName: "",
    userMobile: "",
    userEmailAddress: "",
    userPassword: "",
    userPasswordRewrite: "",
    userOTP: "",
  });
  const [inputCorrectnessCheck, setInputCorrectness] = useState({
    isValidEmail: true, // Check if email address is correctly written
    passwordConsistency: true, // Check if input password
    ifAnyEmpty: false, // Check if any empty input exists
    isCheckedCorrectness: true, // Check if checkbox is marked
    isOTPcorrect: true,
  });
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const handleChange = (name, event) => {
    const value = event.target.value;
    setFormValues((previousState) => {
      return { ...previousState, [name]: value };
    });
  };
  const continueSignin = async () => {
    if (view === "signup") {
      // Check login information correctness
      const setIsValidEmail = emailRegex.test(formValues.userEmailAddress);
      const setPasswordConsistency =
        (formValues.userPassword === formValues.userPasswordRewrite);
      const setIfAnyEmpty =
        (formValues.userFirstName.trim() === "" ||
        formValues.userLastName.trim() === "" ||
        formValues.userEmailAddress.trim() === "" ||
        formValues.userPassword.trim() === "" ||
        formValues.userPasswordRewrite.trim() === "");
      const setIsCheckedCorrectness = isChecked;
      setInputCorrectness({
        ...inputCorrectnessCheck,
        isValidEmail: setIsValidEmail,
        passwordConsistency: setPasswordConsistency,
        ifAnyEmpty: setIfAnyEmpty,
        isCheckedCorrectness: setIsCheckedCorrectness,
      });
      // Transfer to login page
      if (setIsValidEmail && setPasswordConsistency && !setIfAnyEmpty && setIsCheckedCorrectness) {
        console.log("Successfully registered. Tranfer to login page");
        const registration_information = {
          firstName: formValues.userFirstName,
          lastName: formValues.userLastName,
          email: formValues.userEmailAddress,
          password: formValues.userPassword,
        };
        const isRegisterd = await postInformationToBackend("register", "user", registration_information);

        if (isRegisterd) {
          setview("OTP");
        }
      }
    } else if (view === "OTP") {
      const data = {
        email: formValues.userEmailAddress,
        otp: formValues.userOTP,
      };
      const isVarifide = await postInformationToBackend("email_verify", "user", data);
      setInputCorrectness({
        ...inputCorrectnessCheck,
        isOTPcorrect: isVarifide,
      });
      
      console.log(isVarifide);

      if (isVarifide) {
        navigate("/login_user");
      }
    }
  };


  return (
    <div>
      {view === "signup" && (
        <div className="loginsignup">
          <div className="loginsignup-container">
            <h1>Sign Up as Customers</h1>
            <div className="loginsignup-fields">
              <input
                type="text"
                value={formValues.userFirstName}
                onChange={(event) => handleChange("userFirstName", event)}
                placeholder="Your First Name"
              />
              <input
                type="text"
                value={formValues.userLastName}
                onChange={(event) => handleChange("userLastName", event)}
                placeholder="Your Last Name"
              />
              <input
                type="email"
                value={formValues.userEmailAddress}
                onChange={(event) => handleChange("userEmailAddress", event)}
                placeholder="Email Address"
              />
              {!inputCorrectnessCheck.isValidEmail && (
                <p style={{ color: "red" }}>
                  Please type a valid email address
                </p>
              )}
              <input
                type="password"
                value={formValues.userPassword}
                onChange={(event) => handleChange("userPassword", event)}
                placeholder="Password"
              />
              <input
                type="password"
                value={formValues.userPasswordRewrite}
                onChange={(event) => handleChange("userPasswordRewrite", event)}
                placeholder="Repeat Password"
              />
              {!inputCorrectnessCheck.passwordConsistency && (
                <p style={{ color: "red" }}>
                  The password is not correctly typed, please check again
                </p>
              )}
            </div>
            <button onClick={continueSignin}>Continue</button>
            {inputCorrectnessCheck.ifAnyEmpty && (
              <p style={{ color: "red" }}>The input cannot be empty</p>
            )}
            <p className="loginsignup-login">
              Already have an account?{" "}
              <span>
                <Link to={"/login_user"}>
                  Login here
                </Link>
              </span>
            </p>
            <div className="loginsignup-agree">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                name=""
                id=""
              />
              <p>
                By continuing, i agree to the terms of use & privacy policy.
              </p>
              {!inputCorrectnessCheck.isCheckedCorrectness && (
                <p style={{ color: "red" }}>
                  Please agree our privacy policy to continue
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {view === "OTP" && (
        <div className="loginsignup">
          <div className="loginsignup-container">
            <h1>
              We have send an OTP code to the email address you provide. Please
              type the OTP code for verifying
            </h1>
            <div className="loginsignup-fields">
              <input
                type="text"
                value={formValues.userOTP}
                onChange={(event) => handleChange("userOTP", event)}
                placeholder="OTP code"
              />
              {!inputCorrectnessCheck.isOTPcorrect && (
                <p style={{ color: "red" }}>
                  Incorrect OTP code, please check again
                </p>
              )}
            </div>
            <button onClick={continueSignin}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
