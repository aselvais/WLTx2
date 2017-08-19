import type {Action} from "../actions/types";
import {
	LOAD_SEASONS
} from "../actions/seasons";

/**
 *
 */
export type State = {
	seasons: object
};

/**
 *
 * @type {{list: [null], selectedIndex: undefined}}
 */
const initialState = {
	list: []
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
		/**
		 * load the seasons from API
		 */
		case LOAD_SEASONS:
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
