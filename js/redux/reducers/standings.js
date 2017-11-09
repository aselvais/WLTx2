import type {Action} from "../actions/types";
import {LOAD_STANDINGS, RESET_STANDINGS, SET_STANDING_INDEX} from "../actions/standings";

/**
 *
 */
export type State = {
	standings: object
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
		 * set index of the standings
		 */
		case SET_STANDING_INDEX:
			return {
				...state,
				selectedIndex: action.payload
			};
			break;
		/**
		 * set index of the standings
		 */
		case RESET_STANDINGS:
			return {
				...state,
				list: [],
				selectedIndex: null
			};
			break;
		/**
		 * load the standings from API
		 */
		case LOAD_STANDINGS:
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
