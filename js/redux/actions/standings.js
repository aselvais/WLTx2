import type {Action} from './types';
import Apiaccess from '../../libs/Apiaccess';

let api = new Apiaccess();

export const SET_STANDING_INDEX = 'SET_STANDING_INDEX';
export const RESET_STANDINGS = 'RESET_STANDINGS';
export const LOAD_STANDINGS = 'LOAD_STANDINGS';

/**
 *
 * @param index
 */
export function setStandingIndex(index: number): Action
{
	return {
		type: SET_STANDING_INDEX,
		payload: index
	};
};

/**
 *
 * @param index
 */
export function resetStandings(): Action
{
	return {
		type: RESET_STANDINGS
	};
};

/**
 *
 * @returns {{type: string, payload: string}}
 */
export function getStandings(divisionids: number): Action
{
	function _returnLoadStandings(d) { return { type: LOAD_STANDINGS, list: d }; }
	return dispatch => api.getTeamStandingLocalTierGroup(divisionids).then(
		(d) => dispatch(_returnLoadStandings(d)),
		(e) => dispatch(_returnLoadStandings([]))
	);
};

