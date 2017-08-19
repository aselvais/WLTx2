import React, {Component} from "react";
import {
	TabNavigator,
	TabBarBottom
} from "react-navigation";

// screens
import Home from "../components/home";
import Games from "../components/games";
import Scores from "../components/scores";
import Standings from "../components/standings";
import Favorites from "../components/favorites";


const MainScreenNavigator = TabNavigator({
		Home: {screen: Home},
		Games: {screen: Games},
		Scores: {screen: Scores},
		Stand: {screen: Standings},
		Fav: {screen: Favorites},
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
