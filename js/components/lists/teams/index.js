import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Image, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {Container, Content, Icon, Text,} from "native-base";
import {Col, Grid, Row} from "react-native-easy-grid";

import {getTeams, setTeamIndex} from "../../../redux/actions/teams";

import {postUserTeams} from "../../../redux/actions/favorites";
import Spinner from '../../widgets/loaders/Spinner';
import {setLoading} from "../../../redux/actions/loading";


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
		title: 'Select a team'
	});

	/**
	 *
	 * @type {{getTeams}}
	 */
	static propTypes = {
		getTeams: PropTypes.func,
		setTeamIndex: PropTypes.func,
		postUserTeams: PropTypes.func,
		setLoading: PropTypes.func,
	};

	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.state = {
			stars: {}
		};
	}

	/**
	 *
	 */
	componentDidMount()
	{
		//console.log('Teams::componentDidMount ' + parseInt(this.props.selectedDivision.id));
		this.props.setLoading('games', true);
		this.props.getTeams(parseInt(this.props.selectedDivision.id)).then(
			() => this.props.setLoading('games', false),
			() => this.props.setLoading('games', false)
		);
	}

	/**
	 *
	 * @param item
	 */
	clickTeam(item)
	{
		this.props.setTeamIndex(item);
		// this.props.navigation.navigate("HomeWtabs");
		this.props.navigation.navigate("Games");
	}

	/**
	 *
	 * @param itemId
	 */
	toggleStar(itemId)
	{
		var _stars = this.state.stars;
		_stars[itemId] ? _stars[itemId] = false : _stars[itemId] = true;

		this.props.postUserTeams(parseInt(itemId));

		this.setState(_stars);
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
					{(this.props.teams && this.props.teams.length && this.props.teams.length > 0) ?
						<Grid>
							{this.props.teams.map((item, i) => (
								<Row key={item.id}>
									<Col style={{width: 60, height: 55}}>
										<TouchableOpacity onPress={() => this.clickTeam(item)}>
											<Image style={{width: 50, height: 50}} source={{uri: item.imageUrl}}/>
										</TouchableOpacity>
									</Col>
									<Col style={{padding: 10}}>
										<TouchableOpacity onPress={() => this.clickTeam(item)}>
											<Text>{item.name}</Text>
										</TouchableOpacity>
									</Col>
									<Col style={{width: 40, alignItems: 'center'}}>
										{(item.id && this.props.selectedTeam && this.props.selectedTeam.id && this.props.selectedTeam.id == item.id)
											? (<Icon name="checkmark" fontSize="10" color="#FF0000"
													 iconRight="true"/>) : null}
									</Col>
									<Col style={{width: 40, alignItems: 'center'}}>
										{(this.state.stars[item.id] && this.state.stars[item.id] === true) ?
											(<Icon onPress={() => this.toggleStar(item.id)} name="ios-star"
												   fontSize="10" style={{color: "#ffbb00"}} iconRight="true"/>)
											:
											(<Icon onPress={() => this.toggleStar(item.id)} name="ios-star-outline"
												   fontSize="10" style={{color: "#888888"}} iconRight="true"/>)
										}
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
		teams: state.teams.list,
		selectedTeam: state.teams.selectedIndex,
		selectedDivision: state.divisions.selectedIndex
	}),
	dispatch => ({
		getTeams: seasonid => dispatch(getTeams(seasonid)),
		postUserTeams: teamid => dispatch(postUserTeams(teamid)),
		setTeamIndex: index => dispatch(setTeamIndex(index)),
		setLoading: (name, status) => dispatch(setLoading(name, status)),
	})
)(Teams);
