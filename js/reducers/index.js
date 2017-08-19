import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import drawer from "./drawer";
import user from "./user";

import leagues from "./leagues";
import seasons from "./seasons";


export default combineReducers({
	form: formReducer,
	drawer,
	user,
	leagues,
	seasons
});
