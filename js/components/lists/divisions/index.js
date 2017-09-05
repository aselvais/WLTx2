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
	getDivisions,
	setDivisionIndex
} from "../../../redux/actions/divisions";

import {resetTeams} from "../../../redux/actions/teams";

/**
 *
 */
class Divisions extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({ navigation }) => ({
		title: 'Select a division'
	});

	/**
	 *
	 * @type {{getDivisions}}
	 */
	static propTypes = {
		getDivisions: PropTypes.func,
		setDivisionIndex: PropTypes.func,
		resetTeams: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		console.log('Divisions::componentDidMount ' + parseInt(this.props.selectedSeason.id) );
		this.props.getDivisions(parseInt(this.props.selectedSeason.id));
	}


	/**
	 *
	 * @param item
	 */
	clickDivision(item)
	{
		if (this.props.selectedDivision && this.props.selectedDivision.id != item.id)
		{
			this.props.resetTeams();
		}
		this.props.setDivisionIndex(item);
		// this.props.navigation.navigate("Teams", {division: item});
		this.props.navigation.navigate("HomeWtabs");
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
					{(this.props.divisions && this.props.divisions.length && this.props.divisions.length > 0) ?
						<Grid>
							{this.props.divisions.map((item, i) => (
								<Row key={item.id}>
									<Col style={{ padding: 10 }}>
										<TouchableOpacity onPress={() => this.clickDivision(item) }>
											<Text>{item.name}</Text>
										</TouchableOpacity>
									</Col>
									<Col style={{width: 40, alignItems: 'center'}}>
										{ (item.id && this.props.selectedDivision && this.props.selectedDivision.id && this.props.selectedDivision.id == item.id)
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
		getDivisions: seasonid => dispatch(getDivisions(seasonid)),
		setDivisionIndex: index => dispatch(setDivisionIndex(index)),
		resetTeams: () => dispatch(resetTeams()),
	};
}
const mapStateToProps = state => ({
	divisions: state.divisions.list,
	selectedDivision: state.divisions.selectedIndex,
	selectedSeason: state.seasons.selectedIndex
});
const DivisionsSwagger = connect(mapStateToProps, bindAction)(Divisions);
export default DivisionsSwagger;
