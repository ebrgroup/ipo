export const updateProfile = (userData) => ({
    type: "UPDATE_PROFILE",
    payload: userData
});

export const loginSuccess = (userData) => ({
    type: "LOGIN_SUCCESS",
    payload: userData
});

export const logout = () => ({
    type: "LOGOUT"
});



