import React, {Component} from "react";
import HomeDrawerRouter from "./HomeDrawerRouter";
import {StackNavigator} from "react-navigation";

import Login from "../components/screens/login/";
import Home from "../components/screens/home/";
import HomeWtabs from "./BottomTabBar";
import Leagues from "../components/lists/leagues";
import Seasons from "../components/lists/seasons";
import Divisions from "../components/lists/divisions";
import Teams from "../components/lists/teams";

HomeDrawerRouter.navigationOptions = ({navigation}) => ({header: null});

export default (StackNav = StackNavigator({
		Login: {screen: Login},
		HomeWtabs: {screen: HomeWtabs},
		Home: {screen: Home},
		Leagues: {screen: Leagues},
		Seasons: {screen: Seasons},
		Divisions: {screen: Divisions},
		Teams: {screen: Teams},
	},
	{
		mode: 'modal'
	}
));
