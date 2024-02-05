const initialState = {
    progress: 10
}

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, progress: action.payload };
        default:
            return state;
    }
}

export default loadingReducer;