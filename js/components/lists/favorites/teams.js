import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Image, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {Container, Content, Text,} from "native-base";
import {Col, Grid, Row} from "react-native-easy-grid";

import {getUserTeams} from "../../../redux/actions/favorites";
import Spinner from '../../widgets/loaders/Spinner';

/**
 *
 */
class Teams extends React.PureComponent
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({navigation}) => ({
		title: 'Select a favteam'
	});

	/**
	 *
	 * @type {{getFavfavteams}}
	 */
	static propTypes = {
		getUserTeams: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		this.props.getUserTeams();
	}


	/**
	 *
	 * @param item
	 */
	clickFavfavteam(item)
	{
		// this.props.setFavfavteamIndex(item);
		this.props.navigation.navigate("Teaminfo");
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
					{(this.props.favteams && this.props.favteams.length && this.props.favteams.length > 0) ?
						<Grid>
							{this.props.favteams.map((item, i) => (
								<Row key={item.id}>
									<Col style={{width: 60, height: 55}}>
										<TouchableOpacity onPress={() => this.clickFavfavteam(item)}>
											<Image style={{width: 50, height: 50}} source={{uri: item.imageUrl}}/>
										</TouchableOpacity>
									</Col>
									<Col style={{padding: 10}}>
										<TouchableOpacity onPress={() => this.clickFavfavteam(item)}>
											<Text>{item.name}</Text>
										</TouchableOpacity>
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
		favteams: state.favorites.teams,
	}),
	dispatch => ({
		getUserTeams: () => dispatch(getUserTeams()),
	})
)(Teams);
