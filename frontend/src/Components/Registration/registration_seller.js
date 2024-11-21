
let registration_information_seller = []

let template_email_address = ""

let OTP = ""

export function register_seller(information){
    let temp = {
        userName: information.userName,
        userEmailAddress: information.userEmailAddress,
        userPassword: information.userPassword
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


export async function sendDataToBackend(information){
    // try {
    //     const response = await fetch('http://localhost:8000', {
    //         method: 'POST',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(registration_information_seller),
    //     });

    //     if (!response.ok) {
    //         throw new Error('Request failed');
    //     }

    //     const data = await response.json();
    //     console.log(data);
    // } catch (error) {
    //     console.error('Request error:', error.message);
    // }
    console.log(information);
}