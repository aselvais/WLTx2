import React from "react";
import {Dimensions, ppRegistry, Image, TouchableOpacity} from "react-native";
import {
	Button,
	Text,
	Container,
	List,
	ListItem,
	Content,
	Icon,
	View
} from "native-base";

const deviceHeight = Dimensions.get('window').height;

/**
 *
 * @type {[string,string]}
 */
const routes = [
	{name: "Home", label: "Search"}
];

const background = require("../../../images/drawer-cover.png");
const logo = require("../../../images/logo.png");


/**
 *
 */
export default class DrawBar extends React.Component
{
	/**
	 *
	 * @type {{header: null}}
	 */
	static navigationOptions = {
		header: null
	};

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		return (
			<Container>
				<Content>

					<View style={{
						flex: 1,
						height: deviceHeight,
						flexDirection: 'column'
					}}>
						<View style={{
							flex: 0.3,
							width: '100%',
							backgroundColor: '#1b6bb0',
							alignSelf: 'center',
							justifyContent: 'center'
						}}>
							<Text style={{
								color: '#FFF',
								alignSelf: 'center'
							}}>IMAGE HERE</Text>
						</View>
						<View style={{
							flex: 0.7
						}}>
							<List dataArray={routes}
								  renderRow={data =>
								  {
									  return (
										  <ListItem
											  button
											  onPress={() => this.props.navigation.navigate(data.name)}>
											  <Text>{data.label}</Text>
										  </ListItem>
									  );
								  }}/>
						</View>
					</View>
				</Content>
			</Container>
		);
	}
}
