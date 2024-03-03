const initialState = {
    register:0,
    applied:0
}

const countTrademark = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTERED_TRADEMARK':
            return { ...state,  register: action.payload };
        case "APPLIED_TRADEMARK":
            return { ...state,  applied: action.payload };
        case "RESET_COUNT":
            return initialState;
        default:
            return state;
    }
}

export default countTrademark;