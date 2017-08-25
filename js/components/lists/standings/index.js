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
	getStandings,
	setStandingIndex
} from "../../../redux/actions/standings";

import {resetTeams} from "../../../redux/actions/teams";

/**
 *
 */
class Standings extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({ navigation }) => ({
		title: 'Select a standing'
	});

	/**
	 *
	 * @type {{getStandings}}
	 */
	static propTypes = {
		getStandings: PropTypes.func,
		setStandingIndex: PropTypes.func,
		resetTeams: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		console.log('Standings::componentDidMount ' + parseInt(this.props.selectedSeason.id) );
		this.props.getStandings(parseInt(this.props.selectedSeason.id));
	}


	/**
	 *
	 * @param item
	 */
	clickStanding(item)
	{
		if (this.props.selectedStanding && this.props.selectedStanding.id != item.id)
		{
			this.props.resetTeams();
		}
		this.props.setStandingIndex(item);
		this.props.navigation.navigate("Teams", {standing: item});
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		// const params = this.props.navigation.state.params;
		return (
			<Container>
				<Content padder>
					{(this.props.standings && this.props.standings.length && this.props.standings.length > 0) ?
						<Grid>
							{this.props.standings.map((item, i) => (
								<Row key={item.id}>
									<Col style={{ padding: 10 }}>
										<TouchableOpacity onPress={() => this.clickStanding(item) }>
											<Text>{item.name}</Text>
										</TouchableOpacity>
									</Col>
									<Col style={{width: 40, alignItems: 'center'}}>
										{ (item.id && this.props.selectedStanding && this.props.selectedStanding.id && this.props.selectedStanding.id == item.id)
											? (<Icon name="checkmark" fontSize="10" color="#FF0000" iconRight="true"/>) : null }
									</Col>
								</Row>
							))}
						</Grid>
						:
						null
					}
				</Content>
			</Container>
		);
	}
}

function bindAction(dispatch)
{
	return {
		getStandings: seasonid => dispatch(getStandings(seasonid)),
		setStandingIndex: index => dispatch(setStandingIndex(index)),
		resetTeams: () => dispatch(resetTeams()),
	};
}
const mapStateToProps = state => ({
	standings: state.standings.list,
	selectedStanding: state.standings.selectedIndex,
	selectedSeason: state.seasons.selectedIndex
});
const StandingsSwagger = connect(mapStateToProps, bindAction)(Standings);
export default StandingsSwagger;
