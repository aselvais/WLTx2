import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Image, Text, TouchableHighlight, View} from "react-native";
import {connect} from "react-redux";
import {Container, Content, Tab, Tabs} from "native-base";
import {Col, Grid, Row} from "react-native-easy-grid";
import styles from "./styles";
import {getTeaminfos, setTeaminfoIndex} from "../../../redux/actions/teaminfo";
import {getGames} from "../../../redux/actions/games";
import {setLoading} from "../../../redux/actions/loading";
import moment from 'moment';

import Spinner from '../../widgets/loaders/Spinner';
import Newsfeed from '../../lists/newsfeed';
import Twitterfeed from '../../lists/twitterfeed';

const coverimg = require('../../../../images/teambackgroundblack.jpg');

/**
 *
 */
class Teaminfos extends React.PureComponent
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({navigation}) => ({
		title: 'Team info'
	});

	/**
	 *
	 * @type {{getTeaminfos}}
	 */
	static propTypes = {
		getTeaminfos: PropTypes.func,
		getGames: PropTypes.func,
		setLoading: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		this.props.setLoading('teaminfo', true);
		if (this.props.selectedTeaminfo && this.props.selectedTeaminfo > 0)
		{
			this.props.getTeaminfos(parseInt(this.props.selectedTeaminfo));
			this.props.getGames(moment(new Date()).format('YYYY-MM-DD'), parseInt(this.props.selectedTeaminfo)).then(
				() => this.props.setLoading('teaminfo', false),
				() => this.props.setLoading('teaminfo', false)
			);

		}
	}

	/**
	 *
	 */
	addToFavorite()
	{

	}

	/**
	 *
	 * @param d
	 * @returns {XML}
	 */
	getJsxRow(k, v)
	{
		let retJsx = [];
		if (k && v)
		{
			retJsx.push(<Row key={k + '01'}><Col size={2} style={styles.rowTxt01}><Text
				style={styles.txtTxt01}>{k.toUpperCase()}</Text></Col></Row>);
			retJsx.push(<Row key={k + '02'}><Col size={2} style={styles.rowTxt02}><Text
				style={styles.txtTxt02}>{v}</Text></Col></Row>);
		}
		return retJsx;
	}

	/**
	 *
	 * @returns {XML}
	 */
	getJSXoverview()
	{
		let {teaminfos, games} = this.props;

		let datastruct = {
			divisionName: "Division",
			tierName: "Tiers",
			groupName: "Group",
		};
		let jsx = (
			<Content padder>
				<Grid>{Object.keys(datastruct).map((k) => this.getJsxRow(datastruct[k], teaminfos[k]))}</Grid>
			</Content>
		);
		return jsx;
	}

	/**
	 *
	 * @returns {XML}
	 */
	getJSXnews()
	{
		let {teaminfos, games} = this.props;

		let jsx = (<Newsfeed/>);
		return jsx;
	}

	/**
	 *
	 * @returns {XML}
	 */
	getJSXtweet()
	{
		let {teaminfos, games} = this.props;

		let jsx = (<Twitterfeed/>);
		return jsx;
	}

	/**
	 *
	 * @param t
	 */
	clickTeam(t)
	{
		if (t > 0)
		{
			this.props.setTeaminfoIndex(t);
			this.props.navigation.navigate("Teaminfo");
		}
	}

	/**
	 *
	 * @param games
	 * @returns {XML}
	 */
	getJSXgames(games)
	{
		/*
			{
				id: 710923,
				date: "Feb 25",
				time: "4:00 PM",
				home: true,
				team: "Kanata Sharks PH1",
				imageUrl: "http://admin.winloseortie.com/files/image?directory=team_images&filename=lFi_Kanata.png",
				standing: "L 1 - 2",
				teamId: 28671,
				leagueTimezone: "+0500",
				divisionId: 3009,
				divisionName: "Peewee",
				dateTime: "2017-02-25 16:00:00",
				news: false,
				tweets: false,
				seasonPlayOff: false,
				shareUrl: "http://www.winloseortie.com",
				status: "B Final (3rd vs 4th)",
				linkStreamVideo: null,
			}
		*/
		let jsx = (
			<Content padder style={{ backgroundColor: '#EEEEEE' }}>
				<View>
					{games.map(g => (
						<Grid key={g.id} style={styles.griditem}>
							<Row>
								<Col><Text>{g.date + "\n" + g.time}</Text></Col>
								<TouchableHighlight onPress={() => this.clickTeam(g.teamId)}>
									<Col>
										<Image style={{paddingTop: 5, width: 20, height: 20}}
											   source={{uri: g.imageUrl}}/>
										<Text>{g.team}</Text>
									</Col>
								</TouchableHighlight>
								<Col><Text>{g.standing}</Text></Col>
							</Row>
							<Row>
								<Col>
									<Text>{g.status}</Text>
								</Col>
							</Row>
						</Grid>
					))}
				</View>
			</Content>
		);
		return jsx;
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		let {loading, teaminfos, games} = this.props;
		return (
			<Container>
				{
					(loading) ?
						<Spinner/>
						:
						<Grid>

							<Row size={25} style={styles.row01}>
								<Col>
									<Grid>
										<Row>
											<Image source={coverimg} style={styles.backgroundImage}>
												<Col style={{alignItems: 'center'}}>
													<Image style={styles.imageLogo} source={{uri: teaminfos.imageUrl}}/>
													<Text style={styles.row01textName}>
														{(teaminfos.name) ? teaminfos.name.toUpperCase() : null}
													</Text>
													<Text
														style={styles.row01textDivName}>{teaminfos.divisionName}</Text>
												</Col>
											</Image>
										</Row>
									</Grid>
								</Col>
							</Row>

							<Row size={75}>
								<Col>
									<Tabs initialPage={0}>
										<Tab heading="OVERVIEW">{this.getJSXoverview()}</Tab>
										{(teaminfos && teaminfos.hasNews) ?
											<Tab heading="NEWS">{this.getJSXnews()}</Tab> : null}
										{(teaminfos && teaminfos.hasTweets) ?
											<Tab heading="TWEETS">{this.getJSXtweet()}</Tab> : null}
										{(games && games.past && games.past.length && games.past.length > 0) ?
											<Tab heading="PAST GAMES">{this.getJSXgames(games.past)}</Tab> : null}
										{(games && games.today && games.today.length && games.today.length > 0) ?
											<Tab heading="GAMES TODAY">{this.getJSXgames(games.today)}</Tab> : null}
										{(games && games.upcoming && games.upcoming.length && games.upcoming.length > 0) ?
											<Tab
												heading="UPCOMING GAMES">{this.getJSXgames(games.upcoming)}</Tab> : null}
									</Tabs>
								</Col>
							</Row>

							<Row size={8}>
								<Col size={100} style={styles.topButtonsCol}>
									<TouchableHighlight onPress={() => this.addToFavorite()}>
										<Text style={styles.topButtonsTxt}>Add team to favorites</Text>
									</TouchableHighlight>
								</Col>
							</Row>

						</Grid>
				}
			</Container>
		);
	}
}

export default connect(
	state => ({
		teaminfos: state.teaminfo.list,
		games: state.games.list,
		selectedTeaminfo: state.teaminfo.selectedIndex,
		selectedTeam: state.teams.selectedIndex,
		loading: state.loading.globalstatus,
	}),
	dispatch => ({
		getTeaminfos: teamid => dispatch(getTeaminfos(teamid)),
		getGames: (date, teamid) => dispatch(getGames(date, teamid)),
		setTeaminfoIndex: id => dispatch(setTeaminfoIndex(id)),
		setLoading: (name, status) => dispatch(setLoading(name, status)),
	})
)(Teaminfos);
