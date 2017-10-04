import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Text, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {Container, Content, H2} from "native-base";
import {Col, Grid, Row} from "react-native-easy-grid";
import {getNewsfeeds, resetNewsfeeds, setNewsfeedIndex} from "../../../redux/actions/newsfeed";
import Spinner from '../../widgets/loaders/Spinner';

/**
 *
 */
class Newsfeeds extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({navigation}) => ({
		title: 'Select a newsfeed'
	});

	/**
	 *
	 * @type {{getNewsfeeds}}
	 */
	static propTypes = {
		getNewsfeeds: PropTypes.func,
		setNewsfeedIndex: PropTypes.func,
		resetNewsfeeds: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		if (this.props.selectedTeam && this.props.selectedTeam.id)
		{
			this.props.resetNewsfeeds();
			this.props.getNewsfeeds(parseInt(this.props.selectedTeam.id));
		}
	}


	/**
	 *
	 * @param item
	 */
	clickNewsfeed(item)
	{
		this.props.setNewsfeedIndex(item);
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
					{(this.props.newsfeeds && this.props.newsfeeds.length && this.props.newsfeeds.length > 0) ?
						<Grid>
							{this.props.newsfeeds.map((item, i) => (
								<Row key={i++}>
									<Col style={{padding: 10}}>
										<Text>{item.date}</Text>
										<H2>{item.title}</H2>
										<Text>{item.description}</Text>
										<TouchableOpacity onPress={() => this.clickNewsfeed(item)}>
											<Text>Go to URL</Text>
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
		newsfeeds: state.newsfeeds.list,
		selectedNewsfeed: state.newsfeeds.selectedIndex,
		selectedTeam: state.teams.selectedIndex
	}),
	dispatch => ({
		getNewsfeeds: teamid => dispatch(getNewsfeeds(teamid)),
		setNewsfeedIndex: index => dispatch(setNewsfeedIndex(index)),
		resetNewsfeeds: () => dispatch(resetNewsfeeds()),
	})
)(Newsfeeds);
