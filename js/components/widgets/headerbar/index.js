import React, {Component} from "react";
import {
	Header,
	Title,
	Button,
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
				</Button>
			</Left>
			<Body>
			<Title>{this.props.title}</Title>
			</Body>
			<Right>
				<Button transparent onPress={() => this.props.navigation.navigate("Login")}>
				</Button>
			</Right>
		</Header>;
	}
}

export default Headerbar;
