import axios from "axios";
import { store } from "../../reduxfolder/store";

export const baseURL = process.env.REACT_APP_API_URL;

let product_list = [];
const idToken = store.getState();
export async function postInformationToBackend(order, role, information) {
  let url = "";
  let auth = false;
  console.log(information);

  switch (order) {
    case "register":
      url = `${baseURL}/${role}`;
      break;
    case "login":
      url = `${baseURL}/${role}/login`;
      break;
    case "email_verify":
      url = `${baseURL}/${role}/verify-email`;
      break;
    case "forgetPWD":
      url = `${baseURL}/${role}/forgot-password`;
      break;
    case "resetPWD":
      url = `${baseURL}/${role}/update-forgot-password`;
      break;
    case "submitProduct":
      url = `${baseURL}/${role}/add-product`;

      auth = true;
      break;
    default:
      console.log("no order");
  }
  console.log(information);

  if (auth) {
    try {
      console.log(url);
      console.log("idToken", idToken);
      console.log("information", information);

      const postData = await axios.post(url, information, {
        headers: {
          Authorization: `Bearer ${idToken?.user?.authToken}`,
        },
      });
      console.log("postData", postData);

      return postData?.data;
    } catch (e) {
      const error = {
        message: e.message,
        status: false,
      };
      return error;
    }
  } else {
    try {
      console.log(url);

      const postData = await axios.post(url, information);
      console.log(postData);

      return postData?.data;
    } catch (e) {
      const error = {
        message: e.message,
        status: false,
      };
      return error;
    }
  }
}
export function getProductList() {
  return product_list;
}
export function removeProductList(index) {
  let new_list = [];
  product_list.map((item, i) => {
    if (i != index) {
      new_list.push(item);
    }
  });
  product_list = new_list;
  return product_list;
}

export async function getInformationToBackend(order, role) {
  let url = "";
  let auth = false;
  switch (order) {
    case "getOrderIds":
      url = `${baseURL}/${role}/orders`;
      auth = true;
      break;
    default:
      console.log("no order");
  }
  if (auth) {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
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
