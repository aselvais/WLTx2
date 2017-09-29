import type {Action} from "../actions/types";
import {
	LOAD_TEAMS, RESET_TEAMS,
	SET_TEAMS_INDEX,
	SET_TEAMS_INDEX_BY_ID
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
		 * Sets the selected team
		 */
		case SET_TEAMS_INDEX:
			return {
				...state,
				selectedIndex: action.payload
			};
			break;
		/**
		 * Sets the selected team by ID
		 */
		case SET_TEAMS_INDEX_BY_ID:
			var relem = {};
			state.list.map((e) =>
			{
				if (e.id === action.payload)
				{
					console.log(e.id, action.payload);
					relem = e;
					return;
				}
			});
			return {
				...state,
				selectedIndex: relem
			};
			break;
		/**
		 * load the teams from API
		 */
		case RESET_TEAMS:
			return {
				...state,
				list: [],
				selectedIndex: null
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
