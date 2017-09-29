import {AsyncStorage} from 'react-native';
import devTools from 'remote-redux-devtools';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
import reducer from './redux/reducers';
import promise from './promise';

export default function configureStore(onCompletion: () => void): any
{
	const enhancer = compose(
		applyMiddleware(thunk, promise),
		devTools({
			name: 'WLTx2', realtime: true,
		}),
	);

	const store = createStore(reducer, enhancer);
	persistStore(store, {storage: AsyncStorage}, onCompletion);

	return store;
}
