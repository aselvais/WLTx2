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
	{
	},
	topText:
	{
		borderTopLeftRadius: 7,
		borderTopRightRadius: 7,
		fontWeight: 'bold',
		textAlign: 'center',
		backgroundColor: colors.blue,
		color: colors.white,
		padding: 3,
	},
	griditemBottom:
	{
		backgroundColor: colors.white,
		padding: 5,
		borderRadius: 7,
	},
	titleline:
	{
		fontWeight: 'bold',
	}
};
