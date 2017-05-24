/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom'

export default class ServiceState extends Component{


	render(){

		let progress

		progress = 100 / this.props.enterprise.serviceState


		return <div className="blockServiceState">
					<figure className="serviceImage">
						<img src="css/img/Constitucion-icon.svg"/>
					</figure>
					<h6 className="bigTitlesOS serviceEnterpriseName">{this.props.enterprise.name ? this.props.enterprise.name : this.props.enterprise.optionNames[0]}</h6>
					<div className="wrapperPie">
						<div className="pie">
							<div className="dataBackground"></div>
							<div className="pieData">{progress}%</div>
						</div>	
					</div>
					
				</div>



	}
}