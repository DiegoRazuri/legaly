/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';


export default class GoodRowInput extends Component{

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
			partnerSelected: this.props.partnerSelected,
			inputPos : this.props.goodListPos
		}

		this.props.deleteRowInputHandle.call(null, json)
	}

	
	
	render(){

		return <div className="goodRow goodRowInfo" data-goodlistpos={this.props.goodListPos}>
					<div className="gridFormShort gridName">
						<label className="smallContent">{this.props.number}. Bien</label>
						<p className="smallContent">{this.props.goodInfo.goodName}</p>
						
					</div>
					<div className="gridFormShort gridValue">
						<label className="smallContent">Valor</label>
						<p className="smallContent">S/. {this.props.goodInfo.goodValue}.00</p>
						
					</div>
					<span className="icon-cross smallContent" onClick={this.deletingRow.bind()}></span>
				</div>

	}
}