import React, {Component} from "react";
import PropTypes from 'prop-types';
import {
	Image,
	TouchableOpacity
} from "react-native";
import {connect} from "react-redux";
import {
	Container,
	Content,
	Text,
	Icon,
	Button
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
	static navigationOptions = {
		header: <Headerbar title="Games"/>,
		tabBarLabel: 'Games',
		tabBarIcon: ({ tintColor }) => <Icon name="ios-calendar" style={{color: tintColor}}/>
	};

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
		// let date = moment().format('YYYY-MM-DD');
		let date = "2017-09-08";
		if (this.props && this.props.selectedTeam && this.props.selectedTeam.id) {
			this.props.getGames( date, parseInt(this.props.selectedTeam.id) );
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
	 * @returns {XML}
	 */
	render()
	{
		let {league, season, division, team} = this.props;
		const {props: {name, index, list}} = this;
		return (
			<Container style={{
				backgroundColor: '#FFFFFF',
			}}>
				<Button
					style={{
						backgroundColor: '#DDD',
						width: '100%',
						borderRadius: 0,
						alignItems: 'center',
						alignSelf: 'center',
						justifyContent: 'center',
						borderBottomColor: '#000'
					}}
					onPress={ () => this.props.navigation.navigate("Leagues") }
				>
					<Text>{ (team && team.name) ? 'Change team' : 'Choose a team'}</Text>
				</Button>
				<Content padder>
					<Btnteamselect navigation={this.props.navigation} />
					{(this.props.games && this.props.games.upcoming && this.props.games.upcoming.length && this.props.games.upcoming.length > 0) ?
						<Grid>
							{this.props.games.upcoming.map((item, i) => (
								<Row key={item.id}>
									<Col style={{ padding: 10 }}>
										<TouchableOpacity onPress={() => this.clickGame(item) }>
											<Text>{item.team}</Text>
										</TouchableOpacity>
									</Col>
								</Row>
							))}
						</Grid>
						:
						null
					}
					{
						(this.props.games && this.props.games.message) ?
							<Text>{this.props.games.message}</Text>
							:
							null
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
	selectedTeam: state.teams.selectedIndex,
	league: state.leagues.selectedIndex,
	season: state.seasons.selectedIndex,
	division: state.divisions.selectedIndex,
	team: state.teams.selectedIndex,
});
const GamesSwagger = connect(mapStateToProps, bindAction)(Games);
export default GamesSwagger;

