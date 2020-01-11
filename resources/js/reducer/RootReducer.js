import {combineReducers} from "redux";
import CategoryReducer from "./CategoryReducer";
import PostReducer from "./PostReducer";
import AuthReducer from "./AuthReducer";

export default combineReducers({CategoryReducer, PostReducer, AuthReducer});