import { createContext } from "react";

const userContext = createContext({
    email:'',
    setEmail:()=>{},
    confirmEmailmail:'',
    setConfirmEmail:()=>{},
    password:'',
    setPassword:()=>{},
    confirmPassword:'',
    setConfirmPassword:()=>{},
    firstName:'',
    setFirstName:()=>{},
    lastName:'',
    setLastName:()=>{},
    userName:'',
    setUserName:()=>{},
    emailError:'',
    setEmailError:()=>{},
    confirmEmailError:'',
    setConfirmEmailError:()=>{},
    confirmPasswordError:'',
    setConfirmPasswordError:()=>{},
    userNameError:'',
    setUserNameError:()=>{}
});

export default userContext;