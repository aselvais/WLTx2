import React, {Component} from "react";
import {connect} from "react-redux";
import {
	Container,
	Header,
	Title,
	Content,
	Text,
	Button,
	Icon,
	Left,
	Right,
	Body
} from "native-base";

class Seasons extends Component
{
	static navigationOptions = {
		header: null
	};

	render()
	{
		const {props: {name, index, list}} = this;
		return (
			<Container>
				<Content padder>
					<Text>
						List seasons here . . .
					</Text>
				</Content>
			</Container>
		);
	}
}

export default Seasons;
