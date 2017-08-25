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
	getTwitterfeeds,
	setTwitterfeedIndex
} from "../../../redux/actions/twitterfeed";

/**
 *
 */
class Twitterfeeds extends Component
{
	/**
	 *
	 * @param navigation
	 */
	static navigationOptions = ({ navigation }) => ({
		title: 'Select a twitterfeed'
	});

	/**
	 *
	 * @type {{getTwitterfeeds}}
	 */
	static propTypes = {
		getTwitterfeeds: PropTypes.func,
		setTwitterfeedIndex: PropTypes.func,
	};

	/**
	 *
	 */
	componentDidMount()
	{
		this.props.getTwitterfeeds(parseInt(this.props.selectedTeam.id));
	}


	/**
	 *
	 * @param item
	 */
	clickTwitterfeed(item)
	{
		this.props.setTwitterfeedIndex(item);
		this.props.navigation.navigate("Teams", {twitterfeed: item});
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
					{(this.props.twitterfeeds && this.props.twitterfeeds.length && this.props.twitterfeeds.length > 0) ?
						<Grid>
							{this.props.twitterfeeds.map((item, i) => (
								<Row key={item.id}>
									<Col style={{ padding: 10 }}>
										<TouchableOpacity onPress={() => this.clickTwitterfeed(item) }>
											<Text>{item.name}</Text>
										</TouchableOpacity>
									</Col>
									<Col style={{width: 40, alignItems: 'center'}}>
										{ (item.id && this.props.selectedTwitterfeed && this.props.selectedTwitterfeed.id && this.props.selectedTwitterfeed.id == item.id)
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
		getTwitterfeeds: teamid => dispatch(getTwitterfeeds(teamid)),
		setTwitterfeedIndex: index => dispatch(setTwitterfeedIndex(index)),
	};
}
const mapStateToProps = state => ({
	twitterfeeds: state.twitterfeeds.list,
	selectedTwitterfeed: state.twitterfeeds.selectedIndex,
	selectedTeam: state.teams.selectedIndex
});
const TwitterfeedsSwagger = connect(mapStateToProps, bindAction)(Twitterfeeds);
export default TwitterfeedsSwagger;
