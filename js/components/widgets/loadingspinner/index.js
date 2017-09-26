import React, {Component} from "react";
import {
	Dimensions
} from "react-native";
import {
	Container,
	Content,
	Spinner
} from "native-base";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;


/**
 *
 */
class Loadingspinner extends Component
{
	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.state = {
			loading: false
		};
	}




	/**
	 *
	 * @returns {XML}
	 */
	render()
	{

		return (
			<Container style={{
				flex: 1,
				position: 'absolute',
				left: 0,
				top: 0,
				opacity: 1,
				backgroundColor: 'white',
				width: deviceWidth,
				height: deviceHeight,
				alignItems: 'center',
				alignSelf: 'center',
				justifyContent: 'center'
			}}>
				<Content style={{
					width: deviceWidth,
					height: deviceHeight
				}}>
					<Spinner color="black"/>
				</Content>
				{this.props.children}
			</Container>
		);
	}
}

export default Loadingspinner;
