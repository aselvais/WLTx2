import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Button, Container, Content, Icon, Text} from "native-base";
import StandingsList from '../../lists/standings';
import {getTiers, setTierIndex} from "../../../redux/actions/tiers";
import {Col, Grid, Row} from "react-native-easy-grid";
import Headerbar from '../../widgets/headerbar/index';
import styles from "./styles";
import Spinner from '../../widgets/loaders/Spinner';
import Tiers from '../../lists/tiers'

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

	getDropDownJsx()
	{
		const {tiers, navigation, selectedTier} = this.props;

		return (
			<Row style={styles.rowTop}>
				<Col size={1}>
					<Button style={styles.topbutton} onPress={() => navigation.navigate("Tiers")}>
						<Grid>
							<Col style={styles.topbntcol}>
								<Text style={styles.txtBold}>Tiers:</Text>
								<Text style={styles.txtBold}>
									{(selectedTier && selectedTier.name) ? selectedTier.name.toUpperCase() : null}
								</Text>
							</Col>
							<Col style={styles.col2}>
								<Icon name="ios-arrow-forward" style={{color: '#000000'}}/>
							</Col>
						</Grid>
					</Button>
				</Col>
			</Row>
		);
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
				<Grid>
					{this.getDropDownJsx()}
					<Content padder>
						<Spinner/>
						<StandingsList navigation={this.props.navigation}/>
					</Content>
				</Grid>
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



