import React, {Component} from "react";
import PropTypes from 'prop-types';
import {
	Image,
	TouchableOpacity,
	Text,
	View
} from "react-native";
import {connect} from "react-redux";
import {
	Container,
	Content,
	Icon,
	Button,
	H1,
	H2,
	Tabs,
	Tab
} from "native-base";
import {
	Grid,
	Row,
	Col
} from "react-native-easy-grid";
import moment from 'moment';
import {
	getGames,
	setGameIndex,
	getGamesDay
} from "../../../redux/actions/games";

import Headerbar from '../../widgets/headerbar/index';
import styles from "./styles";
import Btnteamselect from '../../widgets/btnteamselect/index';

/**
 *
 */
class Games extends Component
{
	/**
	 * Option for the TabNavigation system
	 * @type {{header: null, tabBarLabel: string, tabBarIcon: (function({tintColor?: *}): XML)}}
	 */
	static navigationOptions = ({ navigation }) => ({
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
		getGamesDay: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		let date = moment(this.props.sdate).format('YYYY-MM-DD');
		if (this.props && this.props.selectedTeam && this.props.selectedTeam.id)
		{
			this.props.getGames(date, parseInt(this.props.selectedTeam.id));
		}
		if (this.props && this.props.season && this.props.season.id && this.props.division && this.props.division.id)
		{
			this.props.getGamesDay(date, this.props.season.id, this.props.division.id);
		}
	}

	/**
	 *
	 * @param item
	 */
	clickGame(item)
	{
		this.props.setGameIndex(item);
		// this.props.navigation.navigate("Divisions", {game: item});
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

				<Col style={{margin: 10}}>
					<Grid style={{
						backgroundColor: '#FFFFFF',
						margin: 5,
						borderRadius: 5,
						borderBottomColor: '#AAAAAA',
						borderBottomWidth: 1,
						borderRightColor: '#AAAAAA',
						borderRightWidth: 1,
					}}>
						<Col size={2}>
							<Row>
								<Grid>
									<Row>
										<Col style={{width: 40, height: 40}}><Image style={{width: 30, height: 30}} source={{uri: item.info.team1.imageUrl}}/></Col>
										<Col><Text>{item.info.team1.teamName.toUpperCase()}</Text></Col>
									</Row>
								</Grid>
							</Row>
							<Row>
								<Grid>
									<Row>
										<Col style={{width: 40, height: 40}}><Image style={{width: 30, height: 30}} source={{uri: item.info.team2.imageUrl}}/></Col>
										<Col><Text>{item.info.team2.teamName.toUpperCase()}</Text></Col>
									</Row>
								</Grid>
							</Row>
						</Col>
						<Col size={1} style={{
							borderLeftColor: '#EEEEEE',
							borderLeftWidth: 1,
							paddingLeft: 5
						}}>
							<Row style={{
								borderBottomColor: '#EEEEEE',
								borderBottomWidth: 1,
								paddingTop: 5
							}}>
								<Text style={{ fontWeight: 'bold' }}>
									<Icon name="ios-time" style={{ fontSize: 15 }}/>
									{ '  ' + item.time}
								</Text>
							</Row>
							<Row style={{paddingTop: 5}}>
								<Text>
									<Icon name="ios-navigate" style={{ fontSize: 15 }}/>
									{'  ' + item.arena.name}
								</Text>
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
		let {sdate, league, season, division, team, games, gamesday, navigation} = this.props;
		//const {props: {name, index, list}} = this;
		return (
			<Container style={{
				backgroundColor: '#EEEEEE',
			}}>
				<Button style={{
				backgroundColor: '#DDD',
				width: '100%',
				borderRadius: 0,
				borderBottomColor: '#AAAAAA',
				borderBottomWidth: 1
			}} onPress={() => this.props.navigation.navigate("Divisions") }>
				<Grid>
					<Col style={{
						alignItems: 'center',
						alignSelf: 'center',
						justifyContent: 'center',
					}}><Text style={{ fontWeight: 'bold' }}>DIVISION: { division.name.toUpperCase() }</Text></Col>
					<Col style={{ width: 18 }}><Icon name="ios-arrow-forward" style={{ color: '#000000'}}/></Col>
				</Grid>
			</Button>
				<Button style={{
					backgroundColor: '#DDD',
					width: '100%',
					borderRadius: 0,
					borderBottomColor: '#AAAAAA',
					borderBottomWidth: 1
				}} onPress={() => this.props.navigation.navigate("Selectdate") }>
					<Grid>
						<Col style={{
							alignItems: 'center',
							alignSelf: 'center',
							justifyContent: 'center',
						}}><Text style={{ fontWeight: 'bold' }}>DATE: { moment(sdate).format('L') }</Text></Col>
						<Col style={{ width: 18 }}><Icon name="ios-arrow-forward" style={{ color: '#000000'}}/></Col>
					</Grid>
				</Button>
				<Content padder>
					{
						(gamesday && gamesday.length && gamesday.length > 0) ?
							<Grid>
								{gamesday.map((item, i) => this.getJsxGame(item) )}
							</Grid>
							:
							<View>
								<Text>No game on the {moment(sdate).format('L')}</Text>
							</View>
					}
				</Content>
			</Container>
		);
	}
}

// export default Games;

function bindAction(dispatch)
{
	return {
		getGames: (date, teamid) => dispatch(getGames(date, teamid)),
		getGamesDay: (date, seasonid, divisionid) => dispatch(getGamesDay(date, seasonid, divisionid)),
		setGameIndex: index => dispatch(setGameIndex(index)),
	};
}

const mapStateToProps = state => ({
	games: state.games.list,
	gamesday: state.games.listday,
	selectedTeam: state.teams.selectedIndex,
	league: state.leagues.selectedIndex,
	season: state.seasons.selectedIndex,
	division: state.divisions.selectedIndex,
	team: state.teams.selectedIndex,
	sdate: state.selecteddate.sdate,
});
const GamesSwagger = connect(mapStateToProps, bindAction)(Games);
export default GamesSwagger;

