import type {Action} from "../actions/types";
import {SET_INDEX, LOAD_LEAGUES} from "../actions/leagues";

/**
 *
 */
export type State = {
	leagues: object
};

/**
 *
 * @type {{list: [null], selectedIndex: undefined}}
 */
const initialState = {
	leagues: [],
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
	switch(action.type)
	{
		// set index of the leagues
		case SET_INDEX:
			return {
				...state,
				selectedIndex: action.payload
			};
			break;
		// load the leagues from API
		case LOAD_LEAGUES:
			return {
				...state,
				leagues: action.leagues
			};
			break;
		// default do nothing
		default:
			return state;
	}
	return state;
}
