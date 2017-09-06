import React, {Component} from "react";
import {
	NavigationActions,
} from "react-navigation";
import {
	Header,
	Title,
	Button,
	Icon,
	Left,
	Body,
	Right
} from "native-base";

/**
 *
 */
class Headerbar extends Component
{
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
		// 					<Icon active name="menu"/>
		// 					<Icon active name="power"/>


		return <Header>
			<Left>
				<Button transparent>
				</Button>
			</Left>
			<Body>
			<Title>{ this.props.title }</Title>
			</Body>
			<Right>
				<Button transparent onPress={() => this.props.navigation.navigate("Login")}>
				</Button>
			</Right>
		</Header>;
	}
}

export default Headerbar;
