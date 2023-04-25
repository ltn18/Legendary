import { Navigate } from "react-router-dom";

const AuthRoute = (props) => {
    const {authenticated, children} = props;
    
    if (!authenticated) {
        return <Navigate to="/login" replace />
    }

    return children;
}

export default AuthRoute;