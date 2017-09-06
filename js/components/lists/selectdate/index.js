import React, {Component} from "react";
import PropTypes from 'prop-types';
import {
	connect
} from "react-redux";
import {
	Container,
	Content
} from "native-base";
import {
	setDate
} from "../../../redux/actions/selecteddate";
import {
	Calendar
} from 'react-native-calendars';
import moment from 'moment';
/**
 *
 */
class Selectdate extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({ navigation }) => ({
		title: 'Select a date'
	});

	/**
	 *
	 * @type {{getDivisions}}
	 */
	static propTypes = {
		setDate: PropTypes.func,
	};

	onDayPress( d )
	{
		let dd = new Date(d.year, d.month-1, d.day)
 		this.props.setDate(dd);
		this.props.navigation.navigate("Games");
	}


	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		let {sdate} = this.props;
		return (
			<Container>
				<Content padder>
					<Calendar
						selected={[moment(sdate).format('YYYY-MM-DD')]}
						onDayPress={ (day) => this.onDayPress(day) }
					/>
				</Content>
			</Container>
		);
	}
}

function bindAction(dispatch)
{
	return {
		setDate: date => dispatch(setDate(date)),
	};
}
const mapStateToProps = state => ({
	sdate: state.selecteddate.sdate,
});
const SelectdateSwagger = connect(mapStateToProps, bindAction)(Selectdate);
export default SelectdateSwagger;
