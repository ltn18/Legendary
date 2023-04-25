import { Navigate } from "react-router-dom";

const IsOwnerRoute = (props) => {
    const { isShopOwner, children } = props;
    
    if (!isShopOwner) {
        return <Navigate to="/customer" replace />
    }

    return children;
}

export default IsOwnerRoute;