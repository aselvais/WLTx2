import type {Action} from "../actions/types";
import {LOAD_TWITTERFEEDS, RESET_TWITTERFEEDS, SET_TWITTERFEED_INDEX} from "../actions/twitterfeed";

/**
 *
 */
export type State = {
	twitterfeeds: object
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
		 * set index of the twitterfeeds
		 */
		case SET_TWITTERFEED_INDEX:
			return {
				...state,
				selectedIndex: action.payload
			};
			break;
		/**
		 * set index of the twitterfeeds
		 */
		case RESET_TWITTERFEEDS:
			return {
				...state,
				list: [],
				selectedIndex: null
			};
			break;
		/**
		 * load the twitterfeeds from API
		 */
		case LOAD_TWITTERFEEDS:
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
