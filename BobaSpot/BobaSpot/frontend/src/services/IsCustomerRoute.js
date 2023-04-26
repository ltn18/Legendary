import { Navigate } from "react-router-dom"

const IsCustomerRoute = (props) => {
    const { authenticated, isCustomer, children } = props;

    if (!authenticated) {
        return <Navigate to="/login" replace />
    }
    else {
        if (isCustomer === false) {
            return <Navigate to="/shopowner" replace />
        }

        return children;
    }
}

export default IsCustomerRoute;