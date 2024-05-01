import { useState } from "react"
import PasswordInput from '../components/PasswordInput.jsx';
import { BiArrowBack } from "react-icons/bi"
import { Link, useParams, useNavigate } from "react-router-dom"
import * as utils from '../utils/serveRoutes.jsx'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function UpdatePassword() {
    const navigate = useNavigate()
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleOnSubmit = async (e) => {
        const loadingToastId = toast.loading("Loading...");
        e.preventDefault();
        const data = { password, confirmPassword, token };
        const res = await utils.makeUnauthenticatedPOSTRequest('/api/v1/auth/reset-password', data);
        if (res.data.success) {
            toast.dismiss(loadingToastId);
            toast.success(res.data.message);
            setTimeout(() => {
                navigate('/login');
            }, 2000);  
        }
        else {
            toast.dismiss(loadingToastId);
            toast.error(res.data.message);
        }
    }

    return (
        <>
            <ToastContainer position="top-center" autoClose={1500} pauseOnHover={false} />
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center text-blue-900 h-screen">
                <div className="spinner"></div>
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                        Choose new password
                    </h1>
                    <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                        Almost done. Enter your new password and you are all set.
                    </p>
                    <div className="space-y-3">
                        <PasswordInput
                            label="Create a new password"
                            placeholder="Create a new password"
                            value={password}
                            setValue={setPassword}
                        />
                        <PasswordInput
                            label="Confirm password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                        />
                    </div>
                    <button
                        className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                        onClick={handleOnSubmit}>
                        Reset Password
                    </button>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/login">
                            <p className="flex items-center gap-x-2 text-richblack-5">
                                <BiArrowBack /> Back To Login
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdatePassword
