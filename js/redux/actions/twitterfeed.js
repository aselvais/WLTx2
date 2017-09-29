import type {Action} from './types';
import Apiaccess from '../../libs/Apiaccess';

let api = new Apiaccess();

export const SET_TWITTERFEED_INDEX = 'SET_TWITTERFEED_INDEX';
export const RESET_TWITTERFEEDS = 'RESET_TWITTERFEEDS';
export const LOAD_TWITTERFEEDS = 'LOAD_TWITTERFEEDS';

/**
 *
 * @param index
 */
export function setTwitterfeedIndex(index: number): Action
{
	return {
		type: SET_TWITTERFEED_INDEX,
		payload: index
	};
};

/**
 *
 * @param index
 */
export function resetTwitterfeeds(): Action
{
	return {
		type: RESET_TWITTERFEEDS
	};
};

/**
 *
 * @returns {{type: string, payload: string}}
 */
export function getTwitterfeeds(teamid: number): Action
{
	function _returnLoadTwitterfeeds(d)
	{
		return {type: LOAD_TWITTERFEEDS, list: d};
	}

	return dispatch => api.getFeedTwitter(teamid).then(
		(d) => dispatch(_returnLoadTwitterfeeds(d)),
		(e) => dispatch(_returnLoadTwitterfeeds([]))
	);
};

