import React, {Component} from "react";
import PropTypes from 'prop-types';
import {
	Image,
	TouchableOpacity,
	Dimensions
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
	getTeaminfos,
	setTeaminfoIndex
} from "../../../redux/actions/teaminfo";
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

/**
 *
 */
class Teaminfos extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({ navigation }) => ({
		title: 'Team info'
	});

	/**
	 *
	 * @type {{getTeaminfos}}
	 */
	static propTypes = {
		getTeaminfos: PropTypes.func,
		setTeaminfoIndex: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		if (this.props.selectedTeam && this.props.selectedTeam.id)
			this.props.getTeaminfos(parseInt(this.props.selectedTeam.id));
	}


	/**
	 *
	 * @param item
	 */
	clickTeaminfo(item)
	{
		this.props.setTeaminfoIndex(item);
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		// const params = this.props.navigation.state.params;
		let {teaminfos} = this.props;
		return (
			<Container>
				<Content padder>
					{(teaminfos && teaminfos.id) ?
						<Grid>
							<Row key={teaminfos.id}>
								<Col style={{
									padding: 10,
									alignSelf: 'center',
									justifyContent: 'center'
								}}>
									<Image style={{
										resizeMode: 'contain',
										width: (deviceWidth/2),
										height: (deviceWidth/2)
									}} source={{uri: teaminfos.imageUrl}}/>
									<Text style={{fontWeight: 'bold'}}>NAME</Text>
									<Text>{teaminfos.name}</Text>
									<Text style={{fontWeight: 'bold'}}>DIVITION</Text>
									<Text>{teaminfos.divisionName}</Text>
									<Text style={{fontWeight: 'bold'}}>TIER</Text>
									<Text>{teaminfos.tierName}</Text>
									<Text style={{fontWeight: 'bold'}}>GROUP</Text>
									<Text>{teaminfos.groupName}</Text>
								</Col>
							</Row>
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
		getTeaminfos: teamid => dispatch(getTeaminfos(teamid)),
		setTeaminfoIndex: index => dispatch(setTeaminfoIndex(index)),
	};
}
const mapStateToProps = state => ({
	teaminfos: state.teaminfo.list,
	selectedTeaminfo: state.teaminfo.selectedIndex,
	selectedTeam: state.teams.selectedIndex
});
const TeaminfosSwagger = connect(mapStateToProps, bindAction)(Teaminfos);
export default TeaminfosSwagger;
