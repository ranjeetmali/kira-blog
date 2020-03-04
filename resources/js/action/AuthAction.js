export const authSuccess = (user) => {
    return {type: 'AUTH_SUCCESS', payload: user}
    //return {type: "AUTH_SUCCESS"}
};

export const authFailed = () => {
    return {type: "AUTH_FAILED"}
};
