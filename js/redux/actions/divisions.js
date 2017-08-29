import type {Action} from './types';
import Apiaccess from '../../libs/Apiaccess';

let api = new Apiaccess();

export const SET_DIVISIONS_INDEX = 'SET_DIVISIONS_INDEX';
export const RESET_DIVISIONS = 'RESET_DIVISIONS';
export const LOAD_DIVISIONS = 'LOAD_DIVISIONS';

/**
 *
 * @param index
 */
export function setDivisionIndex(index: number): Action
{
	return {
		type: SET_DIVISIONS_INDEX,
		payload: index
	};
};
/**
 *
 * @param index
 */
export function resetDivisions(): Action
{
	return {
		type: RESET_DIVISIONS
	};
};

/**
 *
 * @param leagueId
 * @returns {function(*): (Promise.<TResult>|Promise<T>)}
 */
export function getDivisions(seasonid: number): Action
{
	function _returnLoadDivisions(d) { return { type: LOAD_DIVISIONS, list: d }; }
	return dispatch => api.getDivision(seasonid).then(
		(d) => dispatch(_returnLoadDivisions(d)),
		(e) => dispatch(_returnLoadDivisions([]))
	);
};

