import {Dimensions} from "react-native";
const deviceWidth = Dimensions.get('window').width;

export default {
	container: {
		backgroundColor: '#FFFFFF',
	},
	colTitle: {
		paddingTop: 20,
		paddingBottom: 20
	},
	col1Text: {
		fontWeight: 'bold'
	},
	image: {
		resizeMode: 'contain',
		width: (deviceWidth / 4),
		height: (deviceWidth / 4)
	},
};
