import type {Action} from "../actions/types";
import {SET_INDEX} from "../actions/list";

export type State = {
	list: string
};

const initialState = {
	list: [
		"Signup",
		"Home",
		"Standings",
		"Playoffs",
		"Power Rankings",
		"Favourites",
		"Leagues News",
		"Team News",
		"GPS Nav",
	],
	selectedIndex: undefined
};

export default function(state: State = initialState, action: Action): State
{
	if (action.type === SET_INDEX) {
		return {
			...state,
			selectedIndex: action.payload
		};
	}
	return state;
}
