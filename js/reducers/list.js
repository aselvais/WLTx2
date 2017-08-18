import type {Action} from "../actions/types";
import {SET_INDEX, LOAD_LIST} from "../actions/list";

/**
 *
 */
export type State = {
	list: object
};

/**
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
	switch(action.type)
	{
		// set index of the list
		case SET_INDEX:
			return {
				...state,
				selectedIndex: action.payload
			};
			break;
		// load the list from API
		case LOAD_LIST:
			return {
				...state,
				list: action.list
			};
			break;
		// default do nothing
		default:
			return state;
	}
	return state;
}
