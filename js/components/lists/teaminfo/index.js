import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Dimensions} from "react-native";
import {connect} from "react-redux";
import {Container, Content, Text,} from "native-base";
import {Col, Grid, Row} from "react-native-easy-grid";
import styles from "./styles";
import {getTeaminfos} from "../../../redux/actions/teaminfo";
import Spinner from '../../widgets/loaders/Spinner';
import LinearGradient from 'react-native-linear-gradient';

const deviceWidth = Dimensions.get('window').width;

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
		/**
		 *                            <Row key={teaminfos.id}>
		 <Col style={{
									padding: 10,
									alignSelf: 'center',
									justifyContent: 'center'
								}}>

		 <Image style={{
										resizeMode: 'contain',
										width: (deviceWidth / 2),
										height: (deviceWidth / 2)
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
		 */

		return (
			<Container>
				<LinearGradient colors={styles.linegradientTopGradient} style={styles.linegradientTop}>
				<Grid style={{height: 150}}>
					<Row>
						<Col>
							<Text>Top</Text>
						</Col>
					</Row>
				</Grid>
				</LinearGradient>
				<Content>
					<Spinner/>
					{(teaminfos && teaminfos.id) ?
						<Grid>
							<Row>
								<Col>
									<Text>Bottom</Text>
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
