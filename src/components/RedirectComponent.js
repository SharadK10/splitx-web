import { useEffect  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";



export function RedirectComponent() {
    const navigate = useNavigate();
    const {login} = useAuth();

    const location = useLocation();

    useEffect(() => {
        login()
    .then(() => {
        console.log('User logged in successfully');
        const redirectAfterLogin = localStorage.getItem('redirectAfterLogin') || '/groups';
        localStorage.removeItem('redirectAfterLogin'); // Clear the stored URL
        navigate(redirectAfterLogin, { replace: true });
    })
    .catch((error) => {
        console.error('Error logging in:', error);
        // Handle the error (show error message, etc.)
    });
    
    }, []);


    return (
        <div>
        Loading....
        </div>
    );
}