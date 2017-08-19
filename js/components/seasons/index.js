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
		getSeasons: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		console.log('Seasons::componentDidMount ' + parseInt(this.props.selectedLeague.id) );
		this.props.getSeasons(parseInt(this.props.selectedLeague.id));
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
									<Col><Text>{item.name}</Text></Col>
									<Col><Text>{item.playOff ? 'PlayOffs' : null }</Text></Col>
									<Col><Text>{item.bracketsVisibleInSeason ? 'brackets' : null }</Text></Col>
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
							null
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
		getSeasons: leagueid => dispatch(getSeasons(leagueid))
	};
}
const mapStateToProps = state => ({
	seasons: state.seasons.list,
	selectedLeague: state.leagues.selectedIndex
});
const SeasonsSwagger = connect(mapStateToProps, bindAction)(Seasons);
export default SeasonsSwagger;
