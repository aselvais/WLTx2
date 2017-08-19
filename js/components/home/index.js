import React, {Component} from "react";
import PropTypes from 'prop-types';
import {
	Image,
	TouchableOpacity
} from "react-native";
import {connect} from "react-redux";
import {
	TabNavigator,
	TabBarBottom
} from "react-navigation";
import {
	Container,
	Content,
	Text,
	Icon,
	Button
} from "native-base";
import {
	Grid,
	Row,
	Col
} from "react-native-easy-grid";

import {getLeagues} from "../../actions/leagues";
import styles from "./styles";

// screens
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
		header: <Headerbar title="Leagues"/>,
		tabBarLabel: 'Home',
		tabBarIcon: ({tintColor}) => <Icon style={{color: tintColor}} name="ios-home"/>
	};

	/**
	 *
	 * @type {{name, getLeagues}}
	 */
	static propTypes = {
		name: PropTypes.string,
		getLeagues: PropTypes.func
	};

	/**
	 *
	 */
	componentDidMount()
	{
		this.props.getLeagues();
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		return (
			<Container style={styles.container}>
				<Button style={{
					backgroundColor: '#DDD',
					width: '100%',
					borderRadius: 0,
					alignItems: 'center',
					alignSelf: 'center',
					justifyContent: 'center',
					borderBottomColor: '#000'
				}} onPress={() => this.props.getLeagues()}><Text>Re-load leagues</Text></Button>
				<Content>
					<Grid style={styles.mt}>
						{this.props.leagues.map((item, i) => (
							<Row key={item.id}>
								<Col style={{width: 60, height: 55}}>
									<TouchableOpacity style={styles.row} onPress={() => this.props.navigation.navigate("Seasons", {name2: 'Hello01'})}>
										<Image style={{width: 50, height: 50}} source={{uri: item.imageUrl}}/>
									</TouchableOpacity>
								</Col>
								<Col>
									<TouchableOpacity style={styles.row} onPress={() => this.props.navigation.navigate("Seasons", {name2: 'Hello02'})}>
										<Text style={styles.text}>{item.name}</Text>
									</TouchableOpacity>
								</Col>
								<Col style={{width: 40, alignItems: 'center'}}>
									<TouchableOpacity style={styles.row} onPress={() => this.props.navigation.navigate("Seasons", {name2: 'Hello03'})}>
										<Icon name="ios-arrow-forward-outline"/>
									</TouchableOpacity>
								</Col>
							</Row>
						))}
					</Grid>
				</Content>
			</Container>
		);
	}
}

function bindAction(dispatch)
{
	return {
		getLeagues: () => dispatch(getLeagues())
	};
}
const mapStateToProps = state => ({
	name: state.user.name,
	leagues: state.leagues.list
});
const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
export default HomeSwagger;
