import type {Action} from '../actions/types';
import {SET_DATE} from '../actions/selecteddate';

let rangeMonths = 1;
let today = new Date();
let dateFrom = new Date();
let dateTo = new Date(today.getFullYear(), today.getMonth() + rangeMonths, today.getDate());

export type State = {
	sdate: object,
	sdatefrom: object,
	sdateto: object
}

const initialState = {
	sdate: today,
	sdatefrom: dateFrom,
	sdateto: dateTo
};

export default function (state: State = initialState, action: Action): State
{
	switch (action.type)
	{
		/**
		 * set index of the leagues
		 */
		case SET_DATE:
			let dd = action.payload;
			return {
				...state,
				sdate: dd,
				sdatefrom: dd,
				sdateto: new Date(dd.getFullYear(), dd.getMonth() + rangeMonths, dd.getDate())
			};
			break;
		/**
		 * default do nothing
		 */
		default:
			return state;
	}
}
