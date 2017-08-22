import React, {Component} from "react";
import HomeDrawerRouter from "./HomeDrawerRouter";
import {StackNavigator} from "react-navigation";

import Login from "../components/login/";
import Home from "../components/home/";
import HomeWtabs from "./BottomTabBar";
import BlankPage from "../components/blankPage";
import Seasons from "../components/seasons";
import Divisions from "../components/divisions";
import Teams from "../components/teams";

HomeDrawerRouter.navigationOptions = ({navigation}) => ({header: null});

export default (StackNav = StackNavigator({
		Login: {screen: Login},
		HomeWtabs: {screen: HomeWtabs},
		Home: {screen: Home},
		BlankPage: {screen: BlankPage},
		Seasons: {screen: Seasons},
		Divisions: {screen: Divisions},
		Teams: {screen: Teams},
	},
	{
		mode: 'modal'
	}
));
