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
} from "../../actions/divisions";

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
		title: 'Division: ' + navigation.state.params.season.name
	});

	/**
	 *
	 * @type {{getDivisions}}
	 */
	static propTypes = {
		getDivisions: PropTypes.func,
		setDivisionIndex: PropTypes.func,
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
					{(this.props.divisions && this.props.divisions.length && this.props.divisions.length > 0) ?
						<Grid>
							{this.props.divisions.map((item, i) => (
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
		getDivisions: seasonid => dispatch(getDivisions(seasonid)),
		setDivisionIndex: index => dispatch(setDivisionIndex(index)),
	};
}
const mapStateToProps = state => ({
	divisions: state.divisions.list,
	selectedSeason: state.seasons.selectedIndex
});
const DivisionsSwagger = connect(mapStateToProps, bindAction)(Divisions);
export default DivisionsSwagger;
