import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
let instance = null;


/**
 * Singleton wrapper for Google Analytics
 */
class Apptracking
{

	/**
	 *
	 * @returns {*}
	 */
	constructor()
	{
		if (!instance) {
			instance = this;
		}
		this._singletonStartDate = new Date();
		this.tracker = new GoogleAnalyticsTracker('UA-105982154-1');
		return instance;
	}

	/**
	 *
	 * @param msg
	 */
	trackScreenView( msg )
	{
		this.tracker.trackScreenView(msg);
	}

	/**
	 *
	 * @param prevState
	 * @param currentState
	 */
	trackRouteChange(prevState, currentState)
	{
		function getCurrentRouteName(navigationState)
		{
			if (!navigationState) {
				return null;
			}
			const route = navigationState.routes[navigationState.index];
			// dive into nested navigators
			if (route.routes) {
				return getCurrentRouteName(route);
			}
			return route.routeName;
		}

		const currentScreen = getCurrentRouteName(currentState);
		const prevScreen = getCurrentRouteName(prevState);

		if (currentScreen != prevScreen)
		{
			this.trackScreenView(currentScreen);
		}
	}


}


export default Apptracking;