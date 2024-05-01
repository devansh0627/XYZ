import PropTypes from 'prop-types';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
const PasswordInput = ({ label, placeholder, value, setValue }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
        <div className="PasswordInputDiv flex flex-col space-y-2 w-full">
            <label htmlFor={label} className="font-semibold">
                {label}
            </label>
            <div className='flex flex-col space-y-2 w-full relative'>
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                className="p-3 border border-gray-400 border-solid rounded placeholder-gray-500 text-black"
                id={label}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
             <button
                    className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none bottom-2"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                        
                    ) : (
                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    )}
                </button>
            </div>
        </div>
        </>
    );
};

PasswordInput.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
};

export default PasswordInput;
