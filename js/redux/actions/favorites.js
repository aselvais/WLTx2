import type {Action} from './types';
import Apiaccess from '../../libs/Apiaccess';

let api = new Apiaccess();

export const RESET_FAVORITES = 'RESET_FAVORITES';
export const GET_USER_GAMES = 'GET_USER_GAMES';
export const GET_USER_DIVISION = 'GET_USER_DIVISION';
export const GET_USER_TEAMS = 'GET_USER_TEAMS';
export const POST_USER_TEAMS = 'POST_USER_TEAMS';
export const DELETE_USER_TEAMS = 'DELETE_USER_TEAMS';

/**
 *
 * @param index
 */
export function resetFavorites(): Action
{
	return { type: RESET_FAVORITES };
};

/**
 * getUserGames(date, endDate)
 *
 * @param date
 * @param enddate
 * @returns {function(*): (Promise.<TResult>|Promise<T>)}
 */
export function getUserGames(date: string, enddate: string): Action
{
	function _returnGetUserGames(d) { return { type: GET_USER_GAMES, games: d }; }
	return dispatch => api.getUserGames(date, enddate).then(
		(d) => dispatch(_returnGetUserGames(d)),
		(e) => dispatch(_returnGetUserGames([]))
	);
};

/**
 * getUserDivision()
 * @returns {function(*): (Promise.<TResult>|Promise<T>)}
 */
export function getUserDivision(): Action
{
	function _returnGetUserDivision(d) { return { type: GET_USER_DIVISION, divisions: d }; }
	return dispatch => api.getUserDivision().then(
		(d) => dispatch(_returnGetUserDivision(d)),
		(e) => dispatch(_returnGetUserDivision([]))
	);
};

/**
 * getUserTeams()
 * @returns {function(*): (Promise.<TResult>|Promise<T>)}
 */
export function getUserTeams(): Action
{
	function _returnGetUserTeams(d) { return { type: GET_USER_TEAMS, teams: d }; }
	return dispatch => api.getUserTeams().then(
		(d) => dispatch(_returnGetUserTeams(d)),
		(e) => dispatch(_returnGetUserTeams([]))
	);
};

/**
 * postUserTeams(teamId)
 * @param teamid
 * @returns {function(*): (Promise.<TResult>|Promise<T>)}
 */
export function postUserTeams(teamid: number): Action
{
	function _returnPostUserTeams(d) { return { type: POST_USER_TEAMS, postteams: d }; }
	return dispatch => api.postUserTeams(teamid).then(
		(d) => dispatch(_returnPostUserTeams(d)),
		(e) => dispatch(_returnPostUserTeams([]))
	);
};

/**
 * deleteUserTeams(teamId)
 * @param teamid
 * @returns {function(*): (Promise.<TResult>|Promise<T>)}
 */
export function deleteUserTeams(teamid: number): Action
{
	function _returnDeleteUserTeams(d) { return { type: DELETE_USER_TEAMS, deleteteams: d }; }
	return dispatch => api.deleteUserTeams(teamid).then(
		(d) => dispatch(_returnDeleteUserTeams(d)),
		(e) => dispatch(_returnDeleteUserTeams([]))
	);
};


