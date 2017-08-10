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
class Favorites extends Component
{
	/**
	 * Option for the TabNavigation system
	 * @type {{header: null, tabBarLabel: string, tabBarIcon: (function({tintColor?: *}): XML)}}
	 */
	static navigationOptions = {
		header: null,
		tabBarLabel: 'Favorites',
		tabBarIcon: <Icon name="ios-heart"/>
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
					<Title>Favorites</Title>
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
						Favorites HERE ..... !!!!
					</Text>
				</Content>
			</Container>
		);
	}
}

export default Favorites;




