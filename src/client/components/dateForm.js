/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom'

export default class DateForm extends Component{



	handleDateFormSubmit(){

		this.props.sendSingingDateInformation.call(null)

	}

	componentDidMount(){
		window.scrollTo(0, 0)
	}
	
	
	
	render(){

		let dataReaderEnterprise = this.props.enterpriseInProcessData;

		let inputDate, selectTime, inputLocation;

		if(dataReaderEnterprise){

			inputDate = <input type="date" id="inputDate" value={dataReaderEnterprise.signAppointmentDate != undefined ? dataReaderEnterprise.signAppointmentDate : ""} onChange={this.props.inputTextHandlerRootLevel.bind()} name="signAppointmentDate"/>;

			selectTime = <select value={dataReaderEnterprise.signAppointmentTime != undefined ? dataReaderEnterprise.signAppointmentTime : ""} onChange={this.props.inputTextHandlerRootLevel.bind()} name="signAppointmentTime">
							<option disabled></option>
							<option>8:00 am</option>
							<option>8:30 am</option>
							<option>9:00 am</option>
							<option>9:30 am</option>
							<option>10:00 am</option>
							<option>10:30 am</option>
							<option>11:00 am</option>
							<option>11:30 am</option>
							<option>12:00 pm</option>
							<option>12:30 pm</option>
							<option>1:00 pm</option>
							<option>1:30 pm</option>
							<option>2:00 pm</option>
							<option>2:30 pm</option>
							<option>3:00 pm</option>
							<option>3:30 pm</option>
							<option>4:00 pm</option>
							<option>4:30 pm</option>
							<option>5:00 pm</option>
							<option>5:30 pm</option>
							<option>6:00 pm</option>

						</select>

			inputLocation = <input type="text" value={dataReaderEnterprise.signAppointmentLocation != undefined ? dataReaderEnterprise.signAppointmentLocation : ""} onChange={this.props.inputTextHandlerRootLevel.bind()} name="signAppointmentLocation"/>

		}


		return <div className="sectionEnterpriseIncorporation">
					<div className="wrapperIncorporationForm">

						<div className="dateForm">
							<div className="gridForm">
								<h3 className="bigTitlesSS">Delivery - Firma de Constitución</h3>
								<div className="underlineBlue"></div>
								<p className="instructions smallContent">Establece la hora, fecha y dirección de tu preferencia para que uno de nuestros colaboradores vaya con los papeles necesarios para la firma y huella digital de todos los socios. Por lo tanto, todos los fundadores deben de estar para dicha reunión. </p>
								<form>
									<div className="gridFormShort">
										<label className="smallContent">Fecha</label>
										<div className="inputDate">
											{inputDate}
											<span className="icon-layout icoInputDate"></span>
										</div>
									</div>
									<div className="gridFormShort">
										<label className="smallContent">Hora</label>
										<div className="inputSelect">
											
											{selectTime}

											<span className="icon-clock icoInputSelect"></span>
										</div>
									</div>
									<div className="gridFormLarge">
										<label className="smallContent">Dirección</label>
										<div className="inputSingleValue">
											
											{inputLocation}

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



					</div>
					

					<div id="faq1" className="wrapperFaq">
						<figure>
							<img src="./css/img/constitucion-photo.jpg"/>
						</figure>
						<div className="gridFaq">
							<h1>¿Por qué es importante constituir mi empresa?</h1>
							<div className="underlineBlue"></div>
							<h2>Porque así podrá crecer tu negocio de una manera legal, segura y eficaz, generando más confianza a tus clientes, teniendo la facilidad de obtener un préstamo al banco y participar en licitaciones con el estado.</h2>
							<div className="btnFaq">Quiero saber más</div>
						</div>
					</div>



					<div className="wrapperComercialFAQ">
						<div className="gridComercialFAQ">
							<figure>
								<img src="css/img/accesible.svg"/>
							</figure>
							<h2 className="landingTitles">¿Cúal es el precio?</h2>
							<h3>Porque así podrá crecer tu negocio de una manera legal, segura y eficaz, generando más confianza a tus clientes, teniendo la facilidad de obtener un préstamo al banco y participar en licitaciones con el estado.</h3>
						</div>
						<div className="gridComercialFAQ">
							<figure>
								<img src="css/img/rapidez.svg"/>
							</figure>
							<h2 className="landingTitles">¿Cúanto debo esperar?</h2>
							<h3>Porque así podrá crecer tu negocio de una manera legal, segura y eficaz, generando más confianza a tus clientes, teniendo la facilidad de obtener un préstamo al banco y participar en licitaciones con el estado.</h3>
						</div>
						<div className="gridComercialFAQ">
							<figure>
								<img src="css/img/delivery.svg"/>
							</figure>
							<h2 className="landingTitles">Brindamos lo siguiente</h2>
							<h3>
								<ul>
									<li>Búsqueda y reserva de nombre</li>
									<li>Estatutos de la empresa</li>
									<li>Escritura pública ante notario</li>
									<li>Inscripción registral en Sunarp</li>
									<li>Ficha RUC</li>
									<li>Copia literal</li>
									<li>Compra de dominio web</li>
								</ul>
							</h3>
						</div>
					</div>
				</div>

	}
}