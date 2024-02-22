import axios from 'axios';
import { updateProfile } from '../actions/user-action';
import { loadingBar } from '../actions/Loading-Action';

export const updateUser = (id, user) =>
    async (dispatch) => {
        dispatch(loadingBar(40))
        const response = await axios.put(`http://localhost:5000/ipo/users/${id}`, user);
        dispatch(loadingBar(70))
        dispatch(updateProfile(response.data.userData));
        dispatch(loadingBar(100))
    };

