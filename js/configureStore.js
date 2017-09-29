import {AsyncStorage} from 'react-native';
import devTools from 'remote-redux-devtools';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
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
	 * @type {boolean}
	 */
	const debugMode = true;

	/**
	 *
	 * @type {<R>(a: R) => R | GenericStoreEnhancer | Func0<any> | Func1<any, any> | Func2<any, any, any> | Func3<any, any, any, any> | any}
	 */
	const enhancer = compose(
		applyMiddleware(thunk, promise),
		debugMode ? devTools({ name: 'WLTx2', realtime: true }) : null
	);

	/**
	 *
	 * @type {Store<any>}
	 */
	const store = createStore(reducer, enhancer);
	/**
	 *
	 */
	persistStore(store, {storage: AsyncStorage}, onCompletion);

	return store;
}
