import { Navigate } from "react-router-dom";

const PermissionRoute = (props) => {
    const {isShopOwner} = props;
    
    return <Navigate to={isShopOwner === true? "/shopowner" : "/customer"} />
}

export default PermissionRoute;