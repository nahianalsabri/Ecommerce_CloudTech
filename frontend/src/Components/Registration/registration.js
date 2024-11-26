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

export async function postInformationToBackend(order, role, information){
  let url = ""
  switch (order){
      case "register":
          url = `${baseURL}/${role}`;
      case "login":
          url = `${baseURL}/${role}/login`;
      case "email_verify":
          url = `${baseURL}/${role}/verify-email`;
      case "forgetPWD":
          url = `${baseURL}/${role}/forget-password`;
      case "resetPWD":
          url = `${baseURL}/${role}/update-forget-password`;
      case "submitProduct":
          url = `${baseURL}/${role}/add-product`
      default:
          console.log("no order");
  }
  try {
      console.log(information);
      const postData = await axios.post(url, information);
      return postData?.data;
    } catch (e) {
      const error = {
        message: e.message,
        status: false,
      };
      return error;
    }
}

export async function getInformationToBackend(order, role){
  // try {
  //   const token = "email"; // Replace with your actual token
  //   const response = await axios.get(`${baseURL}/user/me`, {
  //     headers: {
  //       Authorization: Bearer {token},
  //     },
  //   });
  //   console.log(response.data);
  // } catch (error) {
  //   console.error(error);
  // }
}
// export async function register(information) {
//   try {
//     const isRegister = await axios.post(`${baseURL}/user`, information);
//     OTP = isRegister?.otp;
//     return isRegister;
//   } catch (e) {
//     return e;
//   }
// }

// export async function loginCheck(information) {
//   try {
//     console.log(information);
//     const isLogin = await axios.post(`${baseURL}/user/login`, information);
//     return isLogin?.data;
//   } catch (e) {
//     const error = {
//       message: e.message,
//       status: false,
//     };
//     return error;
//   }
// }

// export function emailCheck(information) {
//   let check = false;
//   registration_information.map((item) => {
//     if (information === item.userEmailAddress) {
//       check = true;
//       return check;
//     }
//     return check;
//   });
//   return check;
// }

// export function resetPWD(information) {
//   //   registration_information.map((item) => {
//   //     if (information.userEmailAddress === item.userEmailAddress) {
//   //       item.userPassword = information.userPassword;
//   //     }
//   //   });
// }

// export async function generateOTP(address) {
//   try {
//     console.log(address);
//     const postAddress = await axios.post(`${baseURL}/user/forget-password`, address);
//     return postAddress?.data;
//   } 
//   catch (e) {
//     const error = {
//       message: e.message,
//       status: false,
//     };
//     return error;
//   }
// }

// export async function checkOTP(information) {
//   const isLogin = await axios.post(`${baseURL}/user/login`, information);
// }
// export async function emailVarified(email, otp) {
//   const data = {
//     email,
//     otp: otp,
//   };
//   try {
//     const isVarified = await axios.post(`${baseURL}/user/verify-email`, data);
//     return isVarified;
//   } catch (e) {
//     return e;
//   }
// }

// export function resetOTP() {
//   OTP = "";
// }

// export function setTemplateAddress(information) {
//   template_email_address = information;
// }
// export function getTemplateAddress() {
//   return template_email_address;
// }
