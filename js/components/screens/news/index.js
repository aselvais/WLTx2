import React, {Component} from "react";
import {connect} from "react-redux";
import { Text, View } from "react-native";
import {
	Container,
	Content,
	Icon,
	Tabs,
	Tab
} from "native-base";
import Headerbar from '../../widgets/headerbar/index';
import styles from "./styles";

import Newsfeed from '../../lists/newsfeed';
import Twitterfeed from '../../lists/twitterfeed';

/**
 *
 */
class News extends Component
{
	/**
	 * Option for the TabNavigation system
	 * @type {{header: null, tabBarLabel: string, tabBarIcon: (function({tintColor?: *}): XML)}}
	 */
	static navigationOptions = ({ navigation }) => ({
		header: <Headerbar title="News" navigation={navigation}/>,
		tabBarLabel: 'News',
		tabBarIcon: ({ tintColor }) => <Icon name="ios-medal" style={{color: tintColor}}/>
	});

	/**
	 *
	 * @returns {XML}
	 */

	render()
	{
		const {props: {name, index, list}} = this;
		return (
			<Container style={styles.container}>
				<Tabs initialPage={0}>
					<Tab heading="News">
						<Content padder>
							<View>
								<Newsfeed/>
							</View>
						</Content>
					</Tab>
					<Tab heading="Twitter">
						<Content padder>
							<View>
								<Twitterfeed/>
							</View>
						</Content>
					</Tab>
				</Tabs>
			</Container>
		);
	}
}

export default News;




