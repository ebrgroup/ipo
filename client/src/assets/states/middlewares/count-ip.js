import axios from 'axios';
import { registerdTrademark, appliedTrademark } from '../actions/Count IP actions/countTrademark_action';
import { loadingBar } from '../actions/Loading-Action';

export const countTrademark = (id) =>
    async (dispatch) => {
        dispatch(loadingBar(40))
        const response = await axios.get(`http://localhost:5000/ipo/dashboard/user/countIp/${id}`);
        console.log(response);
        dispatch(loadingBar(80))
        const { registerd, applied } = response.data;
        dispatch(loadingBar(90))
        dispatch(registerdTrademark(registerd));
        dispatch(appliedTrademark(applied));
        dispatch(loadingBar(100))
    };

