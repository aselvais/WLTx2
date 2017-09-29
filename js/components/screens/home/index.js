import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {
	Container,
	Content,
	Icon,
} from "native-base";
import styles from "./styles";
import Btnteamselect from '../../widgets/btnteamselect/index';
import Headerbar from "../../widgets/headerbar/index";
import Teaminfo from "../../lists/teaminfo";
import Spinner from "../../widgets/loaders/Spinner";


/**
 *
 */
class Home extends Component
{

	/**
	 * Option for the TabNavigation system
	 * @type {{header: null, tabBarLabel: string, tabBarIcon: (function({tintColor?: *}): XML)}}
	 */
	static navigationOptions = ({navigation}) => ({
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
		let {team} = this.props;
		return (
			<Container style={styles.container}>
				<Content padder>
					<Spinner/>
					<Btnteamselect navigation={this.props.navigation}/>
					{
						(team && team.id) ?
							<Teaminfo/>
							:
							null
					}
				</Content>
			</Container>
		);
	}
}

export default connect(
	state => ({
		name: state.user.name,
		league: state.leagues.selectedIndex,
		season: state.seasons.selectedIndex,
		division: state.divisions.selectedIndex,
		team: state.teams.selectedIndex,
	}),
	dispatch => ({})
)(Home);
