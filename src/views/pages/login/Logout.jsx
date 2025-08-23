import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Remove token from localStorage
        localStorage.removeItem("token");

        // 2. Redirect to login
        navigate("/login");
    }, [navigate]);

    return <p>Logging out...</p>;
};

export default Logout;
