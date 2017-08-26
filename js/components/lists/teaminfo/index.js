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
	getTeaminfos,
	setTeaminfoIndex
} from "../../../redux/actions/teaminfo";

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
		title: 'Select a teaminfo'
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
								<Col style={{ padding: 10 }}>
									<Text>{teaminfos.id}</Text>
									<Text>{teaminfos.name}</Text>
									<Text>{teaminfos.imageUrl}</Text>
									<Text>{teaminfos.divisionId}</Text>
									<Text>{teaminfos.divisionName}</Text>
									<Text>{teaminfos.tierId}</Text>
									<Text>{teaminfos.tierName}</Text>
									<Text>{teaminfos.groupId}</Text>
									<Text>{teaminfos.groupName}</Text>
									<Text>{teaminfos.hasNews}</Text>
									<Text>{teaminfos.hasTweets}</Text>
									<Text>{teaminfos.playOff}</Text>
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
