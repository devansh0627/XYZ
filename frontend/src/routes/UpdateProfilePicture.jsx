import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { backendUrl } from '../utils/config';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa'; // Import the cloud upload and close icons
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const UpdateProfilePicture = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [cookie] = useCookies(['tokenForAuth']);
    const navigate=useNavigate();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        // Show thumbnail preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleDelete = () => {
        setFile(null);
        setPreview(null);
            // Reset file input value
        const fileInput = document.getElementById('file-upload');
        if (fileInput) {
        fileInput.value = '';
    }

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const toastId=toast.loading("Updating...");
        const formData = new FormData();
        formData.append('displayPicture', file);

        try {
            const token = cookie.tokenForAuth;
            const response = await fetch(backendUrl + '/api/v1/profile/updateDisplayPicture', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                toast.dismiss(toastId);
                const data = await response.json();
                if (data.success) {
                    toast.success(data.message);
                }
                setTimeout(() => {
                    navigate('/postlist');
                }, 2000);
                // Handle success message or update UI accordingly
            } else {
                toast.dismiss(toastId);
                throw new Error('Failed to update profile picture');
            }
        } catch (error) {
            toast.error("Error updating profile picture");
            console.error('Error updating profile picture:', error);
            // Handle error or display error message
        }
    };

    return (
        <>
         <ToastContainer position="top-center" autoClose={1500} pauseOnHover={false} />
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-screen">
                <label htmlFor="file-upload" className="relative cursor-pointer">
                    <div className="border-dotted border-2 border-gray-400 rounded-md p-4">
                        {preview ? (
                            <>
                                <img src={preview} alt="Preview" className="rounded-md" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                <button type="button" onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete();
                                }
                                } className="absolute top-0 right-0 m-2 text-red-500 hover:text-red-700">
                                    <FaTimes />
                                </button>
                            </>
                        ) : (
                            <FaCloudUploadAlt className="w-12 h-12 mr-2 bg-cloud" />
                        )}
                        <input id="file-upload" type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
                    </div>
                </label>
                <button type="submit" className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:scale-105 hover:bg-blue-800">
                    Update Profile Picture
                </button>
            </form>
        </>
    );
};

export default UpdateProfilePicture;
