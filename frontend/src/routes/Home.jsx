import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-center max-w-md mx-auto">
                <div className="mb-4 flex justify-center rounded-lg">
                   <img src="/images/01 logo2.jpg" alt="" className='w-40 h-40'/>
                </div>
                <h1 className="text-4xl font-bold mb-4 text-blue-900">Welcome to XYZ</h1>
                <p className="text-lg mb-8 text-blue-800">Get started by logging in or signing up</p>
                <div className="space-x-4">
                    <button className="bg-blue-500 hover:bg-blue-700 hover:scale-105 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300" onClick={handleLoginClick}>Login</button>
                    <button className="bg-blue-500 hover:bg-blue-700 hover:scale-105 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300" onClick={handleSignupClick}>Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
