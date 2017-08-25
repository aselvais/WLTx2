import React, {Component} from "react";
import {connect} from "react-redux";
import {
	View,
	Text,
	Button
} from "native-base";
import {
	Grid,
	Row,
	Col
} from "react-native-easy-grid";
import styles from "./styles";

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
		let {league, season, division, team, navigation} = this.props;
		return (
			<Grid>
				{
					(!league || !league.name) ?
						(<Row>
								<Col size={5}>
									<Button style={styles.btn} onPress={ () => navigation.navigate("Leagues") }>
										<Text>Choose a league</Text>
									</Button>
								</Col>
							</Row>
						)
						:
						(<Row>
								<Col size={1}>
									<Text onPress={ () => navigation.navigate("Leagues") }>League</Text>
								</Col>
								<Col size={3}>
									<Text>{ (league && league.name) ? league.name : ''} </Text>
								</Col>
								<Col size={1}>
									<Text>X</Text>
								</Col>
							</Row>
						)
				}
				{
					((league && league.name) && (!season || !season.name)) ?
						(<Row>
								<Col size={5}>
									<Button style={styles.btn} onPress={() => navigation.navigate("Leagues")}>
										<Text>Choose a season</Text>
									</Button>
								</Col>
							</Row>
						)
						:
						(
							<Row>
								<Col size={1}>
									<Text onPress={() => navigation.navigate("Seasons")}>Season</Text>
								</Col>
								<Col size={3}>
									<Text>{(season && season.name) ? season.name : ''} </Text>
								</Col>
								<Col size={1}>
									<Text>X</Text>
								</Col>
							</Row>
						)
				}
				{
					((league && league.name && season && season.name) && (!division || !division.name)) ?
						(<Row>
								<Col size={5}>
									<Button style={styles.btn} onPress={() => navigation.navigate("Leagues")}>
										<Text>Choose a division</Text>
									</Button>
								</Col>
							</Row>
						)
						:
						(
						<Row>
							<Col size={1}>
							<Text onPress={ () => navigation.navigate("Divisions") }>Division</Text>
							</Col>
							<Col size={3}>
								<Text>{ (division && division.name) ? division.name : ''} </Text>
							</Col>
							<Col size={1}>
								<Text>X</Text>
							</Col>
						</Row>
						)
				}
				{
					((league && league.name && season && season.name && division && division.name) && (!team || !team.name)) ?
						(<Row>
								<Col size={5}>
									<Button style={styles.btn} onPress={() => navigation.navigate("Leagues")}>
										<Text>Choose a team</Text>
									</Button>
								</Col>
							</Row>
						)
						:
						(<Row>
							<Col size={1}>
								<Text onPress={() => navigation.navigate("Teams")}>Team</Text>
							</Col>
							<Col size={3}>
								<Text>{(team && team.name) ? team.name : ''} </Text>
							</Col>
							<Col size={1}>
								<Text>X</Text>
							</Col>
						</Row>)
				}



			</Grid>
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