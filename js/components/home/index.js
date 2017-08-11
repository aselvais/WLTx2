import React, {Component} from "react";
import {TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import DrawBar from "../DrawBar";
import {
	DrawerNavigator,
	TabNavigator,
	TabBarBottom
} from "react-navigation";
import {
	Container,
	Content,
	Text,
	Icon,
} from "native-base";
import {Grid, Row} from "react-native-easy-grid";

import {setIndex} from "../../actions/list";
import {openDrawer} from "../../actions/drawer";
import styles from "./styles";

import BlankPage2 from "../blankPage2";
import Games from "../games";
import Scores from "../scores";
import Standings from "../standings";
import Favorites from "../favorites";
import Headerbar from "../headerbar";

/**
 *
 */
class Home extends Component
{

	/**
	 * Option for the TabNavigation system
	 * @type {{header: null, tabBarLabel: string, tabBarIcon: (function({tintColor?: *}): XML)}}
	 */
	static navigationOptions = {
		header: <Headerbar title="Home"/>,
		tabBarLabel: 'Home',
		tabBarIcon: ({ tintColor }) => <Icon style={{color: tintColor}} name="ios-home"/>
	};

	/**
	 *
	 * @type {{name, setIndex, list: *, openDrawer}}
	 */
	static propTypes = {
		name: React.PropTypes.string,
		setIndex: React.PropTypes.func,
		list: React.PropTypes.arrayOf(React.PropTypes.string),
		openDrawer: React.PropTypes.func
	};

	/**
	 *
	 * @param index
	 */
	newPage(index)
	{
		this.props.setIndex(index);
		Actions.blankPage();
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		return (
			<Container style={styles.container}>
				<Content>
					<Grid style={styles.mt}>
						{this.props.list.map((item, i) => (
							<Row key={i}>
								<TouchableOpacity
									style={styles.row}
									onPress={() =>
										this.props.navigation.navigate("BlankPage", {
											name: {item}
										})}>
									<Text style={styles.text}>{item}</Text>
								</TouchableOpacity>
							</Row>
						))}
					</Grid>
				</Content>
			</Container>
		);
	}
}

/**
 *
 * @param dispatch
 * @returns {{setIndex: (function(*=): *), openDrawer: (function(): *)}}
 */
function bindAction(dispatch)
{
	return {
		setIndex: index => dispatch(setIndex(index)),
		openDrawer: () => dispatch(openDrawer())
	};
}

/**
 *
 * @param state
 */
const mapStateToProps = state => ({
	name: state.user.name,
	list: state.list.list
});

/**
 *
 */
const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
/**
 *
 */
const DrawNav = DrawerNavigator(
	{
		Home: {screen: HomeSwagger},
		BlankPage2: {screen: BlankPage2}
	},
	{
		contentComponent: props => <DrawBar {...props} />
	}
);
/**
 *
 * @type {null}
 */
let DrawerNav = null;
/**
 *
 * @param navigation
 * @returns {{header: null}}
 */
DrawNav.navigationOptions = ({navigation}) =>
{
	DrawerNav = navigation;
	return {
		header: null
	};
};

/**
 *
 */
const MainScreenNavigator = TabNavigator({
		Home: {screen: HomeSwagger},
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

// export default DrawNav;
export default MainScreenNavigator;
