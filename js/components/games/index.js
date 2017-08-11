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
class Games extends Component
{
	/**
	 * Option for the TabNavigation system
	 * @type {{header: null, tabBarLabel: string, tabBarIcon: (function({tintColor?: *}): XML)}}
	 */
	static navigationOptions = {
		header: <Headerbar title="Games"/>,
		tabBarLabel: 'Games',
		tabBarIcon: ({ tintColor }) => <Icon name="ios-calendar" style={{color: tintColor}}/>
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
						GAMES HERE ..... !!!!
					</Text>
				</Content>
			</Container>
		);
	}
}

export default Games;




