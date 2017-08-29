import type {Action} from './types';
import Apiaccess from '../../libs/Apiaccess';

let api = new Apiaccess();

export const SET_NEWSFEED_INDEX = 'SET_NEWSFEED_INDEX';
export const RESET_NEWSFEEDS = 'RESET_NEWSFEEDS';
export const LOAD_NEWSFEEDS = 'LOAD_NEWSFEEDS';

/**
 *
 * @param index
 */
export function setNewsfeedIndex(index: number): Action
{
	return {
		type: SET_NEWSFEED_INDEX,
		payload: index
	};
};

/**
 *
 * @param index
 */
export function resetNewsfeeds(): Action
{
	return {
		type: RESET_NEWSFEEDS
	};
};

/**
 *
 * @returns {{type: string, payload: string}}
 */
export function getNewsfeeds(teamid: number): Action
{
	function _returnLoadNewsfeeds(d) { return { type: LOAD_NEWSFEEDS, list: d }; }
	return dispatch => api.getFeedNews(teamid).then(
		(d) => dispatch(_returnLoadNewsfeeds(d)),
		(e) => dispatch(_returnLoadNewsfeeds([]))
	);
};

