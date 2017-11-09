/* @flow */

import React, {Component} from 'react';
import {ProgressViewIOS} from 'react-native';

class ProgressBarNB extends React.PureComponent
{


	render()
	{

		return (
			<ProgressViewIOS
				{...this.props}
				progress={this.props.progress ? this.props.progress / 100 : 0.5}
				progressTintColor={this.props.color ? this.props.color : '#FFF'}
				trackTintColor='rgba(255,255,255,0.5)'
			/>
		);
	}

}

export default ProgressBarNB;
