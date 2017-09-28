import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {
	Container,
	Content,
	Text,
	Icon,
	Button,
	Right,
	Body,
	Left,
	Picker,
	Form,
	Item as FormItem
} from "native-base";

import StandingsList from '../../lists/standings';
import {
	getTiers,
	setTierIndex
} from "../../../redux/actions/tiers";
import Spinner from '../../widgets/loaders/Spinner';

import {
	StackNavigator,
} from "react-navigation";
import Headerbar from '../../widgets/headerbar/index';
import styles from "./styles";

const Item = Picker.Item;

/**
 *
 */
class Standings extends Component
{
	/**
	 * Option for the TabNavigation system
	 * @type {{header: null, tabBarLabel: string, tabBarIcon: (function({tintColor?: *}): XML)}}
	 */
	static navigationOptions = ({ navigation }) => ({
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
			this.props.getTiers(parseInt(this.props.selectedDivision.id));
	}

	/**
	 *
	 * @param value
	 */
	onValueChange(value: string)
	{
		this.setState({
			selected1: value
		});
	}

	/**
	 * Returns drop down selection component
	 *
	 * @param data
	 * @returns {XML}
	 */
	getDropDown(data = {})
	{
		data = {0: 'MINOR PEEWEE - TIER 0', 1: 'MINOR PEEWEE - TIER 1', 2: 'MINOR PEEWEE - TIER 2'};
		var jsx = [];
		for (d in data) {
			jsx.push(<Item label={data[d]} key={'key' + d} value={'key' + d}/>);
		}
		return (<Form>
			<Picker
				style={{
					backgroundColor: '#DDD',
					width: '100%',
					borderRadius: 0,
					alignItems: 'center',
					alignSelf: 'center',
					justifyContent: 'center',
					borderBottomColor: '#000'
				}}
				iosHeader="Select one"
				mode="dropdown"
				selectedValue={this.state.selected1}
				onValueChange={this.onValueChange.bind(this)}>{jsx}</Picker>
		</Form>);
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		const {props: {name, index, list}} = this;
		// 				{this.getDropDown()}
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

// export default Standings;


function bindAction(dispatch)
{
	return {
		getTiers: divisionid => dispatch(getTiers(divisionid)),
		setTierIndex: index => dispatch(setTierIndex(index)),
	};
}
const mapStateToProps = state => ({
	tiers: state.tiers.list,
	selectedTier: state.tiers.selectedIndex,
	selectedDivision: state.divisions.selectedIndex
});
const StandingsSwagger = connect(mapStateToProps, bindAction)(Standings);
export default StandingsSwagger;



