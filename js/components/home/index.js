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

import {
	getLeagues,
	setLeagueIndex
} from "../../actions/leagues";

import styles from "./styles";

// screens
import Headerbar from "../headerbar";

/**
 *
 */
class Home extends Component
{

	/**
	 * Option for the TabNavigation system
	 * @type {{header: null, tabBarLabel: string, tabBarIcon: (function({tintColor?: *}): XML)}}
	 */
	static navigationOptions =  ({ navigation }) => ({
		header: <Headerbar title="Home" navigation={navigation}/>,
		tabBarLabel: 'Home',
		tabBarIcon: ({tintColor}) => <Icon style={{color: tintColor}} name="ios-home"/>
	});

	/**
	 *
	 * @type {{name, getLeagues}}
	 */
	static propTypes = {
		name: PropTypes.string,
	};

	/**
	 *
	 */
	componentDidMount()
	{
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		let {league, season, division, team} = this.props;
		return (
			<Container style={styles.container}>
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
					<Text>League > Season > Division > Team</Text>
				</Button>
				<Content>
					<Text onPress={ () => this.props.navigation.navigate("Leagues") }>League : { (league && league.name) ? league.name : ''} </Text>
					<Text onPress={ () => this.props.navigation.navigate("Seasons") }>Season : { (season && season.name) ? season.name : ''} </Text>
					<Text onPress={ () => this.props.navigation.navigate("Divisions") }>Division : { (division && division.name) ? division.name : ''} </Text>
					<Text onPress={ () => this.props.navigation.navigate("Teams") }>Team : { (team && team.name) ? team.name : ''} </Text>
				</Content>
			</Container>
		);
	}
}

function bindAction(dispatch)
{
	return {
	};
}
const mapStateToProps = state => ({
	name: state.user.name,
	league: state.leagues.selectedIndex,
	season: state.seasons.selectedIndex,
	division: state.divisions.selectedIndex,
	team: state.teams.selectedIndex,
});
const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
export default HomeSwagger;
