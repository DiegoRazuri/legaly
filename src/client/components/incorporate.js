/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Route, Link} from 'react-router-dom'
import { matchPath } from 'react-router'

import EnterpriseInformationForm from './enterpriseInformationForm';
import PersonalInformationForm from './personalInformationForm';
import PartnersAddingForm from './partnersAddingForm';
import DateForm from './dateForm';
import PaymentMethodForm from './paymentMethodForm';


export default class Incorporate extends Component{


	render(){
		console.log("Incorporate props")
		console.log(this.props.enterpriseInProcess)
		console.log(this.props.user)

		return <div className="sectionEnterpriseIncorporation">
					<div className="wrapperIncorporationForm">
						
						<Route path="/informacion-empresa" render={(props) => ( <EnterpriseInformationForm user={this.props.user} enterpriseInProcess={this.props.enterpriseInProcess} enterpriseIdInProcess={this.props.enterpriseIdInProcess} sendEnterpriseInformation={this.props.sendEnterpriseInformation}/>   )}/>
						
						<Route path="/invitar-socios" render={(props) => ( <PartnersAddingForm user={this.props.user} enterpriseInProcess={this.props.enterpriseInProcess} enterpriseIdInProcess={this.props.enterpriseIdInProcess}/>   )}/>
						<Route path="/informacion-personal" render={(props) => ( <PersonalInformationForm/>   )}/>
						<Route path="/fecha-firma" render={(props) => ( <DateForm/>   )}/>
						<Route path="/metodo-pago" render={(props) => ( <PaymentMethodForm/>   )}/>
						
						
						
						
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