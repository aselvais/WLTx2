import type {Action} from './types';
import Apiaccess from '../../libs/Apiaccess';

let api = new Apiaccess();

export const SET_TIER_INDEX = 'SET_TIER_INDEX';
export const RESET_TIERS = 'RESET_TIERS';
export const LOAD_TIERS = 'LOAD_TIERS';

/**
 *
 * @param index
 */
export function setTierIndex(index: number): Action
{
	return {
		type: SET_TIER_INDEX,
		payload: index
	};
};

/**
 *
 * @param index
 */
export function resetTiers(): Action
{
	return {
		type: RESET_TIERS
	};
};

/**
 *
 * @returns {{type: string, payload: string}}
 */
export function getTiers(divisionid: number): Action
{
	function _returnLoadTiers(d) { return { type: LOAD_TIERS, list: d }; }
	return dispatch => api.getTier(divisionid).then(
		(d) => dispatch(_returnLoadTiers(d)),
		(e) => dispatch(_returnLoadTiers([]))
	);
};

