import React, {Component} from "react";
import PropTypes from 'prop-types';
import {
	Image,
	TouchableOpacity
} from "react-native";
import {connect} from "react-redux";
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

import {
	getLeagues,
	setIndex
} from "../../actions/leagues";

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
	static navigationOptions =  ({ navigation }) => ({
		header: <Headerbar title="Leagues" navigation={navigation}/>,
		tabBarLabel: 'Home',
		tabBarIcon: ({tintColor}) => <Icon style={{color: tintColor}} name="ios-home"/>
	});

	/**
	 *
	 * @type {{name, getLeagues}}
	 */
	static propTypes = {
		name: PropTypes.string,
		getLeagues: PropTypes.func,
		setIndex: PropTypes.func
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
	 * @param item
	 */
	clickLeague(item)
	{
		this.props.setIndex(item);
		this.props.navigation.navigate("Seasons", {league: item});
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
									<TouchableOpacity style={styles.row} onPress={() => this.clickLeague(item) }>
										<Image style={{width: 50, height: 50}} source={{uri: item.imageUrl}}/>
									</TouchableOpacity>
								</Col>
								<Col>
									<TouchableOpacity style={styles.row} onPress={() => this.clickLeague(item) }>
										<Text style={styles.text}>{item.name}</Text>
									</TouchableOpacity>
								</Col>
								<Col style={{width: 40, alignItems: 'center'}}>
									<TouchableOpacity style={styles.row} onPress={() => this.clickLeague(item) }>
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
		getLeagues: () => dispatch(getLeagues()),
		setIndex: index => dispatch(setIndex(index)),
	};
}
const mapStateToProps = state => ({
	name: state.user.name,
	leagues: state.leagues.list,
	selectedLeague: state.selectedLeague,
});
const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
export default HomeSwagger;
