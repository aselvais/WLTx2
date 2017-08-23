import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import drawer from "./drawer";
import user from "./user";

import leagues from "./leagues";
import seasons from "./seasons";
import divisions from "./divisions";
import teams from "./teams";
import games from "./games";


export default combineReducers({
	form: formReducer,
	drawer,
	user,
	leagues,
	seasons,
	divisions,
	teams,
	games
});
