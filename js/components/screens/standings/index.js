import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {
	Container,
	Content,
	Icon,
} from "native-base";
import StandingsList from '../../lists/standings';
import {
	getTiers,
	setTierIndex
} from "../../../redux/actions/tiers";
import Spinner from '../../widgets/loaders/Spinner';
import Headerbar from '../../widgets/headerbar/index';
import styles from "./styles";

/**
 *
 */
class Standings extends Component
{
	/**
	 * Option for the TabNavigation system
	 * @type {{header: null, tabBarLabel: string, tabBarIcon: (function({tintColor?: *}): XML)}}
	 */
	static navigationOptions = ({navigation}) => ({
		header: <Headerbar title="Standings" navigation={navigation}/>,
		tabBarLabel: 'Standings',
		tabBarIcon: ({tintColor}) => <Icon name="ios-speedometer" style={{color: tintColor}}/>
	});

	/**
	 *
	 * @type {{getTiers}}
	 */
	static propTypes = {
		getTiers: PropTypes.func,
		setTierIndex: PropTypes.func,
	};

	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.state = {
			selected1: "key1"
		};
	}

	/**
	 *
	 */
	componentDidMount()
	{
		if (this.props.selectedDivision && this.props.selectedDivision.id)
		{
			this.props.getTiers(parseInt(this.props.selectedDivision.id));
		}
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		const {props: {name, index, list}} = this;
		return (
			<Container style={styles.container}>
				<Spinner/>
				<Content padder>
					<StandingsList navigation={this.props.navigation}/>
				</Content>
			</Container>
		);
	}
}

export default connect(
	state => ({
		tiers: state.tiers.list,
		selectedTier: state.tiers.selectedIndex,
		selectedDivision: state.divisions.selectedIndex
	}),
	dispatch => ({
		getTiers: divisionid => dispatch(getTiers(divisionid)),
		setTierIndex: index => dispatch(setTierIndex(index)),
	})
)(Standings);



