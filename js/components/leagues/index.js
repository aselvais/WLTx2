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
	setLeagueIndex
} from "../../actions/leagues";

import styles from "./styles";

/**
 *
 */
class Leagues extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({ navigation }) => ({
		title: 'Leagues'
	});

	/**
	 *
	 * @type {{name, getLeagues}}
	 */
	static propTypes = {
		name: PropTypes.string,
		getLeagues: PropTypes.func,
		setLeagueIndex: PropTypes.func
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
		this.props.setLeagueIndex(item);
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
		setLeagueIndex: index => dispatch(setLeagueIndex(index)),
	};
}
const mapStateToProps = state => ({
	name: state.user.name,
	leagues: state.leagues.list,
	selectedLeague: state.selectedLeague,
});
const LeaguesSwagger = connect(mapStateToProps, bindAction)(Leagues);
export default LeaguesSwagger;
