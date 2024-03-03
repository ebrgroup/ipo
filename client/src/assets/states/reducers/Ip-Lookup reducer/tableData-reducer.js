const initialState = {
    registeredIp: {},
    userIp: {}
};

const IpLookup = (state = initialState, action) => {
    switch (action.type) {
        case "SEARCH-IP":
            return { ...state, registeredIp: action.payload };
        case 'TRACK-IP':
            return { ...state, userIp: action.payload };
        case 'RESET-STATES':
            return initialState;

        default:
            return state;
    }
};

export default IpLookup;