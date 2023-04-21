import { Navigate } from "react-router-dom";

const LandingRoute = (props) => {
    const {authenticated} = props;
    if (!authenticated) {
        return <Navigate to="/login" replace />
    }
    return <Navigate to="/" replace />;
}

export default LandingRoute;