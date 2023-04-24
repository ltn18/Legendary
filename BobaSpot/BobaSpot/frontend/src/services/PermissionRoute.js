import UserProfile from '../contents/profile/user/customer/UserProfile';
import ShopOwnerProfile from '../contents/profile/user/shopowner/ShopOwnerProfile'; 

const PermissionRoute = (props) => {
    const {isShopOwner} = props;
    
    if (!isShopOwner) return <UserProfile />;
    else return <ShopOwnerProfile />;
}

export default PermissionRoute;