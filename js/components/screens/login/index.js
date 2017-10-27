import React, {Component} from "react";
import {Dimensions, Image, AsyncStorage} from "react-native";
import {connect} from "react-redux";
import {Button, Text} from "native-base";
import {Col, Grid, Row} from "react-native-easy-grid";
import {reduxForm} from "redux-form";
import styles from "./styles";
import Spinner from '../../widgets/loaders/Spinner';

const deviceHeight = Dimensions.get('window').height;
const background = require("../../../../images/wltLogo.png");
const logo = require("../../../../images/MarlLogo.png");


/**
 *
 */
class Login extends Component
{

	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({navigation}) => ({
		header: null
	});

	/**
	 *
	 * @type {{setUser}}
	 */
	static propTypes = {};

	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
	}

	/**
	 *
	 * @todo Clear the local storage in case of problem
	 * @returns {*|Promise}
	 */
	clearStorage()
	{
		return AsyncStorage.clear();
	}

	/**
	 *
	 */
	onClickStart()
	{
		this.props.navigation.navigate("Games");
		///this.props.navigation.navigate("Teaminfo");
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		return (
			<Grid style={styles.container}>
				<Spinner/>
				<Image source={background} style={styles.shadow}>
					<Row size={2}>
						<Col style={{
							alignItems: 'center',
							justifyContent: 'center'
						}}>
							<Image source={logo} style={{
								resizeMode: 'contain',
								height: (deviceHeight / 2)
							}}/>
						</Col>
					</Row>
					<Row size={1}>
						<Col>
							<Button style={styles.btn} onPress={() => this.onClickStart()}>
								<Text>START</Text>
							</Button>

							<Button style={styles.btn}  onPress={ () => this.clearStorage() }transparent info>
								<Text style={{ color: '#0000FF' }}>Clear cached data</Text>
							</Button>

						</Col>
					</Row>
				</Image>
			</Grid>
		);
	}
}

export default connect(
	state => ({
// 		league: state.leagues.selectedIndex,
		season: state.seasons.selectedIndex,
	}),
	dispatch => ({
	})
)(Login);
/*
const LoginSwag = reduxForm(
	{form: "test"},
	function bindActions(dispatch)
	{
		return {};
	}
)(Login);

export default LoginSwag;
*/
