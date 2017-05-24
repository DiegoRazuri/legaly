/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';


export default class BtnUserprofileInfoText extends Component{

	
	render(){


		return <div className={this.props.classSelected} onClick={this.props.switchPartnerSelected.bind(this, this.props.pos)}>
					<p>{this.props.btnText}</p>
				</div>
				

	}
}