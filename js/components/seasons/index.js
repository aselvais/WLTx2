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

import {getSeasons} from "../../actions/seasons";

/**
 *
 */
class Seasons extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.league.name
	});

	/**
	 *
	 * @type {{getSeasons}}
	 */
	static propTypes = {
		getSeasons: PropTypes.func
	};

	/**
	 *
	 */
	componentDidMount()
	{
		console.log('Seasons::componentDidMount ' + this.props.navigation.state.params.league.id);
		this.props.getSeasons(this.props.navigation.state.params.league.id);
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		const params = this.props.navigation.state.params;
		return (
			<Container>
				<Content padder>
					{(this.props.seasons && this.props.seasons.length && this.props.seasons.length > 0) ?
						<Grid>
							{this.props.seasons.map((item, i) => (
								<Row key={item.id}>
									<Col>
										<Text>{item}</Text>
									</Col>
								</Row>
							))}
						</Grid>
						:
						null
					}
					{
						(this.props.seasons && this.props.seasons.message) ?
							<Text>{this.props.seasons.message}</Text>
							:
							<Text>Something went wrong ...</Text>
					}
				</Content>
			</Container>
		);
	}
}

// export default Seasons;

function bindAction(dispatch)
{
	return {
		getSeasons: () => dispatch(getSeasons())
	};
}
const mapStateToProps = state => ({
	seasons: state.seasons.list
});
const SeasonsSwagger = connect(mapStateToProps, bindAction)(Seasons);
export default SeasonsSwagger;
