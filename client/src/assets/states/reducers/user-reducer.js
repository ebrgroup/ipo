const initialState = {
    isLoggedIn: false,
    userData: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, isLoggedIn: true, userData: action.payload };
        case "UPDATE_PROFILE":
            return { ...state, userData: action.payload };

        case 'LOGOUT':
            return initialState;

        default:
            return state;
    }
};

export default userReducer;