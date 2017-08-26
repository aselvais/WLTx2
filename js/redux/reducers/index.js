import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import drawer from "./drawer";
import user from "./user";

import leagues from "./leagues";
import seasons from "./seasons";
import divisions from "./divisions";
import teams from "./teams";
import games from "./games";
import tiers from "./tiers";
import newsfeeds from "./newsfeed";
import twitterfeeds from "./twitterfeed";
import teaminfo from "./teaminfo";
import standings from "./standings";


export default combineReducers({
	form: formReducer,
	drawer,
	user,
	leagues,
	seasons,
	divisions,
	teams,
	games,
	tiers,
	newsfeeds,
	twitterfeeds,
	teaminfo,
	standings
});
