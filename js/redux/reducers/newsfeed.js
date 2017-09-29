import type {Action} from "../actions/types";
import {
	SET_NEWSFEED_INDEX,
	RESET_NEWSFEEDS,
	LOAD_NEWSFEEDS
} from "../actions/newsfeed";

/**
 *
 */
export type State = {
	newsfeeds: object
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
		 * set index of the newsfeeds
		 */
		case SET_NEWSFEED_INDEX:
			return {
				...state,
				selectedIndex: action.payload
			};
			break;
		/**
		 * set index of the newsfeeds
		 */
		case RESET_NEWSFEEDS:
			return {
				...state,
				list: [],
				selectedIndex: null
			};
			break;
		/**
		 * load the newsfeeds from API
		 */
		case LOAD_NEWSFEEDS:
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
