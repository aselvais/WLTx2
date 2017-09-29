import type {Action} from './types';

export const SET_LOADING = 'SET_LOADING';

export function setLoading(name: string, status: string): Action
{
	console.log(name, status);
	return {
		type: SET_LOADING,
		name: name,
		status: status
	};
}
