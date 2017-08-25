import type {Action} from "../actions/types";
import {
	SET_TIER_INDEX,
	RESET_TIERS,
	LOAD_TIERS
} from "../actions/tiers";

/**
 *
 */
export type State = {
	tiers: object
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
	switch(action.type)
	{
		/**
		 * set index of the tiers
		 */
		case SET_TIER_INDEX:
			return {
				...state,
				selectedIndex: action.payload
			};
			break;
		/**
		 * set index of the tiers
		 */
		case RESET_TIERS:
			return {
				...state,
				list: [],
				selectedIndex: null
			};
			break;
		/**
		 * load the tiers from API
		 */
		case LOAD_TIERS:
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
