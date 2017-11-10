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
	componentWillMount()
	{
		this.loadTeamFromApi();
	}

	/**
	 *
	 */
	loadTeamFromApi(tids=null)
	{
		let tid = null;
		this.props.setLoading('teaminfo', true);
		if (tids)
		{
			tid = tids;
		}
		else
		{
			tid = this.props.selectedTeaminfo;
		}


		if (tid && tid > 0)
		{
			this.props.getTeaminfos(parseInt(tid));
			this.props.getGames(moment(new Date()).format('YYYY-MM-DD'), parseInt(tid)).then(
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
			retJsx.push(
				<Row key={k + '01'}><Col size={2} style={styles.rowTxt01}>
					<Text style={styles.txtTxt01}>{k.toUpperCase()}</Text>
				</Col></Row>
			);
			retJsx.push(
				<Row key={k + '02'}><Col size={2} style={styles.rowTxt02}>
					<Text style={styles.txtTxt02}>{v}</Text>
				</Col></Row>
			);
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
			<Content>
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
			this.loadTeamFromApi(t);
			// this.props.navigation.navigate("Teaminfo");
		}
	}

	/**
	 *
	 * @param games
	 * @returns {XML}
	 */
	getJSXgames(games)
	{
		let jsx = (
			<Content padder style={{ backgroundColor: '#EEEEEE' }}>
				<View>
					{games.map(g => (
						<TouchableHighlight key={g.id} onPress={() => this.clickTeam(g.teamId)}>
						<Grid key={g.id} style={styles.griditem}>
							<Row style={styles.topRow}>
								<Col size={80}>
									<Grid>
										<Row>
											<Col style={{width: 25}}><Image style={{paddingTop: 5, width: 20, height: 20}} source={{uri: g.imageUrl}}/></Col>
											<Col><Text>{g.team.toUpperCase()}</Text></Col>
										</Row>
									</Grid>
								</Col>
								<Col size={20}>
									<Text>{g.standing}</Text>
								</Col>
							</Row>
							<Row style={styles.bottomRow}>
								<Col size={50}><Text style={styles.txtBottom01}>{g.date + " " + g.time}</Text></Col>
								<Col size={50}><Text style={styles.txtBottom02}>{g.status}</Text></Col>
							</Row>
						</Grid>
						</TouchableHighlight>
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
										{ (teaminfos && teaminfos.hasNews) ?
											<Tab heading="NEWS">{this.getJSXnews()}</Tab> : null }
										{ (teaminfos && teaminfos.hasTweets) ?
											<Tab heading="TWEETS">{this.getJSXtweet()}</Tab> : null }
										{ (games && games.past && games.past.length && games.past.length > 0) ?
											<Tab heading="PAST GAMES">{this.getJSXgames(games.past)}</Tab> : null }
										{ (games && games.today && games.today.length && games.today.length > 0) ?
											<Tab heading="GAMES TODAY">{this.getJSXgames(games.today)}</Tab> : null }
										{ (games && games.upcoming && games.upcoming.length && games.upcoming.length > 0) ?
											<Tab heading="UPCOMING GAMES">{this.getJSXgames(games.upcoming)}</Tab> : null }
										<Tab heading="INFO">{this.getJSXoverview()}</Tab>
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
