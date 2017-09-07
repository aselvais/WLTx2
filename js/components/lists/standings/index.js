import React, {Component} from "react";
import PropTypes from 'prop-types';
import {
	Image,
	TouchableOpacity,
	Text,
	View
} from "react-native";
import {connect} from "react-redux";
import {
	Container,
	Content,
	Icon,
	Button,
	H2
} from "native-base";
import {
	Grid,
	Row,
	Col
} from "react-native-easy-grid";
import {
	getStandings,
	resetStandings,
	setStandingIndex
} from "../../../redux/actions/standings";
import md5 from 'md5';

/**
 *
 */
class Standings extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({ navigation }) => ({
		title: 'Select a standing'
	});

	/**
	 *
	 * @type {{getStandings}}
	 */
	static propTypes = {
		getStandings: PropTypes.func,
		resetStandings: PropTypes.func,
		setStandingIndex: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		if (this.props.selectedDivisions && this.props.selectedDivisions.id)
		{
			this.props.resetStandings();
			this.props.getStandings(
				parseInt(this.props.selectedDivisions.id),
				((this.props.selectedTiers && this.props.selectedTiers.id) ? this.props.selectedTiers.id : 0)
			);
		}
	}


	/**
	 *
	 * @param item
	 */
	clickStanding(item)
	{
		this.props.setStandingIndex(item);
		this.props.navigation.navigate("Teams", {standing: item});
	}

	/**
	 *
	 * @param d
	 * @returns {Array}
	 */
	getStandingsJsx(el)
	{
		let jsx = [];
		let u=0;
		el.map((d) => {
			for (var i in d)
			{
				let pd = JSON.stringify(d[i]);
				jsx.push(<Text key={i + ++u}>{i}: {pd}</Text>);
			}
		});

		return jsx;
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		let u = 0;
		return (
				<View>
					{(this.props.standings && this.props.standings.length && this.props.standings.length > 0) ?
						<Grid>
							{this.props.standings.map((item, i) => (
								<Row key={item.id}>
									<Col style={{ padding: 10 }}>
										<H2>{item.name}</H2>
										{ (item.name != '') ? this.getStandingsJsx( item.teamStandingLocalAPIModels ) : null }
									</Col>
								</Row>
							))}
						</Grid>
						:
						null
					}
				</View>
		);
	}
}

function bindAction(dispatch)
{
	return {
		getStandings: (divisionids, tierid) => dispatch(getStandings(divisionids, tierid)),
		resetStandings: () => dispatch(resetStandings()),
		setStandingIndex: index => dispatch(setStandingIndex(index)),
	};
}
const mapStateToProps = state => ({
	standings: state.standings.list,
	selectedStanding: state.standings.selectedIndex,
	selectedDivisions: state.divisions.selectedIndex,
	selectedTiers: (state.tiers.list && state.tiers.list[0]) ? state.tiers.list[0] : null
});
const StandingsSwagger = connect(mapStateToProps, bindAction)(Standings);
export default StandingsSwagger;
