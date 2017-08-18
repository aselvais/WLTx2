import type {Action} from './types';
import Apiaccess from '../libs/Apiaccess';

let api = new Apiaccess();

export const SET_INDEX = 'SET_INDEX';
export const LOAD_LIST = 'LOAD_LIST';

/**
 *
 * @param d
 * @returns {{type: string, list: *}}
 * @private
 */
function _returnLoadList(d)
{
	return {
		type: LOAD_LIST,
		list: d
	};
}

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
/**
 *
 * @returns {{type: string, payload: string}}
 */
export function getLeagues(): Action
{
	return dispatch =>
	{
		api.getLeague().then(
			(d) => dispatch(_returnLoadList(d)),
			(e) => dispatch(_returnLoadList([]))
		);

	};
}
