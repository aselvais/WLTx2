import type {Action} from '../actions/types';
import {SET_DATE} from '../actions/selecteddate';

let date = new Date();

export type State = {
	sdate: object
}

const initialState = {
	sdate: date,
};

export default function(state: State = initialState, action: Action): State
{
	if (action.type === SET_DATE) {
		return {
			...state,
			sdate: action.payload,
		};
	}
	return state;
}
