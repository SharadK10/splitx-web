import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { logout } from "./Api";
import { useAuth } from "./AuthContext";
import { Popover } from 'flowbite';

export default function Header() {
  const location = useLocation();
  const [authStatus, setAuthStatus] = useState(false);
  const {user,isAuthenticated} = useAuth();

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
    setAuthStatus(isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    const initializePopover = () => {
      const $targetElpopover = document.getElementById("popover-user-profile");
      const $triggerElpopover = document.getElementById("popoverButton");

      if ($targetElpopover && $triggerElpopover) {
        const optionspopover = {
          placement: 'bottom',
          triggerType: 'hover',
          offset: 10,
          // onHide: () => ,
          // onShow: () => ,
          // onToggle: () => ,
        };

        const instanceOptionspopover = {
          id: 'popoverContent',
          override: true
        };

        // Initialize the popover
        const popover = new Popover($targetElpopover, $triggerElpopover, optionspopover, instanceOptionspopover);

        // Clean up function
        return () => {
          // If no destroy method, hide or toggle the popover if necessary
          if (popover.isVisible()) {
            popover.hide();
          }
          // If necessary, handle additional cleanup here
        };
      }
    };

    const timer = setTimeout(initializePopover, 500); // Delay of 100ms
    return () => clearTimeout(timer);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full max-w-screen-md mx-auto">
      <div className="flex items-center justify-between p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="../splitin-logo.svg" className="h-8" alt="SplitX Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SplitIn</span>
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
        
        {authStatus && user && (
          <>
            <button
              id="popoverButton"
              type="button"
              className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                  <a href="#">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user.photo}
                      alt="User Profile"
                    />
                  </a>
            </button>

            <div
              id = "popover-user-profile"
              role="tooltip"
              className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600"
            >
              <div className="p-3">
                <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                  <a href="#">{user.name}</a>
                </p>
                <p className="mb-3 text-sm font-normal">
                  <a href="#" className="hover:underline">{user.email}</a>
                </p>
                <button
                  onClick={handleClick}
                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Logout
                </button>
              </div>
              <div data-popper-arrow></div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
