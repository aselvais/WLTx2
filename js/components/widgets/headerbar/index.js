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
		return <Header>
			<Left>
				<Button transparent>
					<Icon active name="menu"/>
				</Button>
			</Left>
			<Body>
			<Title>{ this.props.title }</Title>
			</Body>
			<Right>
				<Button transparent onPress={() => this.props.navigation.navigate("Login")}>
					<Icon active name="power"/>
				</Button>
			</Right>
		</Header>;
	}
}

export default Headerbar;
