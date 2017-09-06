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
} from "../../../redux/actions/teams";

import {
	postUserTeams
} from "../../../redux/actions/favorites";


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
		title: 'Select a team'
	});

	/**
	 *
	 * @type {{getTeams}}
	 */
	static propTypes = {
		getTeams: PropTypes.func,
		setTeamIndex: PropTypes.func,
		postUserTeams: PropTypes.func,
	};

	constructor(props)
	{
		super(props);
		this.state = {
			stars: {}
		};
	}

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
		// this.props.navigation.navigate("HomeWtabs");
		this.props.navigation.navigate("Games");
	}

	/**
	 *
	 * @param itemId
	 */
	toggleStar(itemId)
	{
		var _stars = this.state.stars;
		_stars[itemId] ? _stars[itemId]=false : _stars[itemId]=true;

		this.props.postUserTeams(parseInt(itemId));

		this.setState(_stars);
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		/**
		 * <Col style={{width: 40, alignItems: 'center'}}>
		 { (this.state.stars[item.id] && this.state.stars[item.id] === true) ?
			 (<Icon onPress={ () => this.toggleStar(item.id) } name="ios-star" fontSize="10" style={{ color: "#ffbb00"}} iconRight="true"/>)
			 :
			 (<Icon onPress={ () => this.toggleStar(item.id) } name="ios-star-outline" fontSize="10" style={{ color: "#888888"}} iconRight="true"/>)
		 }
		 </Col>
		 */

		// const params = this.props.navigation.state.params;
		return (
			<Container>
				<Content padder>
					{(this.props.teams && this.props.teams.length && this.props.teams.length > 0) ?
						<Grid>
							{this.props.teams.map((item, i) => (
								<Row key={item.id}>
									<Col style={{width: 60, height: 55}}>
										<TouchableOpacity onPress={() => this.clickTeam(item) }>
											<Image style={{width: 50, height: 50}} source={{uri: item.imageUrl}}/>
										</TouchableOpacity>
									</Col>
									<Col style={{ padding: 10 }}>
										<TouchableOpacity onPress={() => this.clickTeam(item) }>
											<Text>{item.name}</Text>
										</TouchableOpacity>
									</Col>
									<Col style={{width: 40, alignItems: 'center'}}>
										{ (item.id && this.props.selectedTeam && this.props.selectedTeam.id && this.props.selectedTeam.id == item.id)
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
		getTeams: seasonid => dispatch(getTeams(seasonid)),
		postUserTeams: teamid => dispatch(postUserTeams(teamid)),
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
