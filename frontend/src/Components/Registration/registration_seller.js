import axios from "axios";

let registration_information_seller = []

let template_email_address = ""

let OTP = ""

export const baseURL = process.env.REACT_APP_API_URL;

// export async function postInformationToBackend(order, information){
//     let url = ""
//     switch (order){
//         case "register":
//             url = `${baseURL}/seller`;
//         case "login":
//             url = `${baseURL}/seller/login`;
//         case "email_verify":
//             url = `${baseURL}/seller/verify-email`;
//         case "forgetPWD":
//             url = `${baseURL}/seller/forget-password`;
//         case "resetPWD":
//             url = `${baseURL}/seller/update-forget-password`;
//         case "submitProduct":
//             url = `${baseURL}/seller/add-product`
//         default:
//             console.log("no order");
//     }
//     try {
//         console.log(information);
//         const postData = await axios.post(url, information);
//         return postData?.data;
//       } catch (e) {
//         const error = {
//           message: e.message,
//           status: false,
//         };
//         return error;
//       }
// }
export async function register_seller(information){
    try {
        const isRegister = await axios.post(`${baseURL}/seller`, information);
        OTP = isRegister?.otp;
        return isRegister;
      } catch (e) {
        return e;
      }
}

export async function loginCheck_seller(information){
    try {
        console.log(information);
        const isLogin = await axios.post(`${baseURL}/seller/login`, information);
        return isLogin?.data;
      } catch (e) {
        const error = {
          message: e.message,
          status: false,
        };
        return error;
      }
}
export function emailCheck_seller(information){
    let check = false;
    registration_information_seller.map((item) => {
            if(information === item.userEmailAddress){
                check = true
                return check
            }
            return check
        }
    )
    return check
}
export async function resetPWD_seller(information){
    try {
        console.log(information);
        const resetPWD = await axios.post(`${baseURL}/seller/update-forget-password`, information);
        return resetPWD?.data;
      } 
      catch (e) {
        const error = {
          message: e.message,
          status: false,
        };
        return error;
      }
}

export async function generateOTP_seller(address){
    try {
        console.log(address);
        const postAddress = await axios.post(`${baseURL}/seller/forget-password`, address);
        return postAddress?.data;
      } 
      catch (e) {
        const error = {
          message: e.message,
          status: false,
        };
        return error;
      }
}
export function checkOTP_seller(code){
    return code === OTP
}
export async function emailVarified_seller(email, otp) {
    const data = {
      email,
      otp: otp,
    };
    try {
      const isVarified = await axios.post(`${baseURL}/seller/verify-email`, data);
      return isVarified;
    } catch (e) {
      return e;
    }
}

export function setTemplateAddress_seller(information){
    template_email_address = information
}
export function getTemplateAddress_seller(){
    return template_email_address
}
