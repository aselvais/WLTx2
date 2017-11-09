import type {Action} from '../actions/types';
import {SET_LOADING} from '../actions/loading';

export type State = {
	services: object,
	globalstatus: boolean
}

const initialState = {
	services: {},
	globalstatus: false
};

/* ------------------------------------------------------------------------------------------------------------------ */


/* ------------------------------------------------------------------------------------------------------------------ */

export default function(state: State = initialState, action: Action): State
{
	switch (action.type)
	{
		/**
		 * set index of the leagues
		 */
		case SET_LOADING:
			let globalstatus = false;
			state.services[action.name] = action.status;

			for (var k in state.services)
			{
				if (state.services[k] === true)
				{
					globalstatus = true;
					break;
				}
			}
			return {
				...state,
				globalstatus: globalstatus
			};
			break;
		/**
		 * default do nothing
		 */
		default:
			return state;
	}
}
