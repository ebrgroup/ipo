const initialState = {
    isLoggedIn: false,
    userData: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, isLoggedIn: true, userData: action.payload };
        case "UPDATE_PROFILE":
            return { ...state, isLoggedIn: true, userData: action.payload };
        case 'LOGOUT':
            return { ...state, isLoggedIn: false, userData: {} };

        default:
            return state;
    }
};

export default userReducer;