import React, {Component} from "react";
import {connect} from "react-redux";
import {
	Container,
	Content,
	Text,
	Icon
} from "native-base";
import Headerbar from '../headerbar';
import styles from "./styles";

/**
 *
 */
class Standings extends Component
{
	/**
	 * Option for the TabNavigation system
	 * @type {{header: null, tabBarLabel: string, tabBarIcon: (function({tintColor?: *}): XML)}}
	 */
	static navigationOptions = {
		header: <Headerbar title="Standings"/>,
		tabBarLabel: 'Standings',
		tabBarIcon: <Icon name="ios-speedometer"/>
	};

	/**
	 *
	 * @returns {XML}
	 */

	render()
	{
		const {props: {name, index, list}} = this;
		return (
			<Container style={styles.container}>
				<Content padder>
					<Text>
						Standings HERE ..... !!!!
					</Text>
				</Content>
			</Container>
		);
	}
}

export default Standings;




