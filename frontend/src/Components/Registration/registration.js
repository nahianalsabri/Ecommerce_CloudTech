
let registration_information = [{
    userName: "qwe",
    userEmailAddress: "qwe@qwe.qwe",
    userPassword: "qwe"
}]

let template_email_address = ""

let OTP = ""

export async function register(information){
    try{
        const isRegister= await axios.post(`${baseURL}/user`,information)
        return isRegister
    }catch(e){
        return e
    }
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
    return (code === OTP);
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