import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postInformationToBackend } from "../../Components/Registration/registration";
import { setUser, getUser } from "../../Components/Registration/user";
import "../CSS/LoginSignup.css";

const Login = () => {
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
      (formValues.userEmailAddress.trim() === "" ||
      formValues.userPassword.trim() === "");
    const setIsCheckedCorrectness = await postInformationToBackend("login", "user", login_information);
    console.log("llllllll", !setIsCheckedCorrectness?.status);

    if (!setIsCheckedCorrectness?.status) {
      setInputCorrectness({
        ...formValues,
        isValidEmail: setIsValidEmail,
        ifAnyEmpty: setIfAnyEmpty,
        isCheckedCorrectness: setIsCheckedCorrectness,
      });
    } else {
      if(getUser().userLogin){
        alert("You must log out before log into new account")
      }else{
        console.log("successfully login!");
        setUser({
          userName: "User",
          userRole: "Customer",
        })
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
        <h1>Log In as Customers</h1>
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
            <Link to={"/signup_user"} onClick={resetForm}>
              Create new account here
            </Link>
          </span>
        </p>
        <p className="loginsignup-login">
          <span>
            <Link to={"/forgetPWD/user"}>Forget Password?</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
