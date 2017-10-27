import React, {Component} from "react";
import PropTypes from 'prop-types';
import {View, Image} from "react-native";
import {connect} from "react-redux";
import {Container, Content, Text, Tab, Tabs} from "native-base";
import {Col, Grid, Row} from "react-native-easy-grid";
import styles from "./styles";
import {getTeaminfos} from "../../../redux/actions/teaminfo";
import Spinner from '../../widgets/loaders/Spinner';


const coverimg = require('../../../../images/teambackgroundblack.jpg');

/**
 *
 */
class Teaminfos extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({navigation}) => ({
		title: 'Team info'
	});

	/**
	 *
	 * @type {{getTeaminfos}}
	 */
	static propTypes = {
		getTeaminfos: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		//if (this.props.selectedTeam && this.props.selectedTeam.id)
		//	{ this.props.getTeaminfos(parseInt(this.props.selectedTeam.id)); }
		if (this.props.selectedTeaminfo && this.props.selectedTeaminfo > 0)
		{
			this.props.getTeaminfos(parseInt(this.props.selectedTeaminfo));
		}
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		let {teaminfos} = this.props;
		return (
			<Container>
				<Grid>
					<Row size={25} style={styles.row01}>
						<Col>
							<Grid>
								<Row>
									<Image source={coverimg} style={styles.backgroundImage}>
									<Col style={{ alignItems: 'center' }}>
										<Image style={styles.imageLogo} source={{uri: teaminfos.imageUrl}}/>
										<Text style={styles.row01textName}>{ (teaminfos.name) ? teaminfos.name.toUpperCase() : null }</Text>
										<Text style={styles.row01textDivName}>{ teaminfos.divisionName }</Text>
									</Col>
									</Image>
								</Row>
							</Grid>
						</Col>
					</Row>
					<Row size={75}>
						<Col>
							<Tabs initialPage={0}>

								<Tab heading="OVERVIEW">
									<Content padder>
										<Spinner/>
										<Grid>
											{ [
												"name",
												"divisionId",
												"divisionName",
												"tierId",
												"tierName",
												"groupId",
												"groupName",
												"hasNews",
												"hasTweets",
												"playOff",
											].map((k, kk) => {
												return (
												<Row key={'itm'+kk}>
													<Col size={1}><Text>{k}</Text></Col>
													<Col size={2}><Text>{ teaminfos[k] }</Text></Col>
												</Row>
											)}) }
										</Grid>
									</Content>
								</Tab>

								<Tab heading="NEWS">
									<Content padder>
										<View>
											<Spinner/>
											<Text>Games HERE ..... !!!!</Text>
										</View>
									</Content>
								</Tab>

								<Tab heading="STATS">
									<Content padder>
										<View>
											<Spinner/>
											<Text>Games HERE ..... !!!!</Text>
										</View>
									</Content>
								</Tab>

								<Tab heading="GAMES">
									<Content padder>
										<View>
											<Spinner/>
											<Text>Games HERE ..... !!!!</Text>
										</View>
									</Content>
								</Tab>

							</Tabs>
						</Col>
					</Row>
				</Grid>
			</Container>
		);
	}
}

export default connect(
	state => ({
		teaminfos: state.teaminfo.list,
		selectedTeaminfo: state.teaminfo.selectedIndex,
		selectedTeam: state.teams.selectedIndex
	}),
	dispatch => ({
		getTeaminfos: teamid => dispatch(getTeaminfos(teamid))
	})
)(Teaminfos);
