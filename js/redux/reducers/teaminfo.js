import type {Action} from "../actions/types";
import {LOAD_TEAMINFOS, RESET_TEAMINFOS, SET_TEAMINFO_INDEX} from "../actions/teaminfo";

/**
 *
 */
export type State = {
	teaminfos: object
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
export default function (state: State = initialState, action: Action): State
{
	switch (action.type)
	{
		/**
		 * set index of the teaminfos
		 */
		case SET_TEAMINFO_INDEX:
			return {
				...state,
				selectedIndex: action.payload
			};
			break;
		/**
		 * set index of the teaminfos
		 */
		case RESET_TEAMINFOS:
			return {
				...state,
				list: [],
				selectedIndex: null
			};
			break;
		/**
		 * load the teaminfos from API
		 */
		case LOAD_TEAMINFOS:
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
