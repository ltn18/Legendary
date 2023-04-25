import { Navigate } from "react-router-dom"

const IsShopOwnerRoute = (props) => {
    const { authenticated, isShopOwner, children } = props;

    console.log("IsShopOwnerRoute:", isShopOwner);

    if (!authenticated) {
        return <Navigate to="/login" replace />
    }
    else {
        if (isShopOwner === false) {
            return <Navigate to="/customer" replace />
        }

        return children;
    }
}

export default IsShopOwnerRoute;