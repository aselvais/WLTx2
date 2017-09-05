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
			this._singletonStartDate = new Date();
			this.tracker = new GoogleAnalyticsTracker('UA-105982154-1');
		}
		return instance;
	}


}


export default Apptracking;