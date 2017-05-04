/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';


export default class GoodRowInput extends Component{



	
	
	render(){

		return <div className="goodRow">
					<div className="gridFormShort">
						<label className="smallContent">{this.props.number}. Bien</label>
						<div className="inputSingleValue">
							<input type="text"/>
							<span className="icon-box"></span>
						</div>
					</div>
					<div className="gridFormShort">
						<label className="smallContent">Valor</label>
						<div className="inputSingleValue">
							<input type="number"/>
							<span className="icon-usd"></span>
						</div>
					</div>
				</div>

	}
}