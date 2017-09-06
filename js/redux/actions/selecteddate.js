import type {Action} from './types';

export const SET_DATE = 'SET_DATE';

export function setDate(sdate: object): Action
{
	return {
		type: SET_DATE,
		payload: sdate,
	};
}
