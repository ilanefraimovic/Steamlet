import React, { useState } from "react";
import SignUp from "../components/LoginSignup/signUp";
import SignIn from "../components/LoginSignup/signIn";

import sign_user from "../resources/Assets/Another_background.jpg";

export const LoginSignup = () => {
   const [isSignUp, setIsSignUp] = useState(true); // State to toggle between sign up and sign in

   return (
      <div className="flex h-screen" style={{ backgroundColor: '#bfaf9c' }}> {/* Change the color here */}
         {/* Image Container */}
         <div
            className="relative w-1/2 transition-transform duration-500"
            style={{
               transform: isSignUp ? "translateX(0)" : "translateX(100%)",
            }}
         >
            <img src={sign_user} alt="Placeholder" className="object-cover h-full w-full" />
         </div>

         {/* Form Container */}
         <div
            className="w-full lg:w-1/2 flex items-center justify-center p-4 transition-transform duration-500"
            style={{
               transform: isSignUp ? "translateX(0)" : "translateX(-100%)",
            }}
         >
            {isSignUp ? (
               <SignUp toggleForm={() => setIsSignUp(false)} />
            ) : (
               <SignIn toggleForm={() => setIsSignUp(true)} />
            )}
         </div>
      </div>
   );
};

export default LoginSignup;
