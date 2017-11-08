import React, {Component} from "react";
import {connect} from "react-redux";
import {Text} from "react-native";
import {Button, Icon} from "native-base";
import {Col, Grid, Row} from "react-native-easy-grid";
import styles from "./styles";

/**
 *
 */
class Btnteamselect extends Component
{
	/**
	 *
	 * @returns {}
	 */
	getData()
	{
		let {league, season, division, team} = this.props;
		return {
			league: {label: "league", route: "Leagues", item: league},
			season: {label: "season", route: "Seasons", item: season},
			division: {
				label: "division",
				route: "Divisions",
				item: division,
				func: 'getTier | getTeamStandingLocalTierGroup'
			},
			//team: {label: "team", route: "Teams", item: team, func: 'getFeedNews | getFeedTwitter | getTeamInfo'},
		};
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		let {navigation} = this.props;
		let data = this.getData();
		let toret = [];
		let k = 0;
		for (let i in data)
		{
			if (!data[i].item || !data[i].item.name)
			{
				toret.push(
					<Row key={data[i].label + ++k}>
						<Col size={5}>
							<Button style={styles.btn} onPress={() => navigation.navigate(data[i].route)}>
								<Icon color="#000000" name="ios-create"/><Text>Choose a {data[i].label}</Text>
							</Button>
						</Col>
					</Row>
				);
				break;
			}
			else if (data[i].item && data[i].item.name)
			{
				toret.push(
					<Row key={data[i].label + ++k} style={styles.rowLabel}
						 onPress={() => navigation.navigate(data[i].route)}>
						<Col size={90}>
							<Text style={styles.label}>{data[i].label.toUpperCase()}</Text>
						</Col>
						<Col size={8} style={{justifyContent: 'center',alignItems: 'center'}}>
							<Icon name="ios-arrow-forward" fontSize={10}/>
						</Col>
					</Row>
				);
				toret.push(
					<Row key={data[i].label + ++k}>
						<Col size={4}><Text style={styles.name}>{data[i].item.name} </Text></Col>
						<Col size={1}></Col>
					</Row>
				);
			}
		}
		return (<Grid>{toret}</Grid>)
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
)(Btnteamselect);
