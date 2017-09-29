import React, {Component} from "react";
import PropTypes from 'prop-types';
import {
	Image,
	TouchableOpacity
} from "react-native";
import {connect} from "react-redux";
import {
	Container,
	Content,
	Text,
	Icon,
} from "native-base";
import {
	Grid,
	Row,
	Col
} from "react-native-easy-grid";
import {
	getLeagues,
	setLeagueIndex
} from "../../../redux/actions/leagues";
import Spinner from '../../widgets/loaders/Spinner';
import {setLoading} from "../../../redux/actions/loading";
import {resetSeasons} from "../../../redux/actions/seasons";
import styles from "./styles";

/**
 *
 */
class Leagues extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({navigation}) => ({
		title: 'Select a league'
	});

	/**
	 *
	 * @type {{name, getLeagues}}
	 */
	static propTypes = {
		name: PropTypes.string,
		getLeagues: PropTypes.func,
		setLeagueIndex: PropTypes.func,
		resetSeasons: PropTypes.func,
		setLoading: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		this.props.setLoading('leagues', true);
		this.props.getLeagues().then(
			() => this.props.setLoading('leagues', false),
			() => this.props.setLoading('leagues', false)
		);
	}

	/**
	 *
	 * @param item
	 */
	clickLeague(item)
	{
		if (this.props.selectedLeague && this.props.selectedLeague.id != item.id)
		{
			this.props.resetSeasons();
		}
		this.props.setLeagueIndex(item);
		this.props.navigation.navigate("Seasons", {league: item});
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		return (
			<Container>
				<Content>
					<Spinner/>
					<Grid style={styles.mt}>
						{this.props.leagues.map((item, i) => (
							<Row key={item.id}>
								<Col style={{width: 60, height: 55}}>
									<TouchableOpacity style={styles.row} onPress={() => this.clickLeague(item)}>
										<Image style={{width: 50, height: 50}} source={{uri: item.imageUrl}}/>
									</TouchableOpacity>
								</Col>
								<Col>
									<TouchableOpacity style={styles.row} onPress={() => this.clickLeague(item)}>
										<Text style={styles.text}>{item.name}</Text>
									</TouchableOpacity>
								</Col>
								<Col style={{width: 40, alignItems: 'center'}}>
									{(item.id && this.props.selectedLeague && this.props.selectedLeague.id && this.props.selectedLeague.id == item.id)
										? (<Icon name="checkmark" fontSize="10" color="#FF0000"
												 iconRight="true"/>) : null}
								</Col>
							</Row>
						))}
					</Grid>
				</Content>
			</Container>
		);
	}
}

export default connect(
	state => ({
		name: state.user.name,
		leagues: state.leagues.list,
		selectedLeague: state.leagues.selectedIndex
	}),
	dispatch => ({
		getLeagues: () => dispatch(getLeagues()),
		setLeagueIndex: index => dispatch(setLeagueIndex(index)),
		resetSeasons: () => dispatch(resetSeasons()),
		setLoading: (name, status) => dispatch(setLoading(name, status)),
	})
)(Leagues);
