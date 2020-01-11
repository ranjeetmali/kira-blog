const AuthReducer = (authData = false, action) => {
    switch (action.type) {
        case "AUTH_SUCCESS":
            return true;
        case "AUTH_FAILED":
            return false;
        default:
            return authData;
    }
};
export default AuthReducer;