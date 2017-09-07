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
	H2,
	H3,
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
		openMap({latitude: game.arena.latitude, longitude: game.arena.longitude});
	}

	/**
	 *
	 * @param d
	 * @returns {XML}
	 */
	getJsxRow(k, v)
	{
		return (
			<Row>
				<Col size={1}><Text style={{fontWeight: 'bold'}}>{k}</Text></Col>
				<Col size={2}><Text>{v}</Text></Col>
			</Row>
		);
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
					<Grid>
						<Row>
							<Col style={{paddingTop: 20, paddingBottom: 20}}><H2>Game</H2></Col>
						</Row>

						{this.getJsxRow('Type', game.type)}
						{this.getJsxRow('Date/Time', game.dateTime)}
						{this.getJsxRow('Division', game.divisionName)}

						<Row>
							<Col style={{paddingTop: 20, paddingBottom: 20}}><H2>Arena</H2></Col>
						</Row>

						{this.getJsxRow('Name', game.arena.name)}
						{this.getJsxRow('Address', game.arena.address)}
						<Row>
							<Col size={1}><Text style={{fontWeight: 'bold'}}>Map</Text></Col>
							<Col size={2}>
								<Button onPress={() => this.openMaps()}><Text>Open Map</Text></Button>
							</Col>
						</Row>

					</Grid>

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
