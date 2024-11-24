import axios from "axios";
let registration_information = [
  {
    userName: "qwe",
    userEmailAddress: "qwe@qwe.qwe",
    userPassword: "qwe",
  },
];

let template_email_address = "";

let OTP = "";
export const baseURL = process.env.REACT_APP_API_URL;
export async function register(information) {
  try {
    const isRegister = await axios.post(`${baseURL}/user`, information);
    OTP = isRegister?.otp;
    return isRegister;
  } catch (e) {
    return e;
  }
}

export async function loginCheck(information) {
  try {
    console.log(information);
    const isLogin = await axios.post(`${baseURL}/user/login`, information);
    return isLogin?.data;
  } catch (e) {
    const error = {
      message: e.message,
      status: false,
    };
    return error;
  }
}

export function emailCheck(information) {
  let check = false;
  registration_information.map((item) => {
    if (information === item.userEmailAddress) {
      check = true;
      return check;
    }
    return check;
  });
  return check;
}

export function resetPWD(information) {
  //   registration_information.map((item) => {
  //     if (information.userEmailAddress === item.userEmailAddress) {
  //       item.userPassword = information.userPassword;
  //     }
  //   });
}

export function generateOTP() {
  // OTP = getOTPfromBackend()
  OTP = "12345";
}

export function checkOTP(code) {
  return code === OTP;
}
export async function emailVarified(email, otp) {
  const data = {
    email,
    otp: otp,
  };
  try {
    const isVarified = await axios.post(`${baseURL}/user/verify-email`, data);
    return isVarified;
  } catch (e) {
    return e;
  }
}
export function resetOTP() {
  OTP = "";
}

export function setTemplateAddress(information) {
  template_email_address = information;
}
export function getTemplateAddress() {
  return template_email_address;
}
