import type {Action} from './types';
import Apiaccess from '../../libs/Apiaccess';

let api = new Apiaccess();

export const SET_TEAMINFO_INDEX = 'SET_TEAMINFO_INDEX';
export const RESET_TEAMINFOS = 'RESET_TEAMINFOS';
export const LOAD_TEAMINFOS = 'LOAD_TEAMINFOS';

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 *
 * @param d
 * @returns {{type: string, teaminfos: *}}
 * @private
 */
function _returnLoadTeaminfos(d)
{
	return {
		type: LOAD_TEAMINFOS,
		list: d
	};
}

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 *
 * @param index
 */
export function setTeaminfoIndex(index: number): Action
{
	return {
		type: SET_TEAMINFO_INDEX,
		payload: index
	};
};

/**
 *
 * @param index
 */
export function resetTeaminfos(): Action
{
	return {
		type: RESET_TEAMINFOS
	};
};

/**
 *
 * @returns {{type: string, payload: string}}
 */
export function getTeaminfos(teamid: number): Action
{
	return dispatch => api.getTeamInfo(teamid).then(
		(d) => dispatch(_returnLoadTeaminfos(d)),
		(e) => dispatch(_returnLoadTeaminfos([]))
	);
};

