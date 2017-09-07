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
	H1,
	Icon,
	Button
} from "native-base";
import {
	Grid,
	Row,
	Col
} from "react-native-easy-grid";
import openMap from 'react-native-open-maps';


/**
 *
 */
class Arena extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({navigation}) => ({
		title: 'Game info'
	});

	/**
	 *
	 * @type {{getDivisions}}
	 */
	static propTypes = {};

	openMaps()
	{
		const {game} = this.props;
		openMap({ latitude: game.arena.latitude, longitude: game.arena.longitude });
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		const {game} = this.props;
		return (
			<Container>
				<Content padder>
					<H1>Game</H1>
					<H1>Arena</H1>
					<Text>{game.arena.name}</Text>
					<Text>{game.arena.address}</Text>
					<Button onPress={() => this.openMaps() }>
						<Text>Open Map</Text>
					</Button>
				</Content>
			</Container>
		);
	}
}

function bindAction(dispatch)
{
	return {};
}

const mapStateToProps = state => ({
	game: state.games.selectedIndex,
});
const ArenaSwagger = connect(mapStateToProps, bindAction)(Arena);
export default ArenaSwagger;
