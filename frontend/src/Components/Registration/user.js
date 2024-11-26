import axios from "axios";

let user = {
    userName: "",
    userRole: "",
    userLogin: false,
};

let order_list = []

const baseURL = process.env.REACT_APP_API_URL;

export function setUser(information){
    user.userName = information.userName;
    user.userRole = information.userRole;
    user.userLogin = true;
}

export function getUser(){
    return user;
}

export function logout(){
    user.userLogin = false;
}

export async function orderCheckOut(information){
    order_list.push(information);
    console.log(order_list);
    // try {
    //     console.log(information);
    //     const respond = await axios.post(`${baseURL}/user/order`, information);
    //     return respond?.data;
    //   } catch (e) {
    //     const error = {
    //       message: e.message,
    //       status: false,
    //     };
    //     return error;
    //   }
}
export async function getOrderList(){
    return order_list;
}