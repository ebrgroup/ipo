const initialState = {
    val: false
}
const toggleReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE-SIDEBAR':
            return { ...state, val: action.payload };
        default:
            return state;
    }
}

export default toggleReducer