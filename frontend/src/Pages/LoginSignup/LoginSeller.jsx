import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postInformationToBackend } from "../../Components/Registration/registration";
import { getUser, setUser } from "../../Components/Registration/user";
import {
  setAuthStatus,
  setAuthToken,
} from "../../reduxfolder/reducers/authSlice";
import "../CSS/LoginSignup.css";

const LoginSeller = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [formValues, setFormValues] = useState({
    userEmailAddress: "",
    userPassword: "",
  });
  const [inputCorrectnessCheck, setInputCorrectness] = useState({
    isValidEmail: true, // Check if email address is correctly written
    ifAnyEmpty: false, // Check if any empty input exists
    isCheckedCorrectness: true, // Check if checkbox is marked
  });

  const handleChange = (name, event) => {
    const value = event.target.value;
    setFormValues((previousState) => {
      return { ...previousState, [name]: value };
    });
  };

  const continueLogin = async () => {
    const login_information = {
      email: formValues.userEmailAddress,
      password: formValues.userPassword,
    };
    const setIsValidEmail = emailRegex.test(formValues.userEmailAddress);
    const setIfAnyEmpty =
      formValues.userEmailAddress.trim() === "" ||
      formValues.userPassword.trim() === "";
    // const setIsCheckedCorrectness = loginCheck_seller(login_information);
    const setIsCheckedCorrectness = await postInformationToBackend(
      "login",
      "seller",
      login_information
    );
    console.log("llllllll", setIsCheckedCorrectness?.status);

    setInputCorrectness({
      ...formValues,
      isValidEmail: setIsValidEmail,
      ifAnyEmpty: setIfAnyEmpty,
      isCheckedCorrectness: setIsCheckedCorrectness,
    });

    if (setIsValidEmail && !setIfAnyEmpty && setIsCheckedCorrectness?.status) {
      if (getUser().userLogin) {
        alert("You must log out before log into new account");
      } else {
        console.log("setIsCheckedCorrectness", setIsCheckedCorrectness);
        dispatch(setAuthStatus(true));
        dispatch(setAuthToken(setIsCheckedCorrectness?.token));
        console.log("successfully login!");
        setUser({
          userName: "User",
          userRole: "Seller",
        });
        navigate("/");
      }
    }
  };
  const resetForm = () => {
    setFormValues({
      userEmailAddress: "",
      userPassword: "",
    });
    setInputCorrectness({
      isValidEmail: true,
      ifAnyEmpty: false,
      isCheckedCorrectness: true,
    });
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Log In as Sellers</h1>
        <div className="loginsignup-fields">
          <input
            type="email"
            value={formValues.userEmailAddress}
            onChange={(event) => handleChange("userEmailAddress", event)}
            placeholder="Email Address"
          />
          {!inputCorrectnessCheck.isValidEmail && (
            <p style={{ color: "red" }}>Please type a valid email address</p>
          )}
          <input
            type="password"
            value={formValues.userPassword}
            onChange={(event) => handleChange("userPassword", event)}
            placeholder="Password"
          />
          {!inputCorrectnessCheck.isCheckedCorrectness && (
            <p style={{ color: "red" }}>
              The password or email address may not be correctly typed, please
              check and type again
            </p>
          )}
        </div>
        <button onClick={continueLogin}>Login</button>
        {inputCorrectnessCheck.ifAnyEmpty && (
          <p style={{ color: "red" }}>The input cannot be empty</p>
        )}
        <p className="loginsignup-login">
          <span>
            <Link to={"/signup_seller"} onClick={resetForm}>
              Create new account here
            </Link>
          </span>
        </p>
        <p className="loginsignup-login">
          <span>
            <Link to={"/forgetPWD/seller"}>Forget Password?</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSeller;
