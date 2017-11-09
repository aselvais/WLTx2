import React, {Component} from "react";
import {Body, Button, Header, Left, Right, Title} from "native-base";

/**
 *
 */
class Headerbar extends React.PureComponent
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
