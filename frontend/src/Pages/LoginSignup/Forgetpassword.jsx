import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postInformationToBackend } from "../../Components/Registration/registration";
import "../CSS/LoginSignup.css";

const Forgetpassword = () => {
  const { role } = useParams();
  const [userEmailAddress, setuserEmailAddress] = useState("");
  const [inputCheck, setInputCheck] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setuserEmailAddress(value);
  };

  const continueReset = async () => {
    // const check = (role === "user") ?
    //     (emailRegex.test(userEmailAddress) && emailCheck(userEmailAddress)) :
    //     (emailRegex.test(userEmailAddress) && emailCheck_seller(userEmailAddress));
    const checkInput =
      userEmailAddress === "" || !emailRegex.test(userEmailAddress);
    setInputCheck(checkInput);

    const ifValid = await postInformationToBackend("forgetPWD", role, {
      email: userEmailAddress,
    });
    if (ifValid && !checkInput) {
      // if (role === "cutomer"){
      //     generateOTP({email: userEmailAddress});
      // }
      // else if(role === "seller"){
      //     generateOTP_seller({email: userEmailAddress});
      // }
      console.log(userEmailAddress);

      navigate(`/resetPWD/${role}`, {
        state: { email: userEmailAddress },
      });
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <div className="loginsignup-fields">
          <p className="loginsignup-login">
            <span>
              <Link to={`/login_${role}`}>{"<-"} back</Link>
            </span>
          </p>
          <p>
            Please type your email address you registered to receive OTP code
          </p>
          <input
            type="text"
            value={userEmailAddress}
            onChange={(event) => handleChange(event)}
            placeholder="Your email address"
          />
          {inputCheck && (
            <p style={{ color: "red" }}>
              Your email address is incorrect. Please type a valid email address
            </p>
          )}
        </div>
        <button onClick={continueReset}>Continue</button>
      </div>
    </div>
  );
};

export default Forgetpassword;
