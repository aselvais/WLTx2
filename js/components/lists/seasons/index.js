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
} from "../../../redux/actions/seasons";

import { resetDivisions } from "../../../redux/actions/divisions";
import Spinner from '../../widgets/loaders/Spinner';
import { setLoading } from "../../../redux/actions/loading";

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
		title: 'Select a seasons'
	});

	/**
	 *
	 * @type {{getSeasons}}
	 */
	static propTypes = {
		getSeasons: PropTypes.func,
		setSeasonIndex: PropTypes.func,
		resetDivisions: PropTypes.func,
		setLoading: PropTypes.func
	};

	/**
	 *
	 */
	componentDidMount()
	{
		console.log('Seasons::componentDidMount ' + parseInt(this.props.selectedLeague.id) );
		this.props.setLoading('seasons', true);
		this.props.getSeasons(parseInt(this.props.selectedLeague.id)).then(
			() => this.props.setLoading('seasons', false),
			() => this.props.setLoading('seasons', false)
		);
		;
	}

	/**
	 *
	 * @param item
	 */
	clickSeason(item)
	{
		if (this.props.selectedSeason && this.props.selectedSeason.id != item.id)
		{
			this.props.resetDivisions();
		}
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
				<Spinner/>
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
									<Col style={{width: 40, alignItems: 'center'}}>
										{ (item.id && this.props.selectedSeason && this.props.selectedSeason.id && this.props.selectedSeason.id == item.id)
											? (<Icon name="checkmark" fontSize="10" color="#FF0000" iconRight="true"/>) : null }
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
		resetDivisions: () => dispatch(resetDivisions()),
		setLoading: (name, status) => dispatch(setLoading(name, status)),
	};
}
const mapStateToProps = state => ({
	seasons: state.seasons.list,
	selectedSeason: state.seasons.selectedIndex,
	selectedLeague: state.leagues.selectedIndex
});
const SeasonsSwagger = connect(mapStateToProps, bindAction)(Seasons);
export default SeasonsSwagger;
