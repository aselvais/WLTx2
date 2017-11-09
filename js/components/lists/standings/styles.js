import colors from '../../../libs/Wltcolors';

const React = require('react-native');
const {StyleSheet} = React;

export default {
	griditem:
		{
			margin: 3,
			borderBottomLeftRadius: 7,
			borderBottomRightRadius: 7,
			borderBottomColor: '#AAAAAA',
			borderBottomWidth: 1,
			borderRightColor: '#AAAAAA',
			borderRightWidth: 1,
		},
	griditemTop:
		{},
	topText:
		{
			borderTopLeftRadius: 7,
			borderTopRightRadius: 7,
			fontWeight: 'bold',
			textAlign: 'left',
			backgroundColor: colors.blue,
			color: colors.white,
			padding: 5,
		},
	griditemBottom:
		{
			backgroundColor: colors.white,
			padding: 5,
			borderRadius: 7,
		},
	titleRow: {
		borderBottomColor: colors.grey,
		borderBottomWidth: 1,
	},
	titleline:
		{
			borderBottomColor: colors.grey,
			paddingTop: 3,
			paddingBottom: 5,
		},
	txtItem: {
		paddingTop: 5,
		paddingBottom: 5,
		fontSize: 12,
	},
	logoTeam: {
		paddingTop: 5,
		width: 20,
		height: 20
	},
};
