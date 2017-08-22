import type {Action} from "../actions/types";
import {
	LOAD_TEAMS,
	SET_TEAMS_INDEX
} from "../actions/teams";

/**
 *
 */
export type State = {
	teams: object
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
		case SET_TEAMS_INDEX:
			return {
				...state,
				selectedIndex: action.payload
			};
			break;
		/**
		 * load the teams from API
		 */
		case LOAD_TEAMS:
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
