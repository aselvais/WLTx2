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
} from "../../../redux/actions/teaminfos";

import {resetTeams} from "../../../redux/actions/teams";

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
		resetTeams: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		console.log('Teaminfos::componentDidMount ' + parseInt(this.props.selectedSeason.id) );
		this.props.getTeaminfos(parseInt(this.props.selectedSeason.id));
	}


	/**
	 *
	 * @param item
	 */
	clickTeaminfo(item)
	{
		if (this.props.selectedTeaminfo && this.props.selectedTeaminfo.id != item.id)
		{
			this.props.resetTeams();
		}
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
		getTeaminfos: seasonid => dispatch(getTeaminfos(seasonid)),
		setTeaminfoIndex: index => dispatch(setTeaminfoIndex(index)),
		resetTeams: () => dispatch(resetTeams()),
	};
}
const mapStateToProps = state => ({
	teaminfos: state.teaminfos.list,
	selectedTeaminfo: state.teaminfos.selectedIndex,
	selectedSeason: state.seasons.selectedIndex
});
const TeaminfosSwagger = connect(mapStateToProps, bindAction)(Teaminfos);
export default TeaminfosSwagger;
