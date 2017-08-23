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
	getGames,
	setGameIndex
} from "../../actions/games";

import Headerbar from '../headerbar';
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
	static navigationOptions = {
		header: <Headerbar title="Games"/>,
		tabBarLabel: 'Games' + navigation.state.params.team.name,
		tabBarIcon: ({ tintColor }) => <Icon name="ios-calendar" style={{color: tintColor}}/>
	};

	/**
	 *
	 * @type {{getSeasons}}
	 */
	static propTypes = {
		getGames: PropTypes.func,
		setGameIndex: PropTypes.func
	};

	/**
	 *
	 */
	componentDidMount()
	{
		console.log('Games::componentDidMount ' + parseInt(this.props.selectedTeam.id) );
		this.props.getGames(parseInt(this.props.selectedTeam.id));
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
		const {props: {name, index, list}} = this;
		return (
			<Container>
				<Content padder>
					{(this.props.games && this.props.games.length && this.props.games.length > 0) ?
						<Grid>
							{this.props.games.map((item, i) => (
								<Row key={item.id}>
									<Col style={{ padding: 10 }}>
										<TouchableOpacity onPress={() => this.clickGame(item) }>
											<Text>{item.name}</Text>
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
		getGames: (date, teamId) => dispatch(getGames(date, teamId)),
		setGameIndex: index => dispatch(setGameIndex(index)),
	};
}
const mapStateToProps = state => ({
	games: state.games.list,
	selectedTeam: state.teams.selectedIndex
});
const GamesSwagger = connect(mapStateToProps, bindAction)(Games);
export default GamesSwagger;

