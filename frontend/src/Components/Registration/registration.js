
let registration_information = [{
    userName: "qwe",
    userEmailAddress: "qwe@qwe.qwe",
    userPassword: "qwe"
}]

let template_email_address = ""

let OTP = ""

export function register(information){
    let temp = {
        userName: information.userName,
        userEmailAddress: information.userEmailAddress,
        userPassword: information.userPassword
    }
    registration_information.push(temp)
    console.log(registration_information);
}

export function loginCheck(information){
    let check = false;
    registration_information.map((item) => {
            if(information.userEmailAddress === item.userEmailAddress &&
                information.userPassword === item.userPassword
            ){
                check = true
                return check
            }
        }
    )
    return check
}

export function emailCheck(information){
    let check = false;
    registration_information.map((item) => {
            if(information === item.userEmailAddress){
                check = true
                return check
            }
            return check
        }
    )
    return check
}

export function resetPWD(information){
    registration_information.map((item) => {
        if(information.userEmailAddress === item.userEmailAddress
        ){
            item.userPassword = information.userPassword
        }
    })
}

export function generateOTP(){
    // OTP = getOTPfromBackend()
    OTP = "12345"
}

export function checkOTP(code){
    if (code === OTP){
        resetOTP()
        return true
    }else{
        return false
    }
}

export function resetOTP(){
    OTP = ""
}

export function setTemplateAddress(information){
    template_email_address = information
}
export function getTemplateAddress(){
    return template_email_address
}