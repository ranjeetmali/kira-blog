import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => {
    return <Route
        {...rest}
        render={props => {
            if (isAuthenticated) {
                return <Component {...props}/>;
            } else {
                return <Redirect to={"/login"}/>;
            }
        }}
    />
};

export default connect((state) => ({isAuthenticated: state.AuthReducer}), null)(PrivateRoute);