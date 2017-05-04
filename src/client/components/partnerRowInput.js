/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';


export default class PartnerRowInput extends Component{

	
	
	render(){


		return <div className="partnerRow">
					<div className="gridFormShort">
						<label className="smallContent">{this.props.number}. Socio</label>
						<div className="inputSingleValue">
							<input className="inputPartnerEmail" type="text" placeholder="e-mail"/>
							<span className="icon-head"></span>
						</div>
					</div>
					<div className="gridFormShort">
						<label className="smallContent">Cargo</label>
						<div className="inputSingleValue">
							<input className="inputPartnerPosition" type="text"/>
							<span></span>
						</div>
					</div>

				</div>

	}
}