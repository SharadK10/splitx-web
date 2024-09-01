import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { logout } from "./Api";
import { useAuth } from "./AuthContext";

export default function Header() {
  const authContext = useAuth();
  const location = useLocation();
  const [authStatus, setAuthStatus] = useState(false);

  async function handleClick() {
    try {
      const response = await logout();
      if (response.status === 200) {
        window.location.href = '/login?logout';
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while logging out. Please try again.");
    }
  }

  useEffect(() => {
    setAuthStatus(authContext.isAuthenticated);
  }, [authContext.isAuthenticated]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full max-w-screen-md mx-auto">
      <div className="flex items-center justify-between p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="../splitx-logo2.svg" className="h-8" alt="SplitX Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SplitX</span>
        </a>
        
        <div className="flex-1 flex justify-center">
          <ul className="flex space-x-4">
            <li>
              <a
                href="/"
                className={`block py-2 px-3 rounded md:p-0 ${
                  isActive('/') 
                    ? 'text-blue-700' 
                    : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }`}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/groups"
                className={`block py-2 px-3 rounded md:p-0 ${
                  isActive('/groups') 
                    ? 'text-blue-700' 
                    : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }`}
                aria-current={isActive('/groups') ? 'page' : undefined}
              >
                Groups
              </a>
            </li>
          </ul>
        </div>
        {authStatus &&
        <button
          onClick={handleClick}
          className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2"
        >
          Logout
        </button>}
      </div>
    </nav>
  );
}
