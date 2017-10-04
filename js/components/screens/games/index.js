import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {Button, Container, Content, Icon,} from "native-base";
import {Col, Grid, Row} from "react-native-easy-grid";
import moment from 'moment';
import {getGamesAll, setGameIndex} from "../../../redux/actions/games";
import {getTeams, setTeamIndexById} from "../../../redux/actions/teams";
import {setLoading} from "../../../redux/actions/loading";
import Headerbar from '../../widgets/headerbar/index';
import styles from "./styles";
import Spinner from '../../widgets/loaders/Spinner';

/**
 *
 */
class Games extends Component
{
	/**
	 * Option for the TabNavigation system
	 * @type {{header: null, tabBarLabel: string, tabBarIcon: (function({tintColor?: *}): XML)}}
	 */
	static navigationOptions = ({navigation}) => ({
		header: <Headerbar title="Games" navigation={navigation}/>,
		tabBarLabel: 'Games',
		tabBarIcon: ({tintColor}) => <Icon name="ios-calendar" style={{color: tintColor}}/>
	});

	/**
	 *
	 * @type {{getSeasons}}
	 */
	static propTypes = {
		getGames: PropTypes.func,
		setGameIndex: PropTypes.func,
		setTeamIndexById: PropTypes.func,
		getGamesDay: PropTypes.func,
		getGamesAll: PropTypes.func,
		getTeams: PropTypes.func,
		setLoading: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		let datefrom = this.props.sdatefrom.getTime();
		let dateto = this.props.sdateto.getTime();

		if (this.props && this.props.season && this.props.season.id && this.props.division && this.props.division.id)
		{
			this.props.setLoading('games', true);
			this.props.getGamesAll(datefrom, dateto, this.props.season.id, this.props.division.id).then(
				() => this.props.setLoading('games', false),
				() => this.props.setLoading('games', false)
			);
		}
	}

	/**
	 *
	 * @param item
	 */
	clickGame(item, routeName = null)
	{
		this.props.setGameIndex(item);
		if (routeName)
		{
			this.props.navigation.navigate(routeName);
		}
	}

	clickTeam(t)
	{
		this.props.setTeamIndexById(t);
		this.props.navigation.navigate("Teaminfo");
	}

	/**
	 *
	 * @param item
	 * @returns {XML}
	 */
	getJsxGame(item)
	{
		return (
			<Row key={item.id}>
				<Col style={{margin: 5}}>
					<Grid style={styles.griditem}>
						<Col size={2}>
							<Row>
								<Grid>
									<Row>
										<Col style={{width: 40, height: 40}}>
											<TouchableOpacity onPress={() => this.clickTeam(item.info.team1.teamId)}>
												<Image style={{width: 25, height: 25}}
													   source={{uri: item.info.team1.imageUrl}}/>
											</TouchableOpacity>
										</Col>
										<Col>
											<TouchableOpacity onPress={() => this.clickTeam(item.info.team1.teamId)}>
												<Text
													style={{color: '#000000'}}>{item.info.team1.teamName.toUpperCase()}</Text>
											</TouchableOpacity>
										</Col>
									</Row>
								</Grid>
							</Row>
							<Row>
								<Grid>
									<Row>
										<Col style={{width: 40, height: 40}}>
											<TouchableOpacity onPress={() => this.clickTeam(item.info.team2.teamId)}>
												<Image style={{width: 25, height: 25}}
													   source={{uri: item.info.team2.imageUrl}}/>
											</TouchableOpacity>
										</Col>
										<Col>
											<TouchableOpacity onPress={() => this.clickTeam(item.info.team2.teamId)}>
												<Text>{item.info.team2.teamName.toUpperCase()}</Text>
											</TouchableOpacity>
										</Col>
									</Row>
								</Grid>
							</Row>
						</Col>
						<Col size={1} style={styles.colin}>
							<Row style={{borderBottomColor: '#EEEEEE', borderBottomWidth: 1}}>
								<TouchableOpacity onPress={() => this.clickGame(item, "Arena")}>
									<Text style={{fontWeight: 'bold'}}>
										<Icon name="ios-time" style={{fontSize: 15}}/>{'  ' + item.time}
									</Text>
								</TouchableOpacity>
							</Row>
							<Row style={{paddingTop: 5}}>
								<TouchableOpacity onPress={() => this.clickGame(item, "Arena")}>
									<Text>
										<Icon name="ios-navigate" style={{fontSize: 15}}/>{'  ' + item.arena.name}
									</Text>
								</TouchableOpacity>
							</Row>
						</Col>
					</Grid>
				</Col>
			</Row>
		);
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		let {sdate, sdatefrom, sdateto, division, gamesday, loading} = this.props;

		return (
			<Container style={{backgroundColor: '#EEEEEE'}}>
				<Grid>
					<Row style={{height: 50}}>
						<Col size={1}>
							<Button style={styles.topbutton}
									onPress={() => this.props.navigation.navigate("Divisions")}>
								<Grid>
									<Col style={styles.topbntcol}>
										<Text style={{fontWeight: 'bold'}}>DIVISION:</Text>
										<Text
											style={{fontWeight: 'bold'}}>{(division && division.name) ? division.name.toUpperCase() : null}</Text>
									</Col>
									<Col style={{width: 18}}>
										<Icon name="ios-arrow-forward" style={{color: '#000000'}}/>
									</Col>
								</Grid>
							</Button>
						</Col>
						<Col size={1}>
							<Button style={styles.topbutton}
									onPress={() => this.props.navigation.navigate("Selectdate")}>
								<Grid>
									<Col style={styles.topbntcol}>
										<Text style={{fontWeight: 'bold'}}>DATE:</Text>
										<Text style={{fontWeight: 'bold'}}>{moment(sdate).format('L')}</Text>
									</Col>
									<Col style={{width: 18}}>
										<Icon name="ios-arrow-forward" style={{color: '#000000'}}/>
									</Col>
								</Grid>
							</Button>
						</Col>
					</Row>
					<Row>
						<Content padder>
							<Spinner/>
							{
								(gamesday && gamesday.length && gamesday.length > 0) ?
									<Grid>
										{gamesday.map((item, i) => this.getJsxGame(item))}
									</Grid>
									: null
							}
							{
								(!loading && !(gamesday && gamesday.length && gamesday.length > 0)) ?
									<View>
										<Text>No game from {moment(sdatefrom).format('L')}
											to {moment(sdateto).format('L')}</Text>
									</View>
									:
									null
							}
						</Content>
					</Row>
				</Grid>
			</Container>
		);
	}
}

export default connect(
	state => ({
		games: state.games.list,
		gamesday: state.games.listday,
		selectedTeam: state.teams.selectedIndex,
		league: state.leagues.selectedIndex,
		season: state.seasons.selectedIndex,
		division: state.divisions.selectedIndex,
		team: state.teams.selectedIndex,
		sdate: state.selecteddate.sdate,
		sdatefrom: state.selecteddate.sdatefrom,
		sdateto: state.selecteddate.sdateto,
		loading: state.loading.globalstatus
	}),
	dispatch => ({
		getGamesAll: (datefrom, dateto, seasonid, divisionid) => dispatch(getGamesAll(datefrom, dateto, seasonid, divisionid)),
		getTeams: index => dispatch(getTeams(index)),
		setGameIndex: index => dispatch(setGameIndex(index)),
		setTeamIndexById: id => dispatch(setTeamIndexById(id)),
		setLoading: (name, status) => dispatch(setLoading(name, status)),
	})
)(Games);

