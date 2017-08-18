import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {
	Container,
	Header,
	Title,
	Content,
	Text,
	Button,
	Icon,
	Left,
	Right,
	Body
} from "native-base";

import styles from "./styles";

/**
 *
 */
class BlankPage extends Component
{
	/**
	 *
	 * @type {{header: XML}}
	 */
	static navigationOptions = {
		header: <Header>
			<Left>
				<Button transparent onPress={() => this.props.navigation.goBack()}>
					<Icon name="ios-arrow-back"/>
				</Button>
			</Left>
			<Body>
				<Title>{this.name ? this.props.name : "Blank Page"}</Title>
			</Body>
			<Right/>
		</Header>
	};

	/**
	 *
	 * @type {{name, index, list: *, openDrawer}}
	 */
	static propTypes = {
		name: PropTypes.string,
		index: PropTypes.number,
		list: PropTypes.arrayOf(React.PropTypes.string),
		openDrawer: PropTypes.func
	};

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		const {props: {name, index, list}} = this;
		console.log(this.props.navigation, "000000000");
		return (
			<Container style={styles.container}>
				<Content padder>
					<Text>
						{this.props.navigation.state.params.name.item !== undefined
							? this.props.navigation.state.params.name.item
							: "Create Something Awesome . . ."}
					</Text>
				</Content>
			</Container>
		);
	}
}

/**
 *
 * @param dispatch
 * @returns {{openDrawer: (function(): *)}}
 */
function bindAction(dispatch)
{
	return {
		openDrawer: () => dispatch(openDrawer())
	};
}

/**
 *
 * @param state
 */
const mapStateToProps = state => ({
	name: state.user.name,
	index: state.list.selectedIndex,
	list: state.list.list
});

export default connect(mapStateToProps, bindAction)(BlankPage);
