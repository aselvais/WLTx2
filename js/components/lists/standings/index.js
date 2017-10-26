import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, View, Image} from "react-native";
import {connect} from "react-redux";
import {Col, Grid, Row} from "react-native-easy-grid";
import {getStandings, resetStandings, setStandingIndex} from "../../../redux/actions/standings";
import {setTeamIndexById,} from "../../../redux/actions/teams";
import {setTeaminfoIndex,} from "../../../redux/actions/teaminfo";
import Spinner from '../../widgets/loaders/Spinner';
import {setLoading} from "../../../redux/actions/loading";
import styles from "./styles";
import Orientation from 'react-native-orientation';
import colors from '../../../libs/Wltcolors';

/**
 *
 */
class Standings extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({navigation}) => ({
		title: 'Select a standing'
	});

	/**
	 *
	 * @type {{getStandings}}
	 */
	static propTypes = {
		getStandings: PropTypes.func,
		resetStandings: PropTypes.func,
		setStandingIndex: PropTypes.func,
		setTeamIndexById: PropTypes.func,
		setTeaminfoIndex: PropTypes.func,
		setLoading: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		Orientation.lockToPortrait();
		if (this.props.selectedDivisions && this.props.selectedDivisions.id)
		{
			this.props.setLoading('standings', true);
			this.props.resetStandings();
			this.props.getStandings(
				parseInt(this.props.selectedDivisions.id),
				((this.props.selectedTiers && this.props.selectedTiers.id) ? this.props.selectedTiers.id : 0)
			).then(
				() => this.props.setLoading('standings', false),
				() => this.props.setLoading('standings', false)
			);
		}
	}


	/**
	 *
	 * @param item
	 */
	clickStanding(item)
	{
		this.props.setStandingIndex(item);
		this.props.navigation.navigate("Teams", {standing: item});
	}

	/**
	 *
	 * @param t
	 */
	clickTeam(t)
	{
		if (t > 0)
		{
			// this.props.setTeamIndexById(t);
			this.props.setTeaminfoIndex(t);
			this.props.navigation.navigate("Teaminfo");
		}
	}

	/**
	 *
	 * @param d
	 * @returns {Array}
	 */
	getStandingsJsx(el)
	{
		let jsx = [];
		let u = 0;

		el.map((d) =>
		{
			u++;
			jsx.push(
				<TouchableOpacity key={u} onPress={() => this.clickTeam(d.teamId)}>
					<Row key={u} style={{
						backgroundColor: (u%2) ? colors.white : colors.lightgrey
					}}>
						<Col size={1}>
							<Text style={styles.txtItem}>{u}</Text>
						</Col>
						<Col size={1}>
							<Image style={styles.logoTeam} source={{uri: d.imageUrl}}/>
						</Col>
						<Col size={4}>
							<Text style={styles.txtItem}>{d.teamName}</Text>
						</Col>
						<Col size={1}><Text style={styles.txtItem}>{d.gp}</Text></Col>
						<Col size={2}><Text style={styles.txtItem}>{d.win + '-' + d.lose + '-' + d.draw}</Text></Col>
						<Col size={1}><Text style={styles.txtItem}>{d.points}</Text></Col>
					</Row>
				</TouchableOpacity>
			);
		});

		return (
			<Grid style={styles.griditemBottom}>
				<Row style={styles.titleRow}>
					<Col size={6}><Text style={styles.titleline}>TEAM</Text></Col>
					<Col size={1}><Text style={styles.titleline}>GP</Text></Col>
					<Col size={2}><Text style={styles.titleline}>W-L-T</Text></Col>
					<Col size={1}><Text style={styles.titleline}>PTS</Text></Col>
				</Row>
				{jsx}
			</Grid>
		);
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		let u = 0;

		return (
			<View>
				{this.props.standings.map((item, i) => (
					<Grid key={item.id} style={styles.griditem}>
						<Row style={styles.griditemTop}>
							<Col>
								{(item.name) ? <Text style={styles.topText}>{item.name.toUpperCase()}</Text> : null}
								{(item.name != '') ? this.getStandingsJsx(item.teamStandingLocalAPIModels) : null}
							</Col>
						</Row>
					</Grid>
				))}
			</View>
		);
	}
}

export default connect(
	state => ({
		standings: state.standings.list,
		selectedStanding: state.standings.selectedIndex,
		selectedDivisions: state.divisions.selectedIndex,
		selectedTiers: (state.tiers.list && state.tiers.list[0]) ? state.tiers.list[0] : null
	}),
	dispatch => ({
		getStandings: (divisionids, tierid) => dispatch(getStandings(divisionids, tierid)),
		resetStandings: () => dispatch(resetStandings()),
		setStandingIndex: index => dispatch(setStandingIndex(index)),
		setTeamIndexById: id => dispatch(setTeamIndexById(id)),
		setTeaminfoIndex: id => dispatch(setTeaminfoIndex(id)),
		setLoading: (name, status) => dispatch(setLoading(name, status)),
	})
)(Standings);
