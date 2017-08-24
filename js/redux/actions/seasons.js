import type {Action} from './types';
import Apiaccess from '../../libs/Apiaccess';

let api = new Apiaccess();

export const SET_SEASONS_INDEX = 'SET_SEASONS_INDEX';
export const RESET_SEASONS = 'RESET_SEASONS';
export const LOAD_SEASONS = 'LOAD_SEASONS';

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 *
 * @param d
 * @returns {{type: string, leagues: *}}
 * @private
 */
function _returnLoadSeasons(d)
{
	return {
		type: LOAD_SEASONS,
		list: d
	};
}

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 *
 * @param index
 */
export function setSeasonIndex(index: number): Action
{
	return {
		type: SET_SEASONS_INDEX,
		payload: index
	};
};

/**
 *
 * @param index
 */
export function resetSeasons(): Action
{
	return {
		type: RESET_SEASONS
	};
};

/**
 *
 * @param leagueId
 * @returns {function(*): (Promise.<TResult>|Promise<T>)}
 */
export function getSeasons(leagueid: number): Action
{
	return dispatch => api.getSeason(leagueid).then(
		(d) => dispatch(_returnLoadSeasons(d)),
		(e) => dispatch(_returnLoadSeasons([]))
	);
};

