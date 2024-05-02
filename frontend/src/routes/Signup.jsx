import TextInput from '../components/TextInput.jsx'
import PasswordInput from '../components/PasswordInput.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import * as utils from '../utils/serveRoutes.jsx'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMediaQuery } from 'react-responsive';
import userContext from '../contexts/userContext.jsx';
const SignUp = () => {
    const { email, setEmail, confirmEmail, setConfirmEmail, password, setPassword, confirmPassword, setConfirmPassword, firstName, setFirstName, lastName, setLastName, userName, setUserName, emailError, setEmailError, confirmEmailError, setConfirmEmailError, confirmPasswordError, setConfirmPasswordError, userNameError, setUserNameError } = useContext(userContext);
    const [loading, setLoading] = useState(false); // State for loading indicator
    const navigate = useNavigate();
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const handleEmailChange = (value) => {
        setEmail(value);
        if (value.length != 0 && !validateEmail(value)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
        if (confirmEmail.length != 0 && value !== confirmEmail) {
            setConfirmEmailError('Email addresses do not match');
        } else {
            setConfirmEmailError('');
        }
    }

    const handleConfirmEmailChange = (value) => {
        setConfirmEmail(value);
        if (value.length != 0 && value !== email) {
            setConfirmEmailError('Email addresses do not match');
        } else {
            setConfirmEmailError('');
        }
    }
    const handlePasswordChange = (value) => {
        setPassword(value);
        if (confirmPassword.length!=0 && value !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
        }
        else {
            setConfirmPasswordError("");
        }
    }
    const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value);
        if (value.length != 0 && value !== password) {
            setConfirmPasswordError("Passwords do not match");
        }
        else {
            setConfirmPasswordError("");
        }
    }
    const signUpDetails = async () => {
        setLoading(true); // Set loading to true before API call
        if (!isTermsAccepted) {
            toast.info("Please accept the terms and conditions.");
            return;
        }
        if(!emailError || !confirmEmailError || !confirmPasswordError || !userNameError){
            toast.error("Please fix all the errors.");
            return;
        }
        if (!email || !confirmEmail || !password || !confirmPassword || !firstName || !userName) {
            toast.info("Please fill out all the required fields.")
        }
        const loadingToastId = toast.loading("Loading...");
        let res = await utils.makeUnauthenticatedPOSTRequest('/api/v1/auth/sendotp', { email, userName });
        if (res.data && res.status != 400 && res.data.error) {
            setEmailError(res.data.error);
            toast.dismiss(loadingToastId);
            setLoading(false);
        }
        else if (res.status == 400) {
            setConfirmEmailError('');
            setEmailError('');
            setUserNameError(res.data.error);
            toast.dismiss(loadingToastId);
            setLoading(false);
        }
        else {
            toast.dismiss(loadingToastId);
            toast.success("Verification email sent. Please verify your email to complete signup.");
            setTimeout(() => {
                navigate('/verify-email');
            }, 2000);
            setLoading(false);
        }
    }
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 768 });
    // State to manage checkbox status
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const handleCheckboxChange = () => {
        setIsTermsAccepted(!isTermsAccepted);
    };
    return (
        <>
            <ToastContainer position="top-center" autoClose={1500} pauseOnHover={false} />
            {isDesktopOrLaptop ? (<div className="flex flex-col items-center text-blue-900">
                <div className="brand flex items-center gap-2 p-5 border-b w-full justify-center border-solid">
                    <span><img className="w-12 h-12 rounded-lg bg-white border border-black" src="/images/01 logo2.jpg" alt="XYZ" /></span>
                    <span className="brand-name text-2xl font-bold">XYZ</span>
                </div>
                <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
                    <div className="font-bold mb-4 text-2xl text-center text-pretty">
                        Sign up and start your journey with XYZ!
                    </div>
                    <div className='w-full flex flex-col pb-5'>
                        <TextInput
                            label="What's your email? *"
                            placeholder="Enter your email."
                            className="my-6"
                            value={email}
                            setValue={handleEmailChange}
                        />
                        {emailError && <div className="flex items-center text-red-500 text-sm"><img className='h-5 w-5' src="/images/error.svg" alt="error" />{emailError}</div>}
                    </div>
                    <div className="w-full flex flex-col pb-5">
                        <TextInput
                            label="Confirm your email *"
                            placeholder="Enter your email again."
                            className="mb-6"
                            value={confirmEmail}
                            setValue={handleConfirmEmailChange}
                        />
                        {confirmEmailError && <div className="flex items-center text-red-500 text-sm"><img className='h-5 w-5' src="/images/error.svg" alt="error" />{confirmEmailError}</div>}
                    </div>
                    <div className="w-full flex flex-col pb-5">
                        <PasswordInput
                            label="Create a password *"
                            placeholder="Create a password"
                            className="my-6"
                            value={password}
                            setValue={handlePasswordChange}
                        />
                    </div>
                    <div className="w-full flex flex-col pb-5">
                        <PasswordInput
                            label="Confirm password *"
                            placeholder="Confirm password"
                            className="my-6"
                            value={confirmPassword}
                            setValue={handleConfirmPasswordChange}
                        />
                        {confirmPasswordError && <div className="flex items-center text-red-500 text-sm pt-5"><img className='h-5 w-5' src="/images/error.svg" alt="error" />{confirmPasswordError}</div>}
                    </div>
                    <div className='flex w-full justify-between items-center gap-8'>
                        <TextInput
                            label="First Name *"
                            placeholder="Enter your First Name"
                            className="my-6"
                            value={firstName}
                            setValue={setFirstName}
                        />
                        <TextInput
                            label="Last Name"
                            placeholder="Enter your Last Name"
                            className="my-6"
                            value={lastName}
                            setValue={setLastName}
                        />
                    </div>
                    <div className="w-full flex flex-col pb-5">
                        <TextInput
                            label="Choose your username *"
                            placeholder="Enter your username"
                            className="my-6"
                            value={userName}
                            setValue={setUserName}
                        />
                        {userNameError && <div className="flex items-center text-red-500 text-sm"><img className='h-5 w-5' src="/images/error.svg" alt="error" />{userNameError}</div>}
                    </div>
                    <div className=" w-full flex items-center justify-center my-8">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 font-semibold p-3 px-10 rounded-full transition-transform transform-gpu hover:scale-105"
                            style={{ color: "white" }}
                            onClick={(e) => {
                                e.preventDefault();// prevent default functioning if there to get called 
                                signUpDetails();
                            }}
                        >
                            SIGN UP
                        </button>
                    </div>

                    <div className="flex items-center my-6">
                        <input
                            type="checkbox"
                            id="termsCheckbox"
                            className="mr-2"
                            checked={isTermsAccepted}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="termsCheckbox" className="cursor-pointer">
                            I accept the <span className="underline">terms and conditions</span>.
                        </label>
                    </div>
                    <div className="w-full border border-solid border-gray-300"></div>
                    <div className="my-6 font-semibold text-lg">
                        Already have an account?
                    </div>
                    <div className="border border-gray-500 text-blue-900 w-full flex items-center justify-center py-4 rounded-full font-bold">
                        <Link
                            to="/login"
                            className="transition-transform transform-gpu hover:scale-105"
                        >
                            LOGIN IN INSTEAD
                        </Link>
                    </div>
                </div>
            </div>) : (<div className="flex flex-col items-center text-blue-900">
                <div className="brand flex items-center gap-2 p-5 border-b w-full justify-center border-solid">
                    <span><img className="w-12 h-12 rounded-lg bg-white border border-black" src="/images/01 logo2.jpg" alt="XYZ" /></span>
                    <span className="brand-name text-2xl font-bold">XYZ</span>
                </div>
                <div className="inputRegion w-full py-10 flex items-center justify-center flex-col">
                    <div className="font-bold mb-4 text-2xl text-center text-pretty">
                        Sign up and start your journey with XYZ!
                    </div>
                    <div className='w-full px-2 flex flex-col pb-5'>
                        <TextInput
                            label="What's your email? *"
                            placeholder="Enter your email."
                            className="my-6"
                            value={email}
                            setValue={handleEmailChange}
                        />
                        {emailError && <div className="flex items-center text-red-500 text-sm"><img className='h-5 w-5' src="/images/error.svg" alt="error" />{emailError}</div>}
                    </div>
                    <div className="w-full flex px-2 flex-col pb-5">
                        <TextInput
                            label="Confirm your email *"
                            placeholder="Enter your email again."
                            className="mb-6"
                            value={confirmEmail}
                            setValue={handleConfirmEmailChange}
                        />
                        {confirmEmailError && <div className="flex items-center text-red-500 text-sm"><img className='h-5 w-5' src="/images/error.svg" alt="error" />{confirmEmailError}</div>}
                    </div>
                    <div className="w-full flex px-2 flex-col pb-5">
                        <div className="w-full flex flex-col pb-5">
                            <PasswordInput
                                label="Create a password *"
                                placeholder="Create a password"
                                className="my-6"
                                value={password}
                                setValue={handlePasswordChange}
                            />
                        </div>
                        <div className="w-full flex flex-col pb-5">
                            <PasswordInput
                                label="Confirm password *"
                                placeholder="Confirm password"
                                className="my-6"
                                value={confirmPassword}
                                setValue={handleConfirmPasswordChange}
                            />
                            {confirmPasswordError && <div className="flex items-center text-red-500 text-sm"><img className='h-5 w-5' src="/images/error.svg" alt="error" />{confirmPasswordError}</div>}
                        </div>
                    </div>
                    <div className='flex w-full px-2 justify-between items-center flex-wrap gap-2'>
                        <TextInput
                            label="First Name *"
                            placeholder="Enter your First Name"
                            className="my-6"
                            value={firstName}
                            setValue={setFirstName}
                        />
                        <TextInput
                            label="Last Name"
                            placeholder="Enter your Last Name"
                            className="my-6"
                            value={lastName}
                            setValue={setLastName}
                        />
                    </div>
                    <div className="w-full flex px-2 flex-col pb-5">
                        <TextInput
                            label="Choose your username *"
                            placeholder="Enter your username"
                            className="my-6"
                            value={userName}
                            setValue={setUserName}
                        />
                        {userNameError && <div className="flex items-center text-red-500 text-sm"><img className='h-5 w-5' src="/images/error.svg" alt="error" />{userNameError}</div>}
                    </div>
                    <div className=" w-full flex items-center justify-center my-8">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 font-semibold p-3 px-10 rounded-full transition-transform transform-gpu hover:scale-105"
                            style={{ color: "white" }}
                            onClick={(e) => {
                                e.preventDefault();// prevent default functioning if there to get called 
                                signUpDetails();
                            }}
                        >
                            SIGN UP
                        </button>
                    </div>

                    <div className="flex items-center my-6">
                        <input
                            type="checkbox"
                            id="termsCheckbox"
                            className="mr-2 cursor-pointer"
                            checked={isTermsAccepted}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="termsCheckbox" className="cursor-pointer">
                            I accept the <span className="underline">terms and conditions</span>.
                        </label>
                    </div>
                    <div className="w-full border border-solid border-gray-300"></div>
                    <div className="my-6 font-semibold text-lg">
                        Already have an account?
                    </div>
                    <div className="border border-gray-500 text-blue-900 w-full flex items-center justify-center py-4 rounded-full font-bold">
                        <Link
                            to="/login"
                            className="transition-transform transform-gpu hover:scale-105"
                        >
                            LOGIN IN INSTEAD
                        </Link>
                    </div>
                </div>
            </div>)}
        </>
    );
};

export default SignUp;
