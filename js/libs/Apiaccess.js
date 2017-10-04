import React from 'react';
import DeviceInfo from 'react-native-device-info';
import md5 from 'md5';

let instance = null;

/**
 * API access abstraction layer
 */
class Apiaccess
{
	/**
	 *
	 * @type {boolean}
	 * @private
	 */
	_debugMode = __DEV__;
	/**
	 *
	 * @type {{prod: string, stage: string}}
	 * @private
	 */
	_urls = {
		prod: "http://m.winloseortie.com",
		stage: "http://m.w2wtestwebsite.info"
	};

	/**
	 * Contained for cached data.
	 * Contains an object having an md5 hash as key and object { creationDate: {Date}, data: {jsonData}}
	 * @type {{}}
	 * @private
	 */
	_caching = {};

	/**
	 * Maximum age of cached data in sec.
	 * Set to 10 mins for now...
	 *
	 * @type {number}
	 * @private
	 */
	_cachingDuration = 600;

	/**
	 * Token used to connect to the API (seems to be used for the favourite and other personal data)
	 * @type {null}
	 * @private
	 */
	_token = null;
	/**
	 * Date object instanciated when we created the singleton
	 *
	 * @type {Date}
	 * @private
	 */
	_singletonStartDate;

	/**
	 * Instantiate / return the singleton instance of this class
	 *
	 * @returns {*}
	 */
	constructor()
	{
		if (!instance)
		{
			instance = this;
		}
		this._singletonStartDate = new Date();
		return instance;
	}

	/**
	 * Config coming from the XLS doc received
	 * @type {Object}
	 * @private
	 */
	_cfg = {
		PostRegister: {
			url: "/api/user/register",
			method: "POST",
			params: ["device"],
			desc: "Get authorization token"
		},
		GetDivision: {
			url: "/api/division",
			method: "GET",
			params: ["seasonId"],
			desc: "Get divisions for season or all if no param"
		},
		GetLeague: {
			url: "/api/league",
			method: "GET",
			params: [],
			desc: "Get leagues list"
		},
		GetSeason: {
			url: "/api/season",
			method: "GET",
			params: ["leagueId"],
			desc: "Get seasons for league"
		},
		GetTeam: {
			url: "/api/team",
			method: "GET",
			params: ["divisionId"],
			desc: "Get teams for division"
		},
		GetGameToday: {
			url: "/api/game/today",
			method: "GET",
			params: ["date", "seasonId", "divisionId"],
			desc: "Get games for specific date, season and division"
		},
		GetGameAll: {
			url: "/api/game/all",
			method: "GET",
			params: ["datefrom", "dateto", "seasonId", "divisionId"],
			desc: "Get games for specific date, season and division"
		},
		GetGameDetailAllArrays: {
			url: "/api/game/detailAllArrays",
			method: "GET",
			params: ["date", "teamId"],
			desc: "Get past, current day and upcoming games for specific date and team"
		},
		GetUserGames: {
			url: "/api/user/games",
			method: "GET",
			params: ["date", "endDate"],
			desc: "Get games in dates range for users favourite teams"
		},
		// no view for that... DOn't know what that is...
		GetTier: {
			url: "/api/tier",
			method: "GET",
			params: ["divisionId"],
			desc: "Get ties for division"
		},
		GetUserDivision: {
			url: "/api/user/division",
			method: "GET",
			params: [],
			desc: "Get divisions for users favourite teams"
		},
		GetUserTeams: {
			url: "/api/user/teams",
			method: "GET",
			params: [],
			desc: "Get user favourite teams list"
		},
		PostUserTeams: {
			url: "/api/user/teams",
			method: "POST",
			params: ["teamId"],
			desc: "Add team to favourites"
		},
		DeleteUserTeams: {
			url: "/api/user/teams",
			method: "DELETE",
			params: ["teamId"],
			desc: "Remove team from favourites"
		},
		GetFeedNews: {
			url: "/api/feed/news",
			method: "GET",
			params: ["teamId"],
			desc: "Get news for team"
		},
		GetFeedTwitter: {
			url: "/api/feed/twitter",
			method: "GET",
			params: ["teamId"],
			desc: "Get tweets for team"
		},
		GetTeamInfo: {
			url: "/api/teamInfo",
			method: "GET",
			params: ["teamId"],
			desc: "Get team info"
		},
		// No view for that... Don't know what that is
		standingLocalTierGroup: {
			url: "/api/team/standingLocalTierGroup",
			method: "GET",
			params: ["divisionIds", "tierId"],
			desc: ""
		}
	};

	/**
	 * Returns the config element for the API coming from the XLS documentation received
	 *
	 * @return Object
	 */
	get cfg()
	{
		return this._cfg;
	}

	/**
	 * Setter for log message
	 *
	 * @param msg
	 */
	set log(msg)
	{
		if (this._debugMode)
		{
			console.log(msg);
		}
	}

	/**
	 * Returns the URL to be used
	 *
	 * @param env
	 * @returns {*}
	 */
	getUrl(env = "prod")
	{
		if (typeof this._urls[env] == "undefined")
		{
			env = "prod";
		}
		return this._urls[env];
	}

	/**
	 * Get authorization token
	 *
	 * @todo Remove this caching system as we have a generic one in _genericApiCall()
	 * @returns {Promise}
	 */
	async postRegister()
	{
		var that = this;
		if (that._token === null)
		{
			var p;
			var uID = md5('sdf645ds6f45d4fs64sdf6468s7f8wervxc546');
			if (DeviceInfo && DeviceInfo.getUniqueID)
			{
				uID = DeviceInfo.getUniqueID();
			}
			p = that._genericApiCall('PostRegister', {device: uID});
			p.then(
				function (d)
				{
					that._token = d.token;
				},
				function (d)
				{
					that._token = null;
				}
			);
			return p;
		}
		else
		{
			return new Promise(function (resolve, reject)
			{
				resolve({token: that._token});
			});
		}
	}

	/**
	 * Get divisions for season or all if no param
	 *
	 * @param seasonId
	 * @returns {Promise}
	 */
	async getDivision(seasonId = null)
	{
		return this.postRegister().then(() => this._genericApiCall('GetDivision', {seasonId: seasonId}));
	}

	/**
	 * Get leagues list
	 *
	 * @returns {Promise}
	 */
	async getLeague()
	{
		return this.postRegister().then(() => this._genericApiCall('GetLeague', {}));
	}

	/**
	 * Get seasons for league
	 *
	 * @param leagueId
	 * @returns {Promise}
	 */
	async getSeason(leagueId)
	{
		return this.postRegister().then(() => this._genericApiCall('GetSeason', {leagueId: leagueId}));
	}

	/**
	 * Get teams for division
	 *
	 * @param divisionId
	 * @returns {Promise}
	 */
	async getTeam(divisionId)
	{
		return this.postRegister().then(() => this._genericApiCall('GetTeam', {divisionId: divisionId}));
	}

	/**
	 * Get games for specific date, season and division
	 *
	 * @param date
	 * @param seasonId
	 * @param divisionId
	 * @returns {Promise}
	 */
	async getGameToday(date, seasonId, divisionId)
	{
		return this.postRegister().then(() => this._genericApiCall('GetGameToday', {
			date: date,
			seasonId: seasonId,
			divisionId: divisionId
		}));
	}

	/**
	 * Same as getGameToday but with a date from and to
	 *
	 * @param datefrom
	 * @param dateto
	 * @param seasonId
	 * @param divisionId
	 * @returns {Promise}
	 */
	async getGameAll(datefrom, dateto, seasonId, divisionId)
	{
		return this.postRegister().then(() => this._genericApiCall('GetGameAll', {
			datefrom: datefrom,
			dateto: dateto,
			seasonId: seasonId,
			divisionId: divisionId
		}));
	}

	/**
	 * Get past, current day and upcoming games for specific date and team
	 *
	 * @param date
	 * @param teamId
	 * @returns {Promise}
	 */
	async getGameDetailAllArrays(date, teamId)
	{
		return this.postRegister().then(() => this._genericApiCall('GetGameDetailAllArrays', {
			date: date,
			teamId: teamId
		}));
	}

	/**
	 * Get ties for division
	 *
	 * @param divisionId
	 * @returns {Promise}
	 * @todo create list view for tiers
	 */
	async getTier(divisionId)
	{
		return this.postRegister().then(() => this._genericApiCall('GetTier', {divisionId: divisionId}));
	}

	/**
	 * Get news for team
	 *
	 * @param teamId
	 * @returns {Promise}
	 * @todo create list view for newsfeed
	 */
	async getFeedNews(teamId)
	{
		return this.postRegister().then(() => this._genericApiCall('GetFeedNews', {teamId: teamId}));
	}

	/**
	 * Get tweets for team
	 *
	 * @param teamId
	 * @returns {Promise}
	 * @todo create list view for twitterfeed
	 */
	async getFeedTwitter(teamId)
	{
		return this.postRegister().then(() => this._genericApiCall('GetFeedTwitter', {teamId: teamId}));
	}

	/**
	 * Get team info
	 * @param teamId
	 * @returns {Promise}
	 * @todo create list view for teaminfo
	 */
	async getTeamInfo(teamId)
	{
		return this.postRegister().then(() => this._genericApiCall('GetTeamInfo', {teamId: teamId}));
	}

	/**
	 *
	 * @param divisionIds
	 * @returns {Promise}
	 * @todo create list view for standings
	 */
	async standingLocalTierGroup(divisionIds, tierId = 0)
	{
		return this.postRegister().then(() => this._genericApiCall('standingLocalTierGroup', {
			divisionIds: divisionIds,
			tierId: tierId
		}));
	}

	/**
	 * Get games in dates range for users favourite teams
	 *
	 * @param date
	 * @param endDate
	 * @returns {Promise}
	 */
	async getUserGames(date, endDate)
	{
		return this.postRegister().then(() => this._genericApiCall('GetUserGames', {date: date, endDate: endDate}));
	}

	/**
	 * Get divisions for users favourite teams
	 *
	 * @returns {Promise}
	 */
	async getUserDivision()
	{
		return this.postRegister().then(() => this._genericApiCall('GetUserDivision', {}));
	}

	/**
	 * Get user favourite teams list
	 *
	 * @returns {Promise}
	 */
	async getUserTeams()
	{
		return this.postRegister().then(() => this._genericApiCall('GetUserTeams', {}));
	}

	/**
	 * Add team to favourites
	 *
	 * @param teamId
	 * @returns {Promise}
	 */
	async postUserTeams(teamId)
	{
		return this.postRegister().then(() => this._genericApiCall('PostUserTeams', {teamId: teamId}));
	}

	/**
	 * Remove team from favourites
	 *
	 * @param teamId
	 * @returns {Promise}
	 */
	async deleteUserTeams(teamId)
	{
		return this.postRegister().then(() => this._genericApiCall('DeleteUserTeams', {teamId: teamId}));
	}

	/**
	 * Generic call to the API
	 *
	 * @param serviceName
	 * @param params
	 * @returns {Promise}
	 * @private
	 */
	async _genericApiCall(serviceName = 'PostRegister', params = {})
	{
		var sd = this._cfg[serviceName];
		var url = this.getUrl();
		var prms = '';

		let fetchOpts = {
			method: sd.method,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		};
		if (this._token !== null && serviceName !== 'PostRegister')
		{
			fetchOpts.headers.authToken = this._token;
		}

		if (params && params !== {})
		{
			let paramsT = JSON.stringify(params);
			if (sd.method === 'GET')
			{
				// paramsT = JSON.stringify(params).replace(/{|}/gi, "");
				prms = '?';
				for (var p in params)
				{
					prms += p + '=' + params[p] + '&';
				}
			}
			else
			{
				fetchOpts.body = paramsT;
			}
		}
		try
		{
			let requestHash = md5(JSON.stringify([url + sd.url + prms, fetchOpts]));
			let response;
			let responseJson;
			let getDataFromAPI = true;

			if (this._caching[requestHash] && this._caching[requestHash].data)
			{
				let cacheAge = ( (new Date()).getTime() - this._caching[requestHash].creationDate.getTime()) / 1000;
				if (cacheAge < this._cachingDuration)
				{
					this.log = 'Found cached data ' + requestHash + '. Created: ' + this._caching[requestHash].creationDate + ' Age: ' + cacheAge;
					responseJson = this._caching[requestHash].data;
					getDataFromAPI = false;
				}
			}
			if (getDataFromAPI)
			{
				response = await fetch(url + sd.url + prms, fetchOpts);
				responseJson = await response.json();
				this._caching[requestHash] = {creationDate: new Date(), data: responseJson};
				this.log = 'Created cached data ' + requestHash;
				this.log = this._caching[requestHash]
			}
			return responseJson;
		} catch (error)
		{
			this.log = 'Error querying the API';
			this.log = error;
			return error;
		}
	}

}

export default Apiaccess;