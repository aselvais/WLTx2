import React, {Component} from "react";
import {
	TabNavigator,
	TabBarBottom
} from "react-navigation";

// screens
import Home from "../components/screens/home";
import Games from "../components/screens/games";
import News from "../components/screens/news";
import Standings from "../components/screens/standings";
import Favorites from "../components/screens/favorites";


const MainScreenNavigator = TabNavigator({
//		Home: {screen: Home},
		Games: {screen: Games},
		Stand: {screen: Standings},
//		News: {screen: News},
//		Fav: {screen: Favorites},
	},
	{
		tabBarComponent: TabBarBottom,
		tabBarPosition: 'bottom',
		animationEnabled: true,
		tabBarOptions: {
			activeTintColor: '#1b6bb0',
		}
	});

export default MainScreenNavigator;
