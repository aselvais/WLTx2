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
	getSeasons,
	setSeasonIndex
} from "../../actions/seasons";

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
		title: 'Season: ' + navigation.state.params.league.name
	});

	/**
	 *
	 * @type {{getSeasons}}
	 */
	static propTypes = {
		getSeasons: PropTypes.func,
		setSeasonIndex: PropTypes.func
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
	 * @param item
	 */
	clickSeason(item)
	{
		this.props.setSeasonIndex(item);
		this.props.navigation.navigate("Divisions", {season: item});
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		// const params = this.props.navigation.state.params;
		return (
			<Container>
				<Content padder>
					{(this.props.seasons && this.props.seasons.length && this.props.seasons.length > 0) ?
						<Grid>
							{this.props.seasons.map((item, i) => (
								<Row key={item.id}>
									<Col style={{ padding: 10 }}>
										<TouchableOpacity onPress={() => this.clickSeason(item) }>
											<Text>{item.name}
											{item.bracketsVisibleInSeason ? (<Icon name="code" fontSize="5" color="#FF0000"/>) : null }
											{item.playOff ? (<Icon name="ios-american-football" fontSize="5" color="#FF0000"/>) : null }
											</Text>
										</TouchableOpacity>
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
		getSeasons: leagueid => dispatch(getSeasons(leagueid)),
		setSeasonIndex: index => dispatch(setSeasonIndex(index)),
	};
}
const mapStateToProps = state => ({
	seasons: state.seasons.list,
	selectedLeague: state.leagues.selectedIndex
});
const SeasonsSwagger = connect(mapStateToProps, bindAction)(Seasons);
export default SeasonsSwagger;
