import type {Action} from "../actions/types";
import {LOAD_DIVISIONS, RESET_DIVISIONS, SET_DIVISIONS_INDEX} from "../actions/divisions";

/**
 *
 */
export type State = {
	divisions: object
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
		case SET_DIVISIONS_INDEX:
			return {
				...state,
				selectedIndex: action.payload
			};
			break;
		case RESET_DIVISIONS:
			return {
				...state,
				list: [],
				selectedIndex: null
			};
			break;
		/**
		 * load the divisions from API
		 */
		case LOAD_DIVISIONS:
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
