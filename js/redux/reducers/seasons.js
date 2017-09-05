import type {Action} from "../actions/types";
import {
	LOAD_SEASONS,
	RESET_SEASONS,
	SET_SEASONS_INDEX
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
	list: [{
		id: 196,
		name: "Friendship Tournament",
		playOff: false,
		visible: true,
		bracketsVisibleInSeason: true
	}],
	selectedIndex: {
		id: 196,
		name: "Friendship Tournament",
		playOff: false,
		visible: true,
		bracketsVisibleInSeason: true
	}
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
		case SET_SEASONS_INDEX:
			return {
				...state,
				selectedIndex: action.payload
			};
			break;
		case RESET_SEASONS:
			return {
				...state,
				list: initialState.list,
				selectedIndex: initialState.selectedIndex
			};
			break;
		/**
		 * load the seasons from API
		 */
		case LOAD_SEASONS:
			return {
				...state,
				list: initialState.list
				// list: action.list
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
