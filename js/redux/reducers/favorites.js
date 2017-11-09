import type {Action} from "../actions/types";
import {
	DELETE_USER_TEAMS,
	GET_USER_DIVISION,
	GET_USER_GAMES,
	GET_USER_TEAMS,
	POST_USER_TEAMS,
	RESET_FAVORITES
} from "../actions/favorites";

/**
 *
 */
export type State = {
	favorites: object
};

/**
 *
 * @type {{list: [null], selectedIndex: undefined}}
 */
const initialState = {
	games: [],
	divisions: [],
	teams: [],
	postteams: [],
	deleteteams: [],
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
		case RESET_FAVORITES:
			return {
				...state,
			};
			break;
		case GET_USER_GAMES:
			return {
				...state,
				games: action.games
			};
			break;
		case GET_USER_DIVISION:
			return {
				...state,
				divisions: action.divisions
			};
			break;
		case GET_USER_TEAMS:
			return {
				...state,
				teams: action.teams
			};
			break;
		case POST_USER_TEAMS:
			return {
				...state,
				postteams: action.postteams
			};
			break;
		case DELETE_USER_TEAMS:
			return {
				...state,
				deleteteams: action.deleteteams
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
