import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Dimensions, Image} from "react-native";
import {Container, Content, Icon} from "native-base";
import {Col, Grid, Row} from "react-native-easy-grid";
import styles from "./styles";
import Btnteamselect from '../../widgets/btnteamselect/index';
import Headerbar from "../../widgets/headerbar/index";
import Spinner from "../../widgets/loaders/Spinner";

const deviceHeight = Dimensions.get('window').height;
const coverimg = require('../../../../images/wltLogo2.png');
const logo = require("../../../../images/MarlLogo.png");

/**
 *
 */
class Home extends React.PureComponent
{

	/**
	 * Option for the TabNavigation system
	 * @type {{header: null, tabBarLabel: string, tabBarIcon: (function({tintColor?: *}): XML)}}
	 */
	static navigationOptions = ({navigation}) => ({
		header: <Headerbar title="Home" navigation={navigation}/>,
		tabBarLabel: 'Home',
		tabBarIcon: ({tintColor}) => <Icon style={{color: tintColor}} name="ios-home"/>
	});

	/**
	 *
	 * @type {{name, getLeagues}}
	 */
	static propTypes = {
		name: PropTypes.string,
	};

	/**
	 *
	 */
	componentWillMount()
	{
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		let {team,loading} = this.props;
		return (
			<Container>
				<Grid>
					<Row size={25}>
						<Col>
							<Grid>
								<Row>
									<Image source={coverimg} style={styles.backgroundImage}>
										<Col style={{alignItems: 'center'}}>
											<Image style={styles.imageLogo} source={logo}/>
										</Col>
									</Image>
								</Row>
							</Grid>
						</Col>
					</Row>
					<Row size={75}>
						<Col>
							<Content>
								{ loading ? <Spinner/> : <Btnteamselect navigation={this.props.navigation}/> }
							</Content>
						</Col>
					</Row>
				</Grid>
			</Container>
		);
	}
}

export default connect(
	state => ({
		name: state.user.name,
		league: state.leagues.selectedIndex,
		season: state.seasons.selectedIndex,
		division: state.divisions.selectedIndex,
		team: state.teams.selectedIndex,
		loading: state.loading.globalstatus
	}),
	dispatch => ({})
)(Home);
