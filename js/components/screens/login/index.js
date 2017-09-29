import React, {Component} from "react";
import PropTypes from 'prop-types';
import {
	Image,
	Dimensions
} from "react-native";
import {connect} from "react-redux";
import {
	Button,
	Text
} from "native-base";
import {
	Grid,
	Row,
	Col
} from "react-native-easy-grid";
import {
	reduxForm
} from "redux-form";
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
							<Button style={styles.btn} onPress={() => this.props.navigation.navigate("Leagues")}>
								<Text>START</Text>
							</Button>
						</Col>
					</Row>
				</Image>
			</Grid>
		);
	}
}


/**
 *
 */
const LoginSwag = reduxForm(
	{form: "test"},
	function bindActions(dispatch)
	{
		return {};
	}
)(Login);
LoginSwag.navigationOptions = {header: null};
export default LoginSwag;
