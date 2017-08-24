import type {Action} from './types';
import Apiaccess from '../libs/Apiaccess';

let api = new Apiaccess();

export const SET_LEAGUE_INDEX = 'SET_LEAGUE_INDEX';
export const RESET_LEAGUES = 'RESET_LEAGUES';
export const LOAD_LEAGUES = 'LOAD_LEAGUES';

/* ------------------------------------------------------------------------------------------------------------------ */

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
		list: d
	};
}

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 *
 * @param index
 */
export function setLeagueIndex(index: number): Action
{
	return {
		type: SET_LEAGUE_INDEX,
		payload: index
	};
};

/**
 *
 * @param index
 */
export function resetLeagues(): Action
{
	return {
		type: RESET_LEAGUES
	};
};

/**
 *
 * @returns {{type: string, payload: string}}
 */
export function getLeagues(): Action
{
	return dispatch => api.getLeague().then(
		(d) => dispatch(_returnLoadLeagues(d)),
		(e) => dispatch(_returnLoadLeagues([]))
	);
};

