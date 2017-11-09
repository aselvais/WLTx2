import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Text, View} from "react-native";
import {Button, Container, Content, Icon,} from "native-base";
import {Col, Grid, Row} from "react-native-easy-grid";
import moment from 'moment';
import {getGamesAll, setGameIndex} from "../../../redux/actions/games";
import {getTeams, setTeamIndexById} from "../../../redux/actions/teams";
import {setTeaminfoIndex} from "../../../redux/actions/teaminfo";
import {setLoading} from "../../../redux/actions/loading";
import Headerbar from '../../widgets/headerbar/index';
import styles from "./styles";
import Spinner from '../../widgets/loaders/Spinner';
import Gameitem from './gameitem';

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
		setTeaminfoIndex: PropTypes.func,
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
		let {season, division, setLoading, getGamesAll, sdatefrom, sdateto} = this.props;
		if (season && season.id && division && division.id && sdatefrom && sdateto && sdatefrom.getTime && sdateto.getTime)
		{
			setLoading('games', true);
			getGamesAll(sdatefrom.getTime(), sdateto.getTime(), season.id, division.id).then(
				() => setLoading('games', false),
				() => setLoading('games', false)
			);
		}
	}

	/**
	 *
	 * @param item
	 */
	clickGame(item, routeName = null)
	{
		let {setGameIndex, navigation} = this.props;
		setGameIndex(item);
		if (routeName)
		{
			navigation.navigate(routeName);
		}
	}

	/**
	 *
	 * @param gamesday
	 * @returns {*}
	 */
	getMatchListJsx(gamesday)
	{
		if (gamesday && gamesday.length && gamesday.length > 0)
		{
			let ddmOld = null;
			let ddm = null;
			let jsx = [];
			gamesday.map((item, i) =>
			{
				try
				{
					ddm = moment(item.dateTime).format('dddd, MMMM Do YYYY');
					// ddm = item.dateTime;
				} catch (er)
				{
					// date manipulation failed...
				}
				if (ddm != ddmOld)
				{
					jsx.push(<Text key={ddm} style={styles.dateTxt}>{ddm}</Text>);
				}
				jsx.push(<Row key={item.id} onPress={() => this.clickGame(item, "Gameinfo")}>
					<Gameitem key={item.id} item={item}/></Row>);
				ddmOld = ddm;
			});
			return (<Grid key="m01">{jsx}</Grid>);
		}
		return null;
	}

	/**
	 *
	 * @returns {XML}
	 */
	getDropDownJsx()
	{
		let {sdate, division, navigation} = this.props;

		return (
			<Row style={styles.rowTop}>
				<Col size={1}>
					<Button style={styles.topbutton}
							onPress={() => navigation.navigate("Divisions")}>
						<Grid>
							<Col style={styles.topbntcol}>
								<Text style={styles.txtBold}>DIVISION:</Text>
								<Text style={styles.txtBold}>
									{(division && division.name) ? division.name.toUpperCase() : null}
								</Text>
							</Col>
							<Col style={styles.col2}>
								<Icon name="ios-arrow-forward" style={{color: '#000000'}}/>
							</Col>
						</Grid>
					</Button>
				</Col>
				<Col size={1}>
					<Button style={styles.topbutton}
							onPress={() => navigation.navigate("Selectdate")}>
						<Grid>
							<Col style={styles.topbntcol}>
								<Text style={styles.txtBold}>DATE:</Text>
								<Text style={styles.txtBold}>{moment(sdate).format('L')}</Text>
							</Col>
							<Col style={styles.col2}>
								<Icon name="ios-arrow-forward" style={{color: '#000000'}}/>
							</Col>
						</Grid>
					</Button>
				</Col>
			</Row>
		);
	}

	/**
	 *
	 * @returns {Array}
	 */
	getJsxContent()
	{
		let {sdatefrom, sdateto, gamesday, loading} = this.props;
		let jsx = [];

		jsx.push(this.getMatchListJsx(gamesday));

		if (!loading && !(gamesday && gamesday.length && gamesday.length > 0))
		{
			jsx.push(<View key="m02" style={styles.griditem}>
					<Text style={{textAlign: 'center'}}>
						No game or data from{"\n"}
						{moment(sdatefrom).format('L')}{"\n"}
						to{"\n"}
						{moment(sdateto).format('L')}{"\n"}
					</Text>
				</View>
			);
		}
		return jsx;
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		let {sdatefrom, sdateto, gamesday, loading} = this.props;

		return (
			<Container style={styles.container}>
				<Grid>
					{this.getDropDownJsx()}
					<Row>
						<Content>
							{ (loading) ? <Spinner/> : this.getJsxContent()}
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
		setTeaminfoIndex: id => dispatch(setTeaminfoIndex(id)),
		setLoading: (name, status) => dispatch(setLoading(name, status)),
	})
)(Games);

