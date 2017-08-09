import React from "react";
import {AppRegistry, Image, TouchableOpacity} from "react-native";
import {
	Button,
	Text,
	Container,
	List,
	ListItem,
	Content,
	Icon
} from "native-base";

/**
 *
 * @type {[string,string]}
 */
const routes = [
	{name: "Home", label: "Search"},
	{name: "BlankPage2", label: "Clubs"},
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

					<Image
						source={background}
						style={{
							height: 120,
							alignSelf: "stretch",
							justifyContent: "center",
							alignItems: "center"
						}}>
						<TouchableOpacity
							style={{
								height: 120,
								alignSelf: "stretch",
								justifyContent: "center",
								alignItems: "center"
							}}
							onPress={() => this.props.navigation.navigate("DrawerClose")}>
							<Image
								square
								style={{height: 80, width: 70}}
								source={logo}
							/>
						</TouchableOpacity>
					</Image>
					<List
						dataArray={routes}
						renderRow={data =>
						{
							return (
								<ListItem
									button
									onPress={() => this.props.navigation.navigate(data.name)}>
									<Text>{data.label}</Text>
								</ListItem>
							);
						}}
					/>
				</Content>
			</Container>
		);
	}
}
