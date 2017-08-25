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
		this.props.getTeaminfos(parseInt(this.props.selectedTeam.id));
	}


	/**
	 *
	 * @param item
	 */
	clickTeaminfo(item)
	{
		this.props.setTeaminfoIndex(item);
		this.props.navigation.navigate("Teams", {teaminfo: item});
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
					{(this.props.teaminfos && this.props.teaminfos.length && this.props.teaminfos.length > 0) ?
						<Grid>
							{this.props.teaminfos.map((item, i) => (
								<Row key={item.id}>
									<Col style={{ padding: 10 }}>
										<TouchableOpacity onPress={() => this.clickTeaminfo(item) }>
											<Text>{item.name}</Text>
										</TouchableOpacity>
									</Col>
									<Col style={{width: 40, alignItems: 'center'}}>
										{ (item.id && this.props.selectedTeaminfo && this.props.selectedTeaminfo.id && this.props.selectedTeaminfo.id == item.id)
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
		getTeaminfos: teamid => dispatch(getTeaminfos(teamid)),
		setTeaminfoIndex: index => dispatch(setTeaminfoIndex(index)),
	};
}
const mapStateToProps = state => ({
	teaminfos: state.teaminfos.list,
	selectedTeaminfo: state.teaminfos.selectedIndex,
	selectedTeam: state.teams.selectedIndex
});
const TeaminfosSwagger = connect(mapStateToProps, bindAction)(Teaminfos);
export default TeaminfosSwagger;
