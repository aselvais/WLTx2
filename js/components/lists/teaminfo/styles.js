import colors from '../../../libs/Wltcolors';
import {Dimensions} from "react-native";
const React = require('react-native');
import {Image} from "react-native";
const {StyleSheet} = React;

const deviceWidth = Dimensions.get('window').width;

export default {
	linegradientTopGradient: [
		'#000000',
		'#444444',
	],
	row01: {
		// backgroundColor: '#000000',
	},
	imageLogo: {
		resizeMode: 'contain',
		width: (deviceWidth / 4),
		height: (deviceWidth / 4),
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
	backgroundImage: {
		flex: 1,
		width: null,
		height: null
	},
	topButtonsCol: {
		borderTopColor: '#AAAAAA',
		borderTopWidth: 1,
		borderRightColor: '#AAAAAA',
		borderRightWidth: 1,
		backgroundColor: '#EEEEEE',
		justifyContent: 'center',
	},
	topButtonsTxt: {
		fontSize: 15,
		textAlign: 'center',
	},
	rowTxt01: {},
	txtTxt01: {
		padding: 8,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 13,
		backgroundColor: colors.blue,
		color: colors.white,
	},
	rowTxt02: {},
	txtTxt02: {
		padding: 8,
		textAlign: 'center',
		fontSize: 20,
	},
};
