import React, {Component} from "react";
import PropTypes from 'prop-types';
import {TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {Container, Content, Icon, Text,} from "native-base";
import {Col, Grid, Row} from "react-native-easy-grid";
import {getTiers, setTierIndex} from "../../../redux/actions/tiers";
import Spinner from '../../widgets/loaders/Spinner';

/**
 *
 */
class Tiers extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({navigation}) => ({
		title: 'Select a tier'
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
	 * @param item
	 */
	clickTier(item)
	{
		this.props.setTierIndex(item);
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		return (
			<Container>
				<Spinner/>
				<Content padder>
					{(this.props.tiers && this.props.tiers.length && this.props.tiers.length > 0) ?
						<Grid>
							{this.props.tiers.map((item, i) => (
								<Row key={item.id}>
									<Col style={{padding: 10}}>
										<TouchableOpacity onPress={() => this.clickTier(item)}>
											<Text>{item.name}</Text>
										</TouchableOpacity>
									</Col>
									<Col style={{width: 40, alignItems: 'center'}}>
										{(item.id && this.props.selectedTier && this.props.selectedTier.id && this.props.selectedTier.id == item.id)
											? (<Icon name="checkmark" fontSize="10" color="#FF0000"
													 iconRight="true"/>) : null}
									</Col>
								</Row>
							))}
						</Grid>
						:
						null
					}
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
)(Tiers);
