import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Text, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {Container, Content, H2,} from "native-base";
import {Col, Grid, Row} from "react-native-easy-grid";

import {getTwitterfeeds, resetTwitterfeeds, setTwitterfeedIndex} from "../../../redux/actions/twitterfeed";
import Spinner from '../../widgets/loaders/Spinner';

/**
 *
 */
class Twitterfeeds extends React.PureComponent
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({navigation}) => ({
		title: 'Select a twitterfeed'
	});

	/**
	 *
	 * @type {{getTwitterfeeds}}
	 */
	static propTypes = {
		getTwitterfeeds: PropTypes.func,
		setTwitterfeedIndex: PropTypes.func,
		resetTwitterfeeds: PropTypes.func,
	};

	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
	}

	/**
	 *
	 */
	componentDidMount()
	{
		if (this.props.selectedTeam && this.props.selectedTeam.id)
		{
			this.props.resetTwitterfeeds();
			this.props.getTwitterfeeds(parseInt(this.props.selectedTeam.id));
		}
	}


	/**
	 *
	 * @param item
	 */
	clickTwitterfeed(item)
	{
		this.props.setTwitterfeedIndex(item);
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		let i = 0;
		// const params = this.props.navigation.state.params;
		return (
			<Container>
				<Spinner/>
				<Content padder>
					{(this.props.twitterfeeds && this.props.twitterfeeds.length && this.props.twitterfeeds.length > 0) ?
						<Grid>
							{this.props.twitterfeeds.map((item, i) => (
								<Row key={i++}>
									<Col style={{padding: 10}}>

										<Text>{item.date}</Text>
										<H2>{item.screenName}</H2>
										<Text>{item.text}</Text>

										<TouchableOpacity onPress={() => this.clickTwitterfeed(item)}>
											<Text>{item.url}</Text>
										</TouchableOpacity>
									</Col>
								</Row>
							))}
						</Grid>
						:
						<Text>No news here ...</Text>
					}
				</Content>
			</Container>
		);
	}
}

export default connect(
	state => ({
		twitterfeeds: state.twitterfeeds.list,
		selectedTwitterfeed: state.twitterfeeds.selectedIndex,
		selectedTeam: state.teams.selectedIndex
	}),
	dispatch => ({
		getTwitterfeeds: teamid => dispatch(getTwitterfeeds(teamid)),
		setTwitterfeedIndex: index => dispatch(setTwitterfeedIndex(index)),
		resetTwitterfeeds: () => dispatch(resetTwitterfeeds()),
	})
)(Twitterfeeds);
