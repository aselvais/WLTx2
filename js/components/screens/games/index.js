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
// 	getGamesDay
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
//		getGamesDay: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		let date = moment().format('YYYY-MM-DD');
		if (this.props && this.props.selectedTeam && this.props.selectedTeam.id)
		{
			this.props.getGames(date, parseInt(this.props.selectedTeam.id));
			// this.props.getGamesDay(date, this.props.season.id, this.props.division.id);
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

		let itms = [];
		let c = 0;

		for (let i in item)
		{
			if (typeof item[i] == 'string')
			{
				itms.push(<Text key={c++}>{i} : {item[i]}</Text>);
			}
		}

		return (
			<Row key={item.id}>
				<Col style={{padding: 10}}>
					<TouchableOpacity onPress={() => this.clickGame(item)}>
						<H2>{(item.team) ? item.team : ''}</H2>
					</TouchableOpacity>
					{itms}
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
		let {league, season, division, team, games, navigation} = this.props;
		const {props: {name, index, list}} = this;
		return (
			<Container style={{
				backgroundColor: '#FFFFFF',
			}}>
				<Button style={{
					backgroundColor: '#DDD',
					width: '100%',
					borderRadius: 0,
					alignItems: 'center',
					alignSelf: 'center',
					justifyContent: 'center',
					borderBottomColor: '#000'
				}} onPress={() => navigation.navigate("Teams")}>
					<Icon name="ios-create"/><Text>Filter on a team</Text>
				</Button>

				<Tabs initialPage={1}>
					<Tab heading="Past">
						<Content padder>
							{
								(games && games.past && games.past.length && games.past.length > 0) ?
									<Grid>
										{games.past.map((item, i) => this.getJsxGame(item) )}
									</Grid>
									:
									<View>
										<Text>No data ...</Text>
									</View>
							}
						</Content>
					</Tab>
					<Tab heading="Today">
						<Content padder>
							{
								(games && games.today && games.today.length && games.today.length > 0) ?
									<Grid>
										{games.today.map((item, i) => this.getJsxGame(item) )}
									</Grid>
									:
									<View>
										<Text>No game today or no data ...</Text>
									</View>
							}
						</Content>
					</Tab>
					<Tab heading="Upcoming">
						<Content padder>
							{
								(games && games.upcoming && games.upcoming.length && games.upcoming.length > 0) ?
									<Grid>
										{games.upcoming.map((item, i) => this.getJsxGame(item) )}
									</Grid>
									:
									<View>
										<Text>No data ...</Text>
									</View>
							}
						</Content>
					</Tab>
				</Tabs>
			</Container>
		);
	}
}

// export default Games;

function bindAction(dispatch)
{
	return {
		getGames: (date, teamid) => dispatch(getGames(date, teamid)),
		// getGamesDay: (date, seasonid, divisionid) => dispatch(getGamesDay(date, seasonid, divisionid)),
		setGameIndex: index => dispatch(setGameIndex(index)),
	};
}

const mapStateToProps = state => ({
	games: state.games.list,
	selectedTeam: state.teams.selectedIndex,
	league: state.leagues.selectedIndex,
	season: state.seasons.selectedIndex,
	division: state.divisions.selectedIndex,
	team: state.teams.selectedIndex,
});
const GamesSwagger = connect(mapStateToProps, bindAction)(Games);
export default GamesSwagger;

