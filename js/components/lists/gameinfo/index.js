import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Image, Text, TouchableHighlight} from "react-native";
import {Container, Content} from "native-base";
import {Col, Grid, Row} from "react-native-easy-grid";
import moment from 'moment';
import {setTeamIndexById} from "../../../redux/actions/teams";
import {setTeaminfoIndex} from "../../../redux/actions/teaminfo";
import openMap from 'react-native-open-maps';
import Spinner from '../../widgets/loaders/Spinner';
import styles from "./styles";

const coverimg = require('../../../../images/gamebackgroundblack.jpg');

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
		setTeaminfoIndex: PropTypes.func,
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
			//this.props.setTeamIndexById(t);
			this.props.setTeaminfoIndex(t);
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
		let retJsx = [];
		retJsx.push(<Row key={k + '01'}><Col size={2} style={styles.rowTxt01}><Text
			style={styles.txtTxt01}>{k.toUpperCase()}</Text></Col></Row>);
		retJsx.push(<Row key={k + '02'}><Col size={2} style={styles.rowTxt02}><Text
			style={styles.txtTxt02}>{v}</Text></Col></Row>);
		return retJsx;
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		const {game} = this.props;
		/*
		 {this.getJsxRow('PlayOff', game.seasonPlayOff)}
		 {this.getJsxRow('ShareUrl', game.shareUrl)}
		 {this.getJsxRow('Status', game.status)}
		 {this.getJsxRow('Type', game.type)}
		 */
		return (
			<Container>
				<Grid>
					<Row size={25} style={styles.row01}>
						<Col>
							<Image source={coverimg} style={styles.backgroundImage}>
								<Row size={40}>
									<Col size={45} style={{justifyContent: 'center', alignItems: 'center'}}>
										<TouchableHighlight style={{justifyContent: 'center', alignItems: 'center'}}
															onPress={() => this.openTeam(game.info.team1.teamId)}>
											<Image style={styles.imageLogo} source={{uri: game.info.team1.imageUrl}}/>
										</TouchableHighlight>
									</Col>
									<Col size={10} style={{alignItems: 'center'}}>
									</Col>
									<Col size={45} style={{justifyContent: 'center', alignItems: 'center'}}>
										<TouchableHighlight style={{justifyContent: 'center', alignItems: 'center'}}
															onPress={() => this.openTeam(game.info.team2.teamId)}>
											<Image style={styles.imageLogo} source={{uri: game.info.team2.imageUrl}}/>
										</TouchableHighlight>
									</Col>
								</Row>
								<Row size={20}>
									<Col size={45} style={{alignItems: 'center'}}>
										<TouchableHighlight onPress={() => this.openTeam(game.info.team1.teamId)}>
											<Text
												style={styles.row01textName}>{game.info.team1.teamName.toUpperCase()}</Text>
										</TouchableHighlight>
									</Col>
									<Col size={10} style={{alignItems: 'center'}}>
										<Text style={styles.row01textDivName}>vs</Text>
									</Col>
									<Col size={45} style={{alignItems: 'center'}}>
										<TouchableHighlight onPress={() => this.openTeam(game.info.team2.teamId)}>
											<Text
												style={styles.row01textName}>{game.info.team2.teamName.toUpperCase()}</Text>
										</TouchableHighlight>
									</Col>
								</Row>
								<Row size={25}>
									<Col size={45} style={{alignItems: 'center'}}>
										<Text style={styles.row01textScore}>{game.info.team1.score}</Text>
									</Col>
									<Col size={10} style={{alignItems: 'center'}}>
									</Col>
									<Col size={45} style={{alignItems: 'center'}}>
										<Text style={styles.row01textScore}>{game.info.team2.score}</Text>
									</Col>
								</Row>
							</Image>
						</Col>
					</Row>
					<Row size={5}>
						<Col size={50} style={styles.topButtonsCol}>
							<TouchableHighlight onPress={() => this.addToCalendar()}>
								<Text style={styles.topButtonsTxt}>Add to calendar</Text>
							</TouchableHighlight>
						</Col>
						<Col size={50} style={styles.topButtonsCol}>
							<TouchableHighlight onPress={() => this.openMaps()}>
								<Text style={styles.topButtonsTxt}>Open maps</Text>
							</TouchableHighlight>
						</Col>
					</Row>
					<Row size={70}>
						<Spinner/>
						<Content padder>
							<Grid>
								<Row>
									<Col>
										<Grid>
											{this.getJsxRow('Date / time', moment(game.dateTime).format('MMMM Do YYYY') + ' ' + game.time)}
											{this.getJsxRow('Arena', game.arena.name + ' ' + game.arena.address)}
											{this.getJsxRow('League', game.leagueName)}
											{this.getJsxRow('Season', game.seasonName)}
											{this.getJsxRow('Division', game.divisionName)}
										</Grid>
									</Col>
								</Row>
							</Grid>
						</Content>
					</Row>
				</Grid>
			</Container>
		);
	}
}

export default connect(
	state => ({game: state.games.selectedIndex}),
	dispatch => ({
		setTeamIndexById: id => dispatch(setTeamIndexById(id)),
		setTeaminfoIndex: id => dispatch(setTeaminfoIndex(id)),
	})
)(Gameinfo);
