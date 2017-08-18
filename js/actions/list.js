import type {Action} from './types';
import Apiaccess from '../libs/Apiaccess';

/**
 *
 * @type {string}
 */
export const SET_INDEX = 'SET_INDEX';
export const LOAD_LIST = 'LOAD_LIST';

/**
 *
 * @param index
 */
export function setIndex(index: number): Action
{
	return {
		type: SET_INDEX,
		payload: index,
	};
}


function returnAction(d) {
	return {
		type: LOAD_LIST,
		list: d
	};
}


/**
 *
 * @returns {{type: string, payload: string}}
 */
export function loadList(): Action
{
	return dispatch => {
		var api = new Apiaccess();
		api.getLeague().then(
			function(d)
			{
				console.log('-------------- OK api ---------------', d);
				dispatch(returnAction(d));
			},
			function(e)
			{
				console.warn('-------------- KO api ---------------', e);
				dispatch(returnAction([]));
			},
		);
		/* */


	};
}
