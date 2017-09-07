import type {Action} from './types';
import Apiaccess from '../../libs/Apiaccess';

let api = new Apiaccess();

export const SET_TEAMS_INDEX = 'SET_TEAMS_INDEX';
export const SET_TEAMS_INDEX_BY_ID = 'SET_TEAMS_INDEX_BY_ID';
export const RESET_TEAMS = 'RESET_TEAMS';
export const LOAD_TEAMS = 'LOAD_TEAMS';

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

export function setTeamIndexById(id: number): Action
{
	return {
		type: SET_TEAMS_INDEX_BY_ID,
		payload: id
	};
};

/**
 *
 * @param index
 */
export function resetTeams(): Action
{
	return {
		type: RESET_TEAMS
	};
};

/**
 *
 * @param leagueId
 * @returns {function(*): (Promise.<TResult>|Promise<T>)}
 */
export function getTeams(divisionid: number): Action
{
	function _returnLoadTeams(d) { return { type: LOAD_TEAMS, list: d }; }
	return dispatch => api.getTeam(divisionid).then(
		(d) => dispatch(_returnLoadTeams(d)),
		(e) => dispatch(_returnLoadTeams([]))
	);
};

