import type {Action} from "../actions/types";
import {SET_INDEX, LOAD_LIST} from "../actions/list";

/**
 *
 */
export type State = {
	list: object
};

/**
 [
 "Signup",
 "Home",
 "Standings",
 "Playoffs",
 "Power Rankings",
 "Favourites",
 "Leagues News",
 "Team News",
 "GPS Nav",
 ]
 *
 * @type {{list: [null], selectedIndex: undefined}}
 */
const initialState = {
	list: [],
	selectedIndex: undefined
};
/**
 *
 * @param state
 * @param action
 * @returns {*}
 */
export default function(state: State = initialState, action: Action): State
{

	if (action.type === SET_INDEX) {
		return {
			...state,
			selectedIndex: action.payload
		};
	}

	if (action.type === LOAD_LIST) {
		return {
			...state,
			list: action.list
		};
	}


	return state;
}
