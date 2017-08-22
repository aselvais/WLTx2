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
	getTeams,
	setTeamIndex
} from "../../actions/teams";

/**
 *
 */
class Teams extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({ navigation }) => ({
		title: 'Team: ' + navigation.state.params.division.name
	});

	/**
	 *
	 * @type {{getTeams}}
	 */
	static propTypes = {
		getTeams: PropTypes.func,
		setTeamIndex: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		console.log('Teams::componentDidMount ' + parseInt(this.props.selectedDivision.id) );
		this.props.getTeams(parseInt(this.props.selectedDivision.id));
	}


	/**
	 *
	 * @param item
	 */
	clickTeam(item)
	{
		this.props.setTeamIndex(item);
		// this.props.navigation.navigate("Games", {team: item});
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
					{(this.props.teams && this.props.teams.length && this.props.teams.length > 0) ?
						<Grid>
							{this.props.teams.map((item, i) => (
								<Row key={item.id}>
									<Col style={{width: 60, height: 55}}>
										<TouchableOpacity onPress={() => this.clickLeague(item) }>
											<Image style={{width: 50, height: 50}} source={{uri: item.imageUrl}}/>
										</TouchableOpacity>
									</Col>
									<Col style={{ padding: 10 }}>
										<TouchableOpacity onPress={() => this.clickTeam(item) }>
											<Text>{item.name}
												{ (item.id && this.props.selectedTeam && this.props.selectedTeam.id && this.props.selectedTeam.id == item.id)
													? (<Icon name="checkmark" fontSize="10" color="#FF0000" iconRight="true"/>) : null }
											</Text>
										</TouchableOpacity>
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
		getTeams: seasonid => dispatch(getTeams(seasonid)),
		setTeamIndex: index => dispatch(setTeamIndex(index)),
	};
}
const mapStateToProps = state => ({
	teams: state.teams.list,
	selectedTeam: state.teams.selectedIndex,
	selectedDivision: state.divisions.selectedIndex
});
const TeamsSwagger = connect(mapStateToProps, bindAction)(Teams);
export default TeamsSwagger;
