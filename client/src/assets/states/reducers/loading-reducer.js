const initialState = {
    progress: 0
}

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, progress: action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

export default loadingReducer;