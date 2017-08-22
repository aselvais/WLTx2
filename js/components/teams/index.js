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
	setDivisionIndex
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
		setDivisionIndex: PropTypes.func,
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
	clickDivision(item)
	{
		this.props.setDivisionIndex(item);
		this.props.navigation.navigate("Teams", {division: item});
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
									<Col style={{ padding: 10 }}>
										<TouchableOpacity onPress={() => this.clickDivision(item) }>
											<Text>{item.name}</Text>
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
		setDivisionIndex: index => dispatch(setDivisionIndex(index)),
	};
}
const mapStateToProps = state => ({
	teams: state.teams.list,
	selectedDivision: state.divisions.selectedIndex
});
const TeamsSwagger = connect(mapStateToProps, bindAction)(Teams);
export default TeamsSwagger;
