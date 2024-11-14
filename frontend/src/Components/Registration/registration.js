let registration_information = {
    userName: "",
    userEmailAddress: "",
    userPassword: ""
}

export function register(information){
    registration_information.userName = information.userName;
    registration_information.userEmailAddress = information.userEmailAddress;
    registration_information.userPassword = information.userPassword;
    console.log(registration_information);
}

export function loginCheck(information){
    if(information.userEmailAddress === registration_information.userEmailAddress &&
        information.userPassword === registration_information.userPassword
    ){
        return true;
    }else{
        return false;
    }
}