import renderer from 'react-test-renderer';
import UserProfile from "../../contents/profile/user/customer/UserProfile";

import axios from 'axios'

it('shows a user info panel and a user comments panel', () => {
    const component = renderer.create(
        <UserProfile />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
}) 
