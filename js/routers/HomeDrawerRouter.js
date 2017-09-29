import React from "react";
import Home from "../components/screens/home/";
import {DrawerNavigator} from "react-navigation";
import DrawBar from "../components/widgets/DrawBar";

export default (DrawNav = DrawerNavigator(
	{
		Home: {screen: Home}
	},
	{
		contentComponent: props => <DrawBar {...props} />
	}
));
