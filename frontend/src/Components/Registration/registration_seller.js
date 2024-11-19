
let registration_information_seller = []

let template_email_address = ""

let OTP = ""

export function register_seller(information){
    let temp = {
        userName: information.userName,
        userEmailAddress: information.userEmailAddress,
        userPassword: information.userPassword,
        userCompanyName: information.userCompanyName,
        userProductionName: information.userProductionName,
        userProductPrice: information.userProductPrice,
        userProductDescription: information.userProductDescription
    }
    registration_information_seller.push(temp)
    console.log(registration_information_seller);
}

export function loginCheck_seller(information){
    let check = false;
    registration_information_seller.map((item) => {
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

export function resetPWD_seller(information){
    registration_information_seller.map((item) => {
        if(information.userEmailAddress === item.userEmailAddress
        ){
            item.userPassword = information.userPassword
        }
    })
}

export function generateOTP_seller(){
    // OTP = getOTPfromBackend()
    OTP = "12345"
}

export function checkOTP_seller(code){
    if (code === OTP){
        return true
    }else{
        return false
    }
}

export function resetOTP_seller(){
    OTP = ""
}

export function setTemplateAddress_seller(information){
    template_email_address = information
}
export function getTemplateAddress_seller(){
    return template_email_address
}