import axios from "axios";

let user = {
    userName: "",
    userRole: "",
    userLogin: false,
};

let order_list = [
    [
        {
            "name": "Type 1",
            "price": 50,
            "quantity": 3,
            "total_price": 150,
            "image": "/static/media/product_1.5a757396ee7ff5dd91c1.png"
        },
        {
            "name": "Type 2",
            "price": 85,
            "quantity": 2,
            "total_price": 170,
            "image": "/static/media/product_2.d4e74f367160ec10fb34.png"
        }
    ],
    [
        {
            "name": "Type 12",
            "price": 85,
            "quantity": 1,
            "total_price": 85,
            "image": "/static/media/product_12.f0cbe3b14beeee568f3a.png"
        },
        {
            "name": "Type 14",
            "price": 85,
            "quantity": 1,
            "total_price": 85,
            "image": "/static/media/product_14.097d9d7b9f1c85e4e293.png"
        },
        {
            "name": "Type 35",
            "price": 85,
            "quantity": 1,
            "total_price": 85,
            "image": "/static/media/product_35.073b8b5de77cfc979821.png"
        }
    ]
]

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
    // } catch (e) {
    //     const error = {
    //       message: e.message,
    //       status: false,
    //     };
    //     return error;
    // }
}
export function getOrderList(){
    return order_list;
}