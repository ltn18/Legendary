import { Navigate, useLocation } from "react-router-dom";

// fix this to block access to login and signup page
const LandingRoute = (props) => {
    const location = useLocation();
    console.log("location:", location.pathname);

    if (location.pathname === "login" || location.pathname === "signup") {
        <Navigate to="/home" replace />
    }
    else return <Navigate to="/home" replace />;
}

export default LandingRoute;