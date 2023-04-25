import { Navigate } from "react-router-dom"

const PermissionRoute = (props) => {
    const { isShopOwner, authenticated } = props;

    if (!authenticated) {
        return <Navigate to="/login" replace />
    }

    return isShopOwner === true
        ? <Navigate to="/shopowner" replace />
        : <Navigate to="/customer" replace />;
}

export default PermissionRoute;