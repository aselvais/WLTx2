import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {
	Container,
	Content,
	Text,
	Icon,
	Button
} from "native-base";

import styles from "./styles";
import Btnteamselect from '../../widgets/btnteamselect/index';
// screens
import Headerbar from "../../widgets/headerbar/index";

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
				<Content padder>
					<Btnteamselect navigation={this.props.navigation} />
				</Content>

			</Container>
		);
	}
}

function bindAction(dispatch)
{
	return {};
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
