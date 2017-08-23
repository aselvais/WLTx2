import type {Action} from './types';
import Apiaccess from '../libs/Apiaccess';

let api = new Apiaccess();

export const SET_GAMES_INDEX = 'SET_GAMES_INDEX';
export const LOAD_GAMES = 'LOAD_GAMES';

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
 * @param leagueId
 * @returns {function(*): (Promise.<TResult>|Promise<T>)}
 */
export function getGames(date: date, teamid: number): Action
{
	return dispatch => api.getGameDetailAllArrays(date, teamid).then(
		(d) => dispatch(_returnLoadGames(d)),
		(e) => dispatch(_returnLoadGames([]))
	);
};

