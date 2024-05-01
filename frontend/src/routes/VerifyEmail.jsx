import { useState,useContext } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import * as utils from '../utils/serveRoutes'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userContext from "../contexts/userContext";
function VerifyEmail() {
    const {email,password,firstName,lastName,userName} = useContext(userContext);
   
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const resendOtp=async ()=>{
        console.log(email);
        const res = await utils.makeUnauthenticatedPOSTRequest('/api/v1/auth/sendotp', { email, userName });
        toast.success("The OTP has been resend succesfully.");
    }
    const otpVerification=async (e)=>{
        e.preventDefault(); // prevent default form submission
        const loadingToastId = toast.loading("Loading...");
        const data = { email, password, userName, firstName, lastName,otp};
        const res = await utils.makeUnauthenticatedPOSTRequest('/api/v1/auth/signup', data);
        if(res.data.success===false){
            toast.dismiss(loadingToastId);
            toast.error("Invalid OTP, Please enter a valid one.")
        }
        else {
            toast.dismiss(loadingToastId);
            toast.success("Email verification successful. Welcome to XYZ!");
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }
    }
    return (
        <>
            <ToastContainer position="top-center" autoClose={1500} pauseOnHover={false} />
            <div className="min-h-[calc(100vh-3.5rem)] h-screen text-blue-900 grid place-items-center">
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                        Verify Email
                    </h1>
                    <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
                        A verification code has been sent to you. Enter the code below
                    </p>
                    <form onSubmit={otpVerification}>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    placeholder="-"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        backgroundColor:"white"
                                    }}
                                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                        >
                            Verify Email
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/signup">
                            <p className="text-richblack-5 flex items-center gap-x-2">
                                <BiArrowBack /> Back To Signup
                            </p>
                        </Link>
                        <button
                            className="flex items-center text-blue-900 gap-x-2"
                            onClick={() => {resendOtp()}}
                        >
                            <RxCountdownTimer />
                            Resend it
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VerifyEmail;
