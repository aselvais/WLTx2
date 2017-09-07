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
import {
	setTeamIndexById,
	getTeams
} from "../../../redux/actions/teams";

import Headerbar from '../../widgets/headerbar/index';
import styles from "./styles";

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
		getTeams: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		let date = moment(this.props.sdate).format('YYYY-MM-DD');
		if (this.props.division && this.props.division.id)
			this.props.getTeams(parseInt(this.props.division.id));
		if (this.props && this.props.selectedTeam && this.props.selectedTeam.id) {
			this.props.getGames(date, parseInt(this.props.selectedTeam.id));
		}
		if (this.props && this.props.season && this.props.season.id && this.props.division && this.props.division.id) {
			this.props.getGamesDay(date, this.props.season.id, this.props.division.id);
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
			this.props.navigation.navigate(routeName);
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
		let {sdate, league, season, division, team, games, gamesday, navigation} = this.props;
		//const {props: {name, index, list}} = this;
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
										<Text style={{fontWeight: 'bold'}}>{division.name.toUpperCase()}</Text>
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
							{
								(gamesday && gamesday.length && gamesday.length > 0) ?
									<Grid>
										{gamesday.map((item, i) => this.getJsxGame(item))}
									</Grid>
									:
									<View>
										<Text>No game on the {moment(sdate).format('L')}</Text>
									</View>
							}
						</Content>
					</Row>
				</Grid>
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
		getTeams: index => dispatch(getTeams(index)),
		setGameIndex: index => dispatch(setGameIndex(index)),
		setTeamIndexById: id => dispatch(setTeamIndexById(id)),
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

