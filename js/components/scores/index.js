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

import styles from "./styles";

/**
 *
 */
class Scores extends Component
{
	/**
	 * Option for the TabNavigation system
	 * @type {{header: null, tabBarLabel: string, tabBarIcon: (function({tintColor?: *}): XML)}}
	 */
	static navigationOptions = {
		header: null,
		tabBarLabel: 'Scores',
		tabBarIcon: <Icon name="ios-medal"/>
	};

	/**
	 *
	 * @returns {XML}
	 */

	render()
	{
		const {props: {name, index, list}} = this;
		return (
			<Container>
				<Header>
					<Left>
						<Button
							transparent
							onPress={() => DrawerNav.navigate("DrawerOpen")}>
							<Icon active name="menu"/>
						</Button>
					</Left>
					<Body>
					<Title>Scores</Title>
					</Body>
					<Right>
						<Button
							transparent
							onPress={() =>
							{
								DrawerNav.dispatch(
									NavigationActions.reset({
										index: 0,
										actions: [NavigationActions.navigate({routeName: "Home"})]
									})
								);
								DrawerNav.goBack();
							}}>
							<Icon active name="power"/>
						</Button>
					</Right>
				</Header>

				<Content padder>
					<Text>
						Scores HERE ..... !!!!
					</Text>
				</Content>
			</Container>
		);
	}
}

export default Scores;




