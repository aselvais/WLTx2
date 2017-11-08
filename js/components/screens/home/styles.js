import colors from '../../../libs/Wltcolors';
import {Dimensions} from "react-native";
const React = require('react-native');
const {StyleSheet} = React;

const deviceWidth = Dimensions.get('window').width;

export default {
	container: {
		// backgroundColor: '#FFFFFF',
	},
	backgroundImage: {
		flex: 1,
		width: null,
		height: null
	},
	imageLogo: {
		resizeMode: 'contain',
		width: (deviceWidth / 2.5),
		height: (deviceWidth / 2.5),
	},
	row01textName: {
		backfaceVisibility: 'hidden',
		color: '#FFFFFF',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
		backgroundColor: 'rgba(0,0,0,0)',
	},
	row01textDivName: {
		color: '#DDDDDD',
		textAlign: 'center',
		fontSize: 13,
		backgroundColor: 'rgba(0,0,0,0)',
	},
	row: {
		flex: 1,
		alignItems: 'center',
	},
	text: {
		fontSize: 15,
		marginBottom: 15,
	},
	mt: {
		marginTop: 18,
	},
	tabbarText: {
		fontSize: 9
	}
};
