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
	Button
} from "native-base";
import {
	Grid,
	Row,
	Col
} from "react-native-easy-grid";

import {
	getNewsfeeds,
	setNewsfeedIndex
} from "../../../redux/actions/newsfeed";

/**
 *
 */
class Newsfeeds extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({ navigation }) => ({
		title: 'Select a newsfeed'
	});

	/**
	 *
	 * @type {{getNewsfeeds}}
	 */
	static propTypes = {
		getNewsfeeds: PropTypes.func,
		setNewsfeedIndex: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		this.props.getNewsfeeds(parseInt(this.props.selectedTeam.id));
	}


	/**
	 *
	 * @param item
	 */
	clickNewsfeed(item)
	{
		this.props.setNewsfeedIndex(item);
		this.props.navigation.navigate("Teams", {newsfeed: item});
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
				<Content padder>
					{(this.props.newsfeeds && this.props.newsfeeds.length && this.props.newsfeeds.length > 0) ?
						<Grid>
							{this.props.newsfeeds.map((item, i) => (
								<Row key={item.id}>
									<Col style={{ padding: 10 }}>
										<TouchableOpacity onPress={() => this.clickNewsfeed(item) }>
											<Text>{item.name}</Text>
										</TouchableOpacity>
									</Col>
									<Col style={{width: 40, alignItems: 'center'}}>
										{ (item.id && this.props.selectedNewsfeed && this.props.selectedNewsfeed.id && this.props.selectedNewsfeed.id == item.id)
											? (<Icon name="checkmark" fontSize="10" color="#FF0000" iconRight="true"/>) : null }
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

function bindAction(dispatch)
{
	return {
		getNewsfeeds: teamid => dispatch(getNewsfeeds(teamid)),
		setNewsfeedIndex: index => dispatch(setNewsfeedIndex(index)),
	};
}
const mapStateToProps = state => ({
	newsfeeds: state.newsfeeds.list,
	selectedNewsfeed: state.newsfeeds.selectedIndex,
	selectedTeam: state.teams.selectedIndex
});
const NewsfeedsSwagger = connect(mapStateToProps, bindAction)(Newsfeeds);
export default NewsfeedsSwagger;
