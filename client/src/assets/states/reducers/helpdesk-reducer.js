const initialState = {
    content: {}
}

const helpdeskContentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTERIP-HELP':
            return { ...state, content: action.payload };
        case 'REGISTERTRADEMARK-HELP':
            return { ...state, content: action.payload };
        case 'REGISTERPATENT-HELP':
            return { ...state, content: action.payload };
        case 'REGISTERDESIGN-HELP':
            return { ...state, content: action.payload };
        case 'REGISTERCOPYRIGHT-HELP':
            return { ...state, content: action.payload };
        default:
            return state;
    }
}

export default helpdeskContentReducer;