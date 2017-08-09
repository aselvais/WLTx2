import React, {Component} from "react";
import {Image} from "react-native";
import {connect} from "react-redux";
import {
	Container,
	Content,
	Item,
	Input,
	Button,
	Icon,
	View,
	Text
} from "native-base";
import {Field, reduxForm} from "redux-form";
import {setUser} from "../../actions/user";
import styles from "./styles";

const background = require("../../../images/wltLogo.png");
/**
 *
 * @param values
 * @returns {{}}
 */
const validate = values =>
{
	const error = {};
	error.email = "";
	error.password = "";
	var ema = values.email;
	var pw = values.password;
	if (values.email === undefined) {
		ema = "";
	}
	if (values.password === undefined) {
		pw = "";
	}
	if (ema.length < 8 && ema !== "") {
		error.email = "too short";
	}
	if (!ema.includes("@") && ema !== "") {
		error.email = "@ not included";
	}
	if (pw.length > 12) {
		error.password = "max 11 characters";
	}
	if (pw.length < 5 && pw.length > 0) {
		error.password = "Weak";
	}
	return error;
};

/**
 *
 */
class Login extends Component
{
	/**
	 *
	 * @type {{setUser}}
	 */
	static propTypes = {
		setUser: React.PropTypes.func
	};

	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.state = {
			name: ""
		};
		this.renderInput = this.renderInput.bind(this);
	}

	/**
	 *
	 * @param name
	 */
	setUser(name)
	{
		this.props.setUser(name);
	}

	/**
	 *
	 * @param input
	 * @param label
	 * @param type
	 * @param touched
	 * @param error
	 * @param warning
	 * @param inputProps
	 * @returns {XML}
	 */
	renderInput({
					input,
					label,
					type,
					meta: {touched, error, warning},
					inputProps
				})
	{
		var hasError = false;
		if (error !== undefined) {
			hasError = true;
		}
		return (
			<Item error={hasError} rounded style={{ padding: 0, margin: 5 }}>
				<Icon style={{ marginLeft: 10, color: '#327bb6' }} active name={input.name === "email" ? "person" : "unlock"}/>
				<Input
					placeholder={input.name === "email" ? "EMAIL" : "PASSWORD"}
					{...input}
				/>
				{hasError
					? <Item style={{borderColor: "transparent"}}>
						<Text style={{fontSize: 11, color: "#d93131"}}>{error}</Text>
					</Item>
					: <Text/>}
			</Item>
		);
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		return (
			<Container>
				<View style={styles.container}>
					<Content>
						<Image source={background} style={styles.shadow}>
							<View style={styles.bg}>
								<Field name="email" component={this.renderInput}/>
								<Field name="password" component={this.renderInput}/>
								<Button style={styles.btn}
									onPress={() => this.props.navigation.navigate("Home")}>
									<Text>SIGN IN</Text>
								</Button>
							</View>
						</Image>
					</Content>
				</View>
			</Container>
		);
	}
}


/**
 *
 */
const LoginSwag = reduxForm(
	{
		form: "test",
		validate
	},
	function bindActions(dispatch)
	{
		return {
			setUser: name => dispatch(setUser(name))
		};
	}
)(Login);
LoginSwag.navigationOptions = {
	header: null
};
export default LoginSwag;
