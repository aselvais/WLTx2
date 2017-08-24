import React, {Component} from "react";
import {connect} from "react-redux";
import {
	View,
	Text
} from "native-base";

/**
 *
 */
class Btnteamselect extends Component
{

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		let {league, season, division, team} = this.props;
		return (
			<View style={{ backgroundColor: '#DDD' }}>
				<Text onPress={ () => this.props.navigation.navigate("Leagues") }>League : { (league && league.name) ? league.name : ''} </Text>
				<Text onPress={ () => this.props.navigation.navigate("Seasons") }>Season : { (season && season.name) ? season.name : ''} </Text>
				<Text onPress={ () => this.props.navigation.navigate("Divisions") }>Division : { (division && division.name) ? division.name : ''} </Text>
				<Text onPress={ () => this.props.navigation.navigate("Teams") }>Team : { (team && team.name) ? team.name : ''} </Text>
			</View>
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
const BtnteamselectSwagger = connect(mapStateToProps, bindAction)(Btnteamselect);
export default BtnteamselectSwagger;