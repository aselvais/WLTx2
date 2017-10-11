import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Container, Content} from "native-base";
import {setDate} from "../../../redux/actions/selecteddate";
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import Spinner from '../../widgets/loaders/Spinner';

/**
 *
 */
class Selectdate extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({navigation}) => ({
		title: 'Select a date'
	});

	/**
	 *
	 * @type {{getDivisions}}
	 */
	static propTypes = {
		setDate: PropTypes.func,
	};

	/**
	 *
	 * @param d
	 */
	onDayPress(d)
	{
		let dd = new Date(d.year, (d.month - 1), d.day)
		this.props.setDate(dd);
		this.props.navigation.navigate("Games");
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		let {sdate, sdatefrom, sdateto} = this.props;
		let mdates = {};
		let i = sdatefrom;
		mdates[moment(sdate).format('YYYY-MM-DD')] = [{selected: true}];
		/*

		if (typeof i === 'object')
		{
			while (i < sdateto)
			{
				let txtd = moment(i).format('YYYY-MM-DD');
				if (!mdates[txtd])
				{
					mdates[txtd] = [];
				}
				mdates[txtd].push({marked: true, color: 'green', textColor: 'white'});
				i.setDate(i.getDate() + 1);
			}
		}

		*/
		return (
			<Container>
				<Spinner/>
				<Content padder>
					<Calendar
						onDayPress={(day) => this.onDayPress(day)}
						markedDates={mdates}
					/>
				</Content>
			</Container>
		);
	}
}


export default connect(
	state => ({
		sdate: state.selecteddate.sdate,
		sdatefrom: state.selecteddate.sdatefrom,
		sdateto: state.selecteddate.sdateto,
	}),
	dispatch => ({
		setDate: date => dispatch(setDate(date)),
	})
)(Selectdate);
