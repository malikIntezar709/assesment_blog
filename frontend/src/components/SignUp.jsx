import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signUpAction } from '../redux/features/auth/auth.slice';
import { useDispatch } from 'react-redux';
import { TOASTER_STYLING_VALUES } from '../utils/config';
import { ToastContainer, toast } from 'react-toastify';


function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const notifyToaster=(data, condition) => {
        if (condition === "success") {
          
          toast.success(data, TOASTER_STYLING_VALUES);
        } else {
          toast.error(data, TOASTER_STYLING_VALUES);
        }
    }

    const moveToNext=() =>{
        setTimeout(() => {
            navigate('/')
        },1500)
    }

    function onSubmit(formData) {
        dispatch(signUpAction({formData, moveToNext, notifyToaster}))
    }

    

    return (
        <>
            <ToastContainer />
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg flex max-w-4xl">
                    {/* Left side with logo */}
                    <div className="w-1/2 flex items-center justify-center p-8">
                        <img
                            src="https://softmindsol.com/wp-content/uploads/2023/05/Logo-2048x624.png"
                        alt="Logo"
                        className="h-50 w-50 object-contain"
                        />
                    </div>

                    {/* Right side with form */}
                    <div className="w-1/2 p-8">
                        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            {/* Username field */}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    {...register("username", { required: true })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter your username"
                                />
                                {errors?.username && (
                                    <p className="text-[#d32f2f] mt-1">
                                        User name is required
                                    </p>
                                )}
                            </div>

                            {/* Password field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    {...register("password", { required: true })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter your password"
                                />
                                {errors?.password && (
                                    <p className="text-[#d32f2f] mt-1">
                                        Password is required
                                    </p>
                                )}
                            </div>

                            {/* Role dropdown */}
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                Role
                                </label>
                                <select
                                    id="role"
                                    {...register("role", { required: true })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select A Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                                {errors?.role && (
                                    <p className="text-[#d32f2f] mt-1">
                                        Role is required
                                    </p>
                                )}

                            </div>

                            {/* Submit button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full btn-color text-white py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign Up
                                </button>
                            </div>
                            <div>
                                <span className=''>Already have an account?</span>
                                <Link to='/' className="hover-menu ml-2">Login here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>        
    );
}

export default SignUp;
