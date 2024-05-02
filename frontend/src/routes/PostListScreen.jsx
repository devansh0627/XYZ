import { useEffect, useState,useContext } from 'react';
import * as utils from '../utils/serveRoutes.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import userContext from '../contexts/userContext.jsx';

const PostListScreen = () => {
  const [profilePic, setProfilePic] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate=useNavigate();
  const { email, setEmail, confirmEmail, setConfirmEmail, password, setPassword, confirmPassword, setConfirmPassword, firstName, setFirstName, lastName, setLastName, userName, setUserName, emailError, setEmailError, confirmEmailError, setConfirmEmailError, confirmPasswordError, setConfirmPasswordError, userNameError, setUserNameError } = useContext(userContext);

  const [data,setData]=useState([]);
  const getData=async()=>{
    const toastId=toast.loading("Loading...")
    try{
    const res=await utils.makeAuthenticatedGETRequest('/api/v1/auth/posts');
    toast.dismiss(toastId);
    setData(prev => [...prev, ...res.data]);
    }
    catch(e){toast.dismiss(toastId);console.log(e);}  
  };
  useEffect(()=>{
    getData();
  },[])
  
  const handleInfiniteScroll = async ()=>{
    try{
        if(window.innerHeight + document.documentElement.scrollTop+1>=document.documentElement.scrollHeight){
          getData();
        }
    }
    catch(e){console.log(e);}
  }
  useEffect(()=>{
    window.addEventListener('scroll',handleInfiniteScroll);
    return ()=>window.removeEventListener("scroll",handleInfiniteScroll);
  },[])
  const [cookies, setCookie, removeCookie] = useCookies(['tokenForAuth', 'tokenForFirstName', 'tokenForLastName']);
  useEffect(() => {
    const getProfilePic = async () => {
      const res = await utils.makeAuthenticatedGETRequest("/api/v1/profile/profile-pic");
      if (res.success) {
        setProfilePic(res.data.imageUrl);
      }
    };
    getProfilePic();
  }, []);

  const handleLogout = () => {
   
const loadingToastId = toast.loading("Logging out...");
const temp = async () => {
   await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate a 1 second delay for the logout process
}
temp();
// Hide loading toast message
toast.dismiss(loadingToastId);
toast.success("Logout Successful! See you soon!", {
   autoClose: 1500,
   onClose: () => {
       removeCookie('tokenForAuth');
       removeCookie('tokenForFirstName');
       removeCookie('tokenForLastName');
       setEmail('');
       setConfirmEmail('');
       setPassword('');
       setConfirmPassword('');
       setFirstName('');
       setLastName('');
       setUserName('');
       setEmailError('');
       setConfirmEmailError("");
       setConfirmPasswordError("");
       setUserNameError("");
       navigate('/');
   }
});
  };

  const handleChangeProfilePic = () => {
    navigate('/update-profile-pic')
    console.log("Change profile picture clicked");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const handleDropdownClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the document
  };
  return (
    <>
      <ToastContainer position="bottom-center" autoClose={1500} pauseOnHover={false} />
      <div className="flex justify-between items-center mb-4 text-blue-900">
        <div className="flex items-center">
          <img src="images/01 logo2.jpg" alt="Logo" className="h-8 w-auto" />
          <h1 className="text-2xl font-semibold ml-2">XYZ</h1>
        </div>
        <div className="relative" onClick={handleDropdownClick}>
          <img
            src={profilePic}
            alt="Profile"
            className="h-8 w-auto rounded-2xl mt-1 mr-1 cursor-pointer"
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="absolute right-1 mt-2 w-48 bg-blue-100 rounded-md shadow-lg z-10 ">
              <button
                onClick={handleChangeProfilePic}
                className="block w-full text-left px-4 py-2 text-blue-900 hover:bg-blue-50 hover:rounded:md"
              >
                Change Profile Picture
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-blue-900 hover:bg-blue-50 hover:rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((post,index) => (
          <div key={post.id} className="bg-white shadow-md p-4">
            <h2 className="text-lg font-semibold">{index+1}</h2>
            <img src={post.imageUrl} alt={post.title} className="mt-2 rounded-lg" />
            <p className="mt-2">{post.content}</p>
          </div>
        ))}
    
      </div>
    </>
  );
};

export default PostListScreen;
