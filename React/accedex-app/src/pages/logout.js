import { logout } from "../firebase";
import { useNavigate } from "react-router-dom";

function LogOut() {
    const navigate = useNavigate();

    logout();
    navigate('/login');
}

export default LogOut;