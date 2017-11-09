import React, {Component} from "react";
import {Text, View} from "react-native";
import {Container, Content, Icon, Tab, Tabs} from "native-base";
import Headerbar from '../../widgets/headerbar/index';
import styles from "./styles";
import Teams from '../../lists/favorites/teams';

/**
 *
 */
class Favorites extends React.PureComponent
{
	/**
	 * Option for the TabNavigation system
	 * @type {{header: null, tabBarLabel: string, tabBarIcon: (function({tintColor?: *}): XML)}}
	 */
	static navigationOptions = ({navigation}) => ({
		header: <Headerbar title="Favorites" navigation={navigation}/>,
		tabBarLabel: 'Favorites',
		tabBarIcon: ({tintColor}) => <Icon name="ios-heart" style={{color: tintColor}}/>
	});

	/**
	 *
	 * @returns {XML}
	 */

	render()
	{
		// const {name, index, list} = this.props;
		return (
			<Container style={styles.container}>
				<Tabs initialPage={0}>
					<Tab heading="Teams">
						<Content padder>
							<View>
								<Teams navigation={this.props.navigation}/>
							</View>
						</Content>
					</Tab>
					<Tab heading="Games">
						<Content padder>
							<View>
								<Text>Games HERE ..... !!!!</Text>
							</View>
						</Content>
					</Tab>
				</Tabs>
			</Container>
		);
	}
}

export default Favorites;
