import TextInput from '../components/TextInput.jsx'
import PasswordInput from '../components/PasswordInput.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as utils from '../utils/serveRoutes.jsx'
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMediaQuery } from 'react-responsive';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [credentialsError, setCredentialsError] = useState('');
    const [cookie, setCookie] = useCookies(['tokenForAuth', 'tokenForFirstName', 'tokenForLastName']);
    const navigate = useNavigate();
    const loginDetails = async () => {
        // Display loading toast message
        const loadingToastId = toast.loading("Logging in..."); // Show loading toast message
        const data = { email, password };
        const res = await utils.makeAuthenticatedPOSTRequest('/api/v1/auth/login', data);
        console.log(res);
        if (!res.success) {
            toast.dismiss(loadingToastId);
            setCredentialsError("Invalid Credentials");
            return;
        }
        console.log(res);
        const token = res.token;
        const date = new Date();
        // Simulate delay before showing success message
        setTimeout(() => {
            // Hide loading toast message
            toast.dismiss(loadingToastId);
            // Display success toast message
            toast.success("Login Successful! Welcome back to XYZ!", {
                autoClose: 1500,
                onClose: () => {
                    date.setDate(date.getDate() + 30);
                    setCookie("tokenForAuth", token, { path: "/", expires: date });
                    setCookie("tokenForFirstName", res.user.firstName, { path: "/", expires: date });
                    setCookie("tokenForLastName", res.user.lastName, { path: "/", expires: date });
                    navigate('/');
                }
            });
        }, 1000); // Simulate 1 second delay before showing success message
    };
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 768 });
    return (
        <>
            <ToastContainer position="top-center" autoClose={1500} pauseOnHover={false} />
            {isDesktopOrLaptop ? (<div className="w-full h-screen flex flex-col items-center text-blue-900" >
                <div className="brand flex items-center gap-2 p-5 border-black w-full justify-center border-solid">
                    <span><img className="w-12 h-12 rounded-lg bg-white border border-black" src="/images/01 logo2.jpg" alt="XYZ" /></span>
                    <span className="brand-name text-2xl font-bold">XYZ</span>
                </div>
                <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
                    {/*  I will have my 2 inputs(email and password) and I will have my sign up instead button*/}
                    <div className="font-bold mb-4 text-center text-pretty">
                        To continue, log in to XYZ.
                    </div>
                    <TextInput
                        label="Email address or username"
                        placeholder="Email address or username"
                        className="my-6"
                        value={email}
                        setValue={setEmail}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Password"
                        value={password}
                        setValue={setPassword}
                    />
                    {credentialsError && <div className="flex items-center text-red-500 pt-5 text-sm"><img className='h-5 w-5' src="/images/error.svg" alt="error" />{credentialsError}</div>}
                    <div className="w-full flex items-center justify-end mt-2 text-sm hover:underline cursor-pointer" onClick={()=>{
                        navigate('/forgot-password')
                    }}>
                        Forgot Password
                    </div>
                    <div className=" w-full flex items-center justify-end my-8">
                        <button
                            className="font-semibold p-3 px-10 rounded-full transition-transform transform-gpu hover:scale-105 text-white bg-blue-500 hover:bg-blue-700"
                            onClick={(e) => {
                                e.preventDefault();
                                loginDetails();
                            }}
                        >
                            LOG IN
                        </button>
                    </div>
                    <div className="w-full border border-solid border-gray-300"></div>
                    <div className="my-6 font-semibold text-lg">
                        Don&#39;t have an account?
                        {/* &#39; is for ' mark*/}
                    </div>
                    <div className="border border-gray-500 text-blue-900 w-full flex items-center justify-center p-4 rounded-full font-bold hover:scale-105 cursor-pointer" onClick={()=>{navigate('/signup')}}>
                        <Link
                            to="/signup"
                            className="transition-transform transform-gpu hover:scale-105 text-center"
                        >
                            SIGN UP FOR XYZ
                        </Link>
                    </div>

                </div>
            </div>) : (<div className="w-full h-screen flex flex-col items-center text-blue-900" >
                <div className="brand flex items-center gap-2 p-5 border-black w-full justify-center border-solid">
                    <span><img className="w-12 h-12 rounded-lg bg-white border border-black" src="/images/01 logo2.jpg" alt="XYZ" /></span>
                    <span className="brand-name text-2xl font-bold">XYZ</span>
                </div>
                <div className="inputRegion w-full py-10 px-2 flex items-center justify-center flex-col">
                    {/*  I will have my 2 inputs(email and password) and I will have my sign up instead button*/}
                    <div className="font-bold mb-4 text-center text-pretty">
                        To continue, log in to XYZ.
                    </div>
                    <TextInput
                        label="Email address or username"
                        placeholder="Email address or username"
                        className="my-6"
                        value={email}
                        setValue={setEmail}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Password"
                        value={password}
                        setValue={setPassword}
                    />
                    {credentialsError && <div className="flex items-center text-red-500 pt-5 text-sm"><img className='h-5 w-5' src="/images/error.svg" alt="error" />{credentialsError}</div>}
                    <div className="w-full flex items-center justify-end mt-2 text-sm hover:underline cursor-pointer" onClick={()=>{
                        navigate('/forgot-password')
                    }}>
                        Forgot Password
                    </div>
                    <div className=" w-full flex items-center justify-center my-8">
                    <button
                            className="font-semibold p-3 px-10 rounded-full transition-transform transform-gpu hover:scale-105 text-white bg-blue-500 hover:bg-blue-700"
                            onClick={(e) => {
                                e.preventDefault();
                                loginDetails();
                            }}
                        >
                            LOG IN
                        </button>
                    </div>
                    <div className="w-full border border-solid border-gray-300"></div>
                    <div className="my-6 font-semibold text-lg">
                        Don&#39;t have an account?
                        {/* &#39; is for ' mark*/}
                    </div>
                    <div className="border border-gray-500 text-blue-900 w-full flex items-center justify-center p-4 rounded-full font-bold hover:scale-105 cursor-pointer" onClick={()=>{navigate('/signup')}}>
                        <Link
                            to="/signup"
                            className="transition-transform transform-gpu hover:scale-105 text-center"
                        >
                            SIGN UP FOR XYZ
                        </Link>
                    </div>
                </div>
            </div>)}
        </>
    );
};

export default Login;
