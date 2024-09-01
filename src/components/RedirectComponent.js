import { useEffect  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";



export function RedirectComponent() {
    const navigate = useNavigate();
    const {login} = useAuth();

    const location = useLocation();

    useEffect(() => {
        login();
        const redirectAfterLogin = localStorage.getItem('redirectAfterLogin') || '/groups';
        localStorage.removeItem('redirectAfterLogin'); // Clear the stored URL
        navigate(redirectAfterLogin, { replace: true });
    }, []);


    return (
        <div>
        Loading....
        </div>
    );
}