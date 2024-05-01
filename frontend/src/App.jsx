import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import SignUp from './routes/Signup.jsx'
import VerifyEmail from "./routes/VerifyEmail.jsx";
import userContext from "./contexts/userContext.jsx";
import ForgotPassword from "./routes/ForgotPassword.jsx";
import UpdatePassword from "./routes/UpdatePassword.jsx";
import PostListScreen from "./routes/PostListScreen.jsx";
import UpdateProfilePicture from "./routes/UpdateProfilePicture.jsx";
import { useCookies } from 'react-cookie';
import { useState } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmEmailError, setConfirmEmailError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [cookie] = useCookies(['tokenForAuth']);
  const queryClient = new QueryClient();

  return (
    <>
      <div className="w-full h-full bg-blue-100">
        <BrowserRouter>
          {cookie.tokenForAuth ? (<QueryClientProvider client={queryClient}>
            <userContext.Provider value={{ email, setEmail, confirmEmail, setConfirmEmail, password, setPassword, confirmPassword, setConfirmPassword, firstName, setFirstName, lastName, setLastName, userName, setUserName, emailError, setEmailError, confirmEmailError, setConfirmEmailError, userNameError, confirmPasswordError, setConfirmPasswordError, setUserNameError }}>
              <Routes>
                <Route path="/postlist" element={<PostListScreen />}></Route>
                <Route path="/update-profile-pic" element={<UpdateProfilePicture/>}></Route>
                <Route path='*' element={<Navigate to={'/postlist'} />}></Route>
              </Routes>
            </userContext.Provider>
          </QueryClientProvider>) : (
            <userContext.Provider value={{ email, setEmail, confirmEmail, setConfirmEmail, password, setPassword, confirmPassword, setConfirmPassword, firstName, setFirstName, lastName, setLastName, userName, setUserName, emailError, setEmailError, confirmEmailError, setConfirmEmailError, userNameError, confirmPasswordError, setConfirmPasswordError, setUserNameError }}>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path="/verify-email" element={<VerifyEmail />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/update-password/:token" element={<UpdatePassword />}></Route>
            <Route path='*' element={<Navigate to={'/'} />}></Route>
          </Routes>
          </userContext.Provider>)}
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
