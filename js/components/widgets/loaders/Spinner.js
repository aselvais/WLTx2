import React, {Component} from "react";
import {
	Spinner
} from "native-base";
import {connect} from "react-redux";

/**
 *
 */
class SpinnerCustom extends Component
{
	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		return (this.props.loading) ? <Spinner color="black"/> : null;
	}
}

function bindAction(dispatch) { return {}; }
const mapStateToProps = state => ({ loading: state.loading.globalstatus });
const SpinnerCustomSwagger = connect(mapStateToProps, bindAction)(SpinnerCustom);
export default SpinnerCustomSwagger;
