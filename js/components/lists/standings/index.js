import React, {Component} from "react";
import PropTypes from 'prop-types';
import {
	TouchableOpacity,
	Text,
	View
} from "react-native";
import {connect} from "react-redux";
import {
	Grid,
	Row,
	Col
} from "react-native-easy-grid";
import {
	getStandings,
	resetStandings,
	setStandingIndex
} from "../../../redux/actions/standings";
import {
	setTeamIndexById,
} from "../../../redux/actions/teams";
import Spinner from '../../widgets/loaders/Spinner';
import {setLoading} from "../../../redux/actions/loading";


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
		setLoading: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
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
			this.props.setTeamIndexById(t);
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
				<Row key={u}>
					<Col size={1}><Text>{u}</Text></Col>
					<Col size={5}>
						<TouchableOpacity onPress={() => this.clickTeam(d.teamId)}>
							<Text>{d.teamName}</Text>
						</TouchableOpacity>
					</Col>
					<Col size={1}><Text>{d.gp}</Text></Col>
					<Col size={2}><Text>{d.win + '-' + d.lose + '-' + d.draw}</Text></Col>
					<Col size={1}><Text>{d.points}</Text></Col>
				</Row>
			);
		});

		return (
			<Grid>
				<Spinner/>
				<Row>
					<Col size={1}></Col>
					<Col size={5}><Text style={{fontWeight: 'bold'}}>Team</Text></Col>
					<Col size={1}><Text style={{fontWeight: 'bold'}}>GP</Text></Col>
					<Col size={2}><Text style={{fontWeight: 'bold'}}>W-L-T</Text></Col>
					<Col size={1}><Text style={{fontWeight: 'bold'}}>PTS</Text></Col>
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
				{(this.props.standings && this.props.standings.length && this.props.standings.length > 0) ?
					<Grid>
						{this.props.standings.map((item, i) => (
							<Row key={item.id}>
								<Col style={{padding: 10}}>
									<Text style={{fontWeight: 'bold', textAlign: 'center'}}>{item.name}</Text>
									{(item.name != '') ? this.getStandingsJsx(item.teamStandingLocalAPIModels) : null}
								</Col>
							</Row>
						))}
					</Grid>
					:
					null
				}
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
		setLoading: (name, status) => dispatch(setLoading(name, status)),
	})
)(Standings);
