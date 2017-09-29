import type {Action} from "../actions/types";
import {
	LOAD_GAMES,
	LOAD_GAMES_DAY,
	RESET_GAMES,
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
	selectedIndex: null,
	list: [],
	listday: []
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
		case SET_GAMES_INDEX:
			return {
				...state,
				selectedIndex: action.payload
			};
			break;
		case RESET_GAMES:
			return {
				...state,
				selectedIndex: null,
				list: [],
				listday: []
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
		 * load the teams from API
		 */
		case LOAD_GAMES_DAY:
			return {
				...state,
				listday: action.listday
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
