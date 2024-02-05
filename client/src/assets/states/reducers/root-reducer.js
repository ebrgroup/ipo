import userReducer from "./user-reducer";
import loadingReducer from "./loading-reducer";

import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    userReducer,
    loadingReducer
})

export default rootReducer;