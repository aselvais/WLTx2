import {AsyncStorage} from 'react-native';
import devTools from 'remote-redux-devtools';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {
	persistStore,
	autoRehydrate
} from 'redux-persist';
import reducer from './redux/reducers';
import promise from './promise';

/**
 *
 * @param onCompletion
 * @returns {Store.<any>}
 */
export default function configureStore(onCompletion: () => void): any
{
	/**
	 *
	 */
	const enhancer = ( __DEV__ ?
			compose(applyMiddleware(thunk, promise), devTools({name: 'WLTx2', realtime: true})) :
			compose(applyMiddleware(thunk, promise))
	);

	/**
	 *
	 * @type {Store<any>}
	 */
	const store = createStore(
		reducer,
		enhancer,
		compose(
			autoRehydrate()
		)
	);
	/**
	 *
	 */
	persistStore(
		store,
		{storage: AsyncStorage},
		onCompletion
	);

	return store;
}
