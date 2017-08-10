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
class Scores extends Component
{
	/**
	 * Option for the TabNavigation system
	 * @type {{header: null, tabBarLabel: string, tabBarIcon: (function({tintColor?: *}): XML)}}
	 */
	static navigationOptions = {
		header: <Headerbar title="Scores"/>,
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
			<Container style={styles.container}>
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




