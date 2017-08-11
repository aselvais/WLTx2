import React, {Component} from "react";
import {connect} from "react-redux";
import {
	Container,
	Content,
	Text,
	Icon,
	Button,
	Right,
	Body,
	Left,
	Picker,
	Form,
	Item as FormItem
} from "native-base";

import {
	StackNavigator,
} from "react-navigation";
import Headerbar from '../headerbar';
import styles from "./styles";

const Item = Picker.Item;

/**
 *
 */
class Standings extends Component
{
	/**
	 * Option for the TabNavigation system
	 * @type {{header: null, tabBarLabel: string, tabBarIcon: (function({tintColor?: *}): XML)}}
	 */
	static navigationOptions = {
		header: <Headerbar title="Standings"/>,
		tabBarLabel: 'Standings',
		tabBarIcon: ({tintColor}) => <Icon name="ios-speedometer" style={{color: tintColor}}/>
	};

	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.state = {
			selected1: "key1"
		};
	}

	/**
	 *
	 * @param value
	 */
	onValueChange(value: string)
	{
		this.setState({
			selected1: value
		});
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		const {props: {name, index, list}} = this;
		return (
			<Container style={styles.container}>
				<Form>
					<Picker
						style={{
							backgroundColor: '#DDD',
							width: '100%',
							borderRadius: 0,
							alignItems: 'center',
							alignSelf: 'center',
							justifyContent: 'center',
							borderBottomColor: '#000'
						}}
						iosHeader="Select one"
						mode="dropdown"
						selectedValue={this.state.selected1}
						onValueChange={this.onValueChange.bind(this)}>
						<Item label="MINOR PEEWEE - TIER 0" value="key0"/>
						<Item label="MINOR PEEWEE - TIER 1" value="key1"/>
						<Item label="MINOR PEEWEE - TIER 2" value="key2"/>
						<Item label="MINOR PEEWEE - TIER 3" value="key3"/>
						<Item label="MINOR PEEWEE - TIER 4" value="key4"/>
					</Picker>
				</Form>


				<Content padder>
					<Text>
						Standings HERE ..... !!!!
					</Text>
				</Content>
			</Container>
		);
	}
}


export default Standings;




