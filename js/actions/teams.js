import type {Action} from './types';
import Apiaccess from '../libs/Apiaccess';

let api = new Apiaccess();

export const SET_TEAMS_INDEX = 'SET_TEAMS_INDEX';
export const LOAD_TEAMS = 'LOAD_TEAMS';

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 *
 * @param d
 * @returns {{type: string, leagues: *}}
 * @private
 */
function _returnLoadTeams(d)
{
	return {
		type: LOAD_TEAMS,
		list: d
	};
}

/* ------------------------------------------------------------------------------------------------------------------ */
/**
 *
 * @param index
 */
export function setTeamIndex(index: number): Action
{
	return {
		type: SET_TEAMS_INDEX,
		payload: index
	};
};

/**
 *
 * @param leagueId
 * @returns {function(*): (Promise.<TResult>|Promise<T>)}
 */
export function getTeams(divisionid: number): Action
{
	return dispatch => api.getTeam(divisionid).then(
		(d) => dispatch(_returnLoadTeams(d)),
		(e) => dispatch(_returnLoadTeams([]))
	);
};

