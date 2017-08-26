import type {Action} from './types';
import Apiaccess from '../../libs/Apiaccess';

let api = new Apiaccess();

export const SET_GAMES_INDEX = 'SET_GAMES_INDEX';
export const RESET_GAMES = 'RESET_GAMES';
export const LOAD_GAMES = 'LOAD_GAMES';
export const LOAD_GAMES_DAY = 'LOAD_GAMES_DAY';

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 *
 * @param d
 * @returns {{type: string, leagues: *}}
 * @private
 */
function _returnLoadGames(d)
{
	return {
		type: LOAD_GAMES,
		list: d
	};
}

/**
 *
 * @param d
 * @returns {{type: string, leagues: *}}
 * @private
 */
function _returnLoadGamesDay(d)
{
	return {
		type: LOAD_GAMES_DAY,
		listday: d
	};
}

/* ------------------------------------------------------------------------------------------------------------------ */
/**
 *
 * @param index
 */
export function setGameIndex(index: number): Action
{
	return {
		type: SET_GAMES_INDEX,
		payload: index
	};
};
/**
 *
 * @param index
 */
export function resetGames(): Action
{
	return {
		type: RESET_GAMES
	};
};

/**
 *
 * @param date
 * @param teamid
 * @returns {function(*): (Promise<T> | Promise.<TResult>)}
 */
export function getGames(date: string, teamid: number): Action
{
	return dispatch => api.getGameDetailAllArrays(date, teamid).then(
		(d) => dispatch(_returnLoadGames(d)),
		(e) => dispatch(_returnLoadGames([]))
	);
};

/**
 *
 * @param date
 * @param seasonid
 * @param divisionid
 * @returns {function(*): (Promise<T> | Promise.<TResult>)}
 */
export function getGamesDay(date: string, seasonid: number, divisionid: number): Action
{
	return dispatch => api.getGameToday(date, seasonid, divisionid).then(
		(d) => dispatch(_returnLoadGames(d)),
		(e) => dispatch(_returnLoadGames(e))
	);
};

