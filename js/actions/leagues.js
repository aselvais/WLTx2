import type {Action} from './types';
import Apiaccess from '../libs/Apiaccess';

let api = new Apiaccess();

export const SET_INDEX = 'SET_INDEX';
export const LOAD_LEAGUES = 'LOAD_LEAGUES';

/**
 *
 * @param d
 * @returns {{type: string, leagues: *}}
 * @private
 */
function _returnLoadLeagues(d)
{
	return {
		type: LOAD_LEAGUES,
		leagues: d
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
		payload: index
	};
};

/**
 *
 * @returns {{type: string, payload: string}}
 */
export function getLeagues(): Action
{
	return dispatch =>
	{
		api.getLeague().then(
			(d) => dispatch(_returnLoadLeagues(d)),
			(e) => dispatch(_returnLoadLeagues([]))
		);
	};
};

