/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';


export default class PartnerRowInput extends Component{

	constructor (props){
		super(props);
		this.state={

			partnerSelected: 0,
			numberOfGoods : 1,
		}

		this.deletingRow = this.deletingRow.bind(this);
		
		
	}

	deletingRow(){
		let json ={
			partnerSelected: this.props.partnerListPos,
			user_id : this.props.user_id,
			enterprise_id : this.props.enterprise_id,
			partner_id : this.props.partner_id
		}

		this.props.deletingPartnerRow.call(null, json)
	}

	
	
	render(){

		return <div className="partnerRow partnerRowInfo" data-partnerlistpos={this.props.partnerListPos}>
					<div className="gridFormShort gridEmail">
						<label className="smallContent">{this.props.number}. Socio</label>
						<p className="smallContent">{this.props.name}</p>
						
					</div>
					<div className="gridFormShort gridPosition">
						<label className="smallContent">Cargo</label>
						<p className="smallContent">{this.props.position}</p>
						
					</div>
					<span className="icon-cross smallContent" onClick={this.deletingRow.bind()}></span>
				</div>

	}
}