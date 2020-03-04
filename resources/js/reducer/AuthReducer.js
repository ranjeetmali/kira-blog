const AuthReducer = (authData = null, action) => {
    switch (action.type) {
        case "AUTH_SUCCESS":
            return {...action.payload};
        //return true;
        case "AUTH_FAILED":
            return false;
        default:
            return authData;
    }
};
export default AuthReducer;
