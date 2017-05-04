/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom'

export default class DateForm extends Component{

	constructor (props){
		super(props);
		this.state={
			hour : "8:00"
		}

		this.handleChange = this.handleChange.bind(this);
		
	
	}

	handleDateFormSubmit(){

		let date = document.getElementById("inputDate").value;
		let hour = this.state.hour;
		let location = ReactDom.findDOMNode(this.refs.location_i).value.trim()

		let json={
			date: date,
			hour: hour,
			location: location
		}

		// DATA LISTA PARA ENVIAR A SERVER
		console.log(json)


	}

	handleChange(ev){
		this.setState({hour:ev.target.value});
	}
	
	
	render(){


		return <div className="dateForm">
					<div className="gridForm">
						<h3 className="bigTitlesSS">Delivery - Firma de Constitución</h3>
						<div className="underlineBlue"></div>
						<p className="instructions smallContent">Establece la hora, fecha y dirección de tu preferencia para que uno de nuestros colaboradores vaya con los papeles necesarios para la firma y huella digital de todos los socios. Por lo tanto, todos los fundadores deben de estar para dicha reunión. </p>
						<form>
							<div className="gridFormShort">
								<label className="smallContent">Fecha</label>
								<div className="inputDate">
									<input type="date" id="inputDate"/>
									<span className="icon-layout icoInputDate"></span>
								</div>
							</div>
							<div className="gridFormShort">
								<label className="smallContent">Hora</label>
								<div className="inputSelect">
									
									<select onClick={this.handleChange}>
										<option>8:00 am</option>
										<option>8:30 am</option>
										<option>9:00 am</option>
									</select>
									<span className="icon-clock icoInputSelect"></span>
								</div>
							</div>
							<div className="gridFormLarge">
								<label className="smallContent">Dirección</label>
								<div className="inputSingleValue">
									<input type="text" ref="location_i"/>
									<span className="icon-room"></span>
								</div>
							</div>
							<div className="gridFormLarge gridFormMutable wrapperBtnNext">
								<Link to="/metodo-pago"><div className="btnNext" onClick={this.handleDateFormSubmit.bind(this)}>Siguiente</div></Link>
							</div>
							<div className="gridFormLarge gridFormMutable wrapperBtnTransparent">
								<Link to="/informacion-perosnal"><div className="btnTransparentBackground">Anterior</div></Link>
							</div>
						</form>
					</div>
				</div>

	}
}