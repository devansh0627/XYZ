import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import * as utils from "../utils/serveRoutes.jsx"
import { Link } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)

  
  const handleOnSubmit = async (e) => {
    const loadingToastId=toast.loading("Loading...");
    e.preventDefault()
    const res = await utils.makeUnauthenticatedPOSTRequest('/api/v1/auth/reset-password-token', { email });
    if (res.data.success) {
      toast.dismiss(loadingToastId);
      toast.success(res.data.message);
    }
    else{
      toast.dismiss(loadingToastId);
      toast.error(res.data.message);
    }
  }

  return (
    <>
     <ToastContainer position="top-center" autoClose={1500} pauseOnHover={false} />
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center h-screen text-blue-900">
        <div className="spinner"></div>
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password."
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full py-2 px-4 rounded-md border border-gray-300"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              {!emailSent ? "Sumbit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
