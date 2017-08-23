import type {Action} from "../actions/types";
import {
	LOAD_GAMES,
	SET_GAMES_INDEX
} from "../actions/games";

/**
 *
 */
export type State = {
	games: object
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
		case SET_GAMES_INDEX:
			return {
				...state,
				selectedIndex: action.payload
			};
			break;
		/**
		 * load the teams from API
		 */
		case LOAD_GAMES:
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
