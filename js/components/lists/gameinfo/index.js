import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Image} from "react-native";
import {Button, Container, Content, H2, H3, Text} from "native-base";
import {Col, Grid, Row} from "react-native-easy-grid";
import moment from 'moment';
import {setTeamIndexById} from "../../../redux/actions/teams";
import openMap from 'react-native-open-maps';
import Spinner from '../../widgets/loaders/Spinner';
import styles from "./styles";

/**
 *
 */
class Gameinfo extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({navigation}) => ({
		title: 'Game info'
	});

	/**
	 *
	 * @type {{getDivisions}}
	 */
	static propTypes = {
		setTeamIndexById: PropTypes.func,
	};

	/**
	 *
	 */
	openMaps()
	{
		const {game} = this.props;
		openMap({latitude: game.arena.latitude, longitude: game.arena.longitude});
	}

	/**
	 *
	 * @param t
	 */
	openTeam(t)
	{
		if (t > 0)
		{
			this.props.setTeamIndexById(t);
			this.props.navigation.navigate("Teaminfo");
		}
	}

	/**
	 *
	 */
	addToCalendar()
	{
		// see https://github.com/wmcmahan/react-native-calendar-events to make it work
	}

	/**
	 *
	 * @param d
	 * @returns {XML}
	 */
	getJsxRow(k, v)
	{
		return (
			<Row>
				<Col size={1}><Text style={styles.col1Text}>{k}</Text></Col>
				<Col size={2}><Text>{v}</Text></Col>
			</Row>
		);
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		const {game} = this.props;

		return (
			<Container>
				<Spinner/>
				<Content padder>
					<Grid>
						<Row><Col style={styles.colTitle}><H2>Game (Header)</H2></Col></Row>
						<Row>
							<Col>
								<Grid>
									<Row>
										<Col><Button onPress={() => this.addToCalendar()}>
											<Text>Add to calendar</Text>
										</Button></Col>
									</Row>
									{this.getJsxRow('Date', moment(game.dateTime).format('MMMM Do YYYY'))}
									{this.getJsxRow('Time', game.time)}
									{this.getJsxRow('Division', game.divisionName)}
									{this.getJsxRow('League', game.leagueName)}
									{this.getJsxRow('League Timezone', game.leagueTimezone)}
									{this.getJsxRow('linkStreamVideo', game.linkStreamVideo)}
									{this.getJsxRow('Season', game.seasonName)}
									{this.getJsxRow('PlayOff', game.seasonPlayOff)}
									{this.getJsxRow('ShareUrl', game.shareUrl)}
									{this.getJsxRow('Status', game.status)}
									{this.getJsxRow('Type', game.type)}
								</Grid>
							</Col>
						</Row>
					</Grid>

					<Grid>

						<Row>
							<Col>
								<Grid>
									<Row><Col style={styles.colTitle}><H3>Team 1</H3></Col></Row>
									<Row>
										<Col><Image style={styles.image}
													source={{uri: game.info.team1.imageUrl}}/></Col>
									</Row>
									{this.getJsxRow('Home', game.info.team1.home)}
									{this.getJsxRow('News', game.info.team1.news)}
									{this.getJsxRow('Score', game.info.team1.score)}
									{this.getJsxRow('Name', game.info.team1.teamName)}
									{this.getJsxRow('Tweets', game.info.team1.tweets)}
									<Row>
										<Col><Button onPress={() => this.openTeam(game.info.team1.teamId)}>
											<Text>View team</Text>
										</Button></Col>
									</Row>
								</Grid>
							</Col>
							<Col>
								<Grid>
									<Row><Col style={styles.colTitle}><H3>Team 2</H3></Col></Row>
									<Row>
										<Col><Image style={styles.image}
													source={{uri: game.info.team2.imageUrl}}/></Col>
									</Row>
									{this.getJsxRow('Home', game.info.team2.home)}
									{this.getJsxRow('News', game.info.team2.news)}
									{this.getJsxRow('Score', game.info.team2.score)}
									{this.getJsxRow('TeamName', game.info.team2.teamName)}
									{this.getJsxRow('Tweets', game.info.team2.tweets)}
									<Row>
										<Col><Button onPress={() => this.openTeam(game.info.team2.teamId)}>
											<Text>View team</Text>
										</Button></Col>
									</Row>
								</Grid>
							</Col>
						</Row>

					</Grid>

					<Grid>
						<Row><Col style={styles.colTitle}><H2>Arena</H2></Col></Row>
						{this.getJsxRow('Name', game.arena.name)}
						{this.getJsxRow('Address', game.arena.address)}
						<Row>
							<Col size={1}><Text style={styles.col1Text}>Map</Text></Col>
							<Col size={2}><Button onPress={() => this.openMaps()}><Text>Open Map</Text></Button></Col>
						</Row>
					</Grid>


				</Content>
			</Container>
		);
	}
}

export default connect(
	state => ({game: state.games.selectedIndex}),
	dispatch => ({
		setTeamIndexById: id => dispatch(setTeamIndexById(id)),
	})
)(Gameinfo);
