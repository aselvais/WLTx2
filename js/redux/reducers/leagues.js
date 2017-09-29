import type {Action} from "../actions/types";
import {
	SET_LEAGUE_INDEX,
	RESET_LEAGUES,
	LOAD_LEAGUES
} from "../actions/leagues";

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
	list: [],
	selectedIndex: null
};
/**
 *
 * @param state
 * @param action
 * @returns {*}
 */
export default function(state: State = initialState, action: Action): State
{
	switch (action.type)
	{
		/**
		 * set index of the leagues
		 */
		case SET_LEAGUE_INDEX:
			return {
				...state,
				selectedIndex: action.payload
			};
			break;
		/**
		 * set index of the leagues
		 */
		case RESET_LEAGUES:
			return {
				...state,
				list: initialState.list,
				selectedIndex: initialState.list
			};
			break;
		/**
		 * load the leagues from API
		 */
		case LOAD_LEAGUES:
			return {
				...state,
				list: action.list
			};
			break;
		/**
		 * default do nothing
		 */
		default:
			return state;
	}
	return state;
}
