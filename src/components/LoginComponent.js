import { useEffect, useState  } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Footer from "./Footer";

export default function LoginComponent() {
    const {logout} = useAuth();
    async function handleLogin() {
        
        
        window.location.href = process.env.REACT_APP_BASE_URL + "/oauth2/authorization/google";
    }

    const location = useLocation();

    useEffect(() => {
        if(location.search === '?logout') {
            logout();
        }
    }, [location]);

    
    return (
        <>
  <div class="w-full max-w-lg flex flex-col items-center justify-center px-6 py-8 mx-auto h-[80vh]">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="flex flex-row items-center justify-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <button class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center text-sm" onClick={handleLogin}>
                <img class="w-6 mr-3" src="./google.png" alt=""/>                
                Login with Google
            </button>      
          </div>
      </div>
  </div>
  <Footer/>
  </>
    )
}