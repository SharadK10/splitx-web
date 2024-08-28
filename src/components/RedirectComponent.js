import { useEffect  } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
export function RedirectComponent() {

    const {login} = useAuth();

    const location = useLocation();

    useEffect(() => {
        console.log("loggedIn");
        login();
    }, []);


    return (
        <div>
        Loading....
        </div>
    );
}