import React, { useState } from "react";
import '../styles/LoginSignup.css';
import SignUp from "../components/LoginSignup/signUp";
import SignIn from "../components/LoginSignup/signIn";

export const LoginSignup = () => {

   const [isSignUp, setIsSignUp] = useState(true); // State to toggle between sign up and sign in

   return (
      <div className="flex h-screen">
         {/* Left Side Image */}
         <div className="w-1/2 hidden lg:block bg-gray-300">
            {/* Placeholder for Image */}
            <img src="https://via.placeholder.com/600" alt="Placeholder" className="object-cover h-full" />
         </div>
         {/* Right Side Form */}
         <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
            {isSignUp ? (
               <SignUp toggleForm={() => setIsSignUp(false)} />
            ) : (
               <SignIn toggleForm={() => setIsSignUp(true)} />
            )}
         </div>
      </div>
   );
}

export default LoginSignup;