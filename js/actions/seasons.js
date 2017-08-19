import type {Action} from './types';
import Apiaccess from '../libs/Apiaccess';

let api = new Apiaccess();

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
 * @param leagueId
 * @returns {function(*): (Promise.<TResult>|Promise<T>)}
 */
export function getSeasons(leagueId=0): Action
{
	return dispatch => api.getLeague(leagueId).then(
		(d) => dispatch(_returnLoadSeasons(d)),
		(e) => dispatch(_returnLoadSeasons([]))
	);
};

