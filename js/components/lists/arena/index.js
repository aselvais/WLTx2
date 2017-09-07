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
		title: 'Arena'
	});

	/**
	 *
	 * @type {{getDivisions}}
	 */
	static propTypes = {};

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
					<Text>
						ARENA
					</Text>
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
