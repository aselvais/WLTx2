import React, {Component} from "react";
import {TouchableOpacity} from "react-native";
import {connect} from "react-redux";

import BlankPage2 from "../blankPage2";
import Games from "../games";
import Scores from "../scores";
import Standings from "../standings";
import Favorites from "../favorites";


import DrawBar from "../DrawBar";
import {
	DrawerNavigator,
	NavigationActions,
	TabNavigator,
	TabBarBottom
} from "react-navigation";
import {
	Container,
	Header,
	Title,
	Content,
	Text,
	Button,
	Icon,
	Left,
	Body,
	Right,
	Footer,
	FooterTab,
	Badge
} from "native-base";
import {Grid, Row} from "react-native-easy-grid";

import {setIndex} from "../../actions/list";
import {openDrawer} from "../../actions/drawer";
import styles from "./styles";

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
		header: null,
		tabBarLabel: 'Home',
		tabBarIcon: <Icon name="ios-home"/>
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
		console.log(DrawNav, "786785786");
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button
							transparent
							onPress={() => DrawerNav.navigate("DrawerOpen")}>
							<Icon active name="menu"/>
						</Button>
					</Left>
					<Body>
					<Title>Home</Title>
					</Body>
					<Right>
						<Button
							transparent
							onPress={() =>
							{
								DrawerNav.dispatch(
									NavigationActions.reset({
										index: 0,
										actions: [NavigationActions.navigate({routeName: "Home"})]
									})
								);
								DrawerNav.goBack();
							}}>
							<Icon active name="power"/>
						</Button>
					</Right>
				</Header>
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
 * <FooterTab>
 <Button active vertical>
 <Icon name="ios-home"/>
 <Text style={styles.tabbarText}>Home</Text>
 </Button>
 <Button vertical>
 <Icon name="ios-calendar"/>
 <Text style={styles.tabbarText}>Games</Text>
 </Button>
 <Button vertical>
 <Icon active name="medal"/>
 <Text style={styles.tabbarText}>Scores</Text>
 </Button>
 <Button vertical>
 <Icon name="ios-speedometer"/>
 <Text style={styles.tabbarText}>Stand.</Text>
 </Button>
 <Button badge vertical>
 <Badge><Text>2</Text></Badge>
 <Icon name="ios-heart"/>
 <Text style={styles.tabbarText}>Fav.</Text>
 </Button>
 </FooterTab>
 */
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
		animationEnabled: false
	});

// export default DrawNav;
export default MainScreenNavigator;
