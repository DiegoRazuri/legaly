/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom'

export default class PaymentMethodForm extends Component{

	constructor (props){
		super(props);
		this.state={

			
		}
		
	}

	


	

	componentDidMount(){
		window.scrollTo(0, 0)


	}

	
	
	render(){



	

		//parseInt(this.props.enterpriseInProcessData.price)
		let months = ["Enero", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"]

		let date = this.props.enterpriseInProcessData.signAppointmentDate

		let dateArry = date.split("-")

		let day = dateArry[2]

		let pos = dateArry[1]

		let month = months[parseInt(pos)];

		let year = dateArry[0]

		let num_position = 0


		for(let i=0; i<this.props.enterpriseInProcessData.partners.length; i++){
						
			if(this.props.enterpriseInProcessData.partners[i].position != '' && this.props.enterpriseInProcessData.partners[i].position != "Ninguno"){
				
				num_position = num_position + 1;
			}
		}

		let notaryLocation;

		let signAppointmentLocation = this.props.enterpriseInProcessData.signAppointmentLocation;

		switch(signAppointmentLocation){
			case "San Isidro" : notaryLocation = "Notaria Tinageros| Av. Canaval y Moreyra Nº 425 Ofs: 21 - 22 y 23; 2do piso, San Isidro."
				break;
			case "Magdalena": notaryLocation = "Notaria Acevedo Mendoza| Av. Javier Prado oeste Nº 850, Magdalena del Mar."
				break;
			case "San Miguel": notaryLocation = "Notaria Landázuri| Av. Brigida Silva Ochoa Nº 398 Of: 204 - 2do piso, San Miguel (Esq. cdra. 22 av. La Marina)."
				break;
			case "Cercado de Lima": notaryLocation = "Notaria Donato Carpio Vélez| Av. República de Chile Nº 295 Of. 205; 2do piso, Sta. Beatriz (Lima)."
				break;
		}


		return <div className="sectionEnterpriseIncorporation">
					<div className="wrapperIncorporationForm">

						<div className="wrapperPaymentMethodForm">
							<div className="paymentMethodForm">
								<div className="gridForm">
									<h3 className="bigTitlesSS">Envío de voucher de pago</h3>
									<div className="underlineBlue"></div>
									<div className="wrapperBtnPayments">
										<div className="btnPaymentMethod">
											<figure>
												<img src="css/img/VoucherPago.svg"/>
											</figure>
											
										</div>
										<p className="deliveryInstructions">Una vez que hayas realizado el depósito, el proceso de tu constitución iniciará con la reserva de nombre, la cual tarda cerca de 24 horas en tener respuesta. Luego, te enviaremos por correo la minuta para que nos des tu aprobación. Finalmente, con el visto bueno se emitirá el testimonio y te especificaremos lugar, hora y fecha de la toma de firma de los socios. No olvides contactarnos en cuanto hayas realizado el pago.</p>
										<p className="legalyContactInfo">info@legaly.pe</p>
										<p className="legalyContactInfo">Cel. 912 289 540</p>
										<p className="legalyContactInfo">Cel. 996 005 400</p>
										<p className="legalyContactInfo">BBVA Continental cta 0011 - 0383 - 0200182247</p>
										<p className="legalyContactInfo">BCP cta 192 - 36010048 - 0 - 85</p>
										<p className="legalyContactInfo">Interbank cta 200-3108756220</p>
										<Link to="/"><div className="btnPrint mediumContent">Cerrar</div></Link>
										
									</div>
									
									<div className="btnServiceTicket">
										<p className="mediumContent">Orden de servicio</p>
										<span className="icon-angle-down"></span>
									</div>
								</div>
								
							</div>
				
							<div className="serviceTicket">
								<h3 className="bigTitlesSS">Orden de servicio</h3>
								<div className="underlineBlue"></div>
								<p className="detailName mediumContent">Servicio</p>
								<p className="mediumContent detail">Constitución</p>
								<p className="detailName mediumContent">Detalles</p>
								<p className="mediumContent detail">{num_position} Gerentes</p>
								<p className="mediumContent detail">{this.props.enterpriseInProcessData.totalCapital} capital</p>
								<p className="detailName mediumContent">Precio</p>
								<p className="price mediumContent">S/. {this.props.enterpriseInProcessData.price}</p>
								<p className="detailName mediumContent">Fin de proceso</p>
								<p className="mediumContent detail">7 días hábiles posterior a la toma de firma</p>
								<div className="btnPrint mediumContent">Imprimir Recibo</div>
								<div className="underlineGrey"></div>
								<h3 className="bigTitlesSS subtitle">Toma de firma</h3>
								<div className="underlineBlue"></div>
								<p className="deliveryLocation mediumContent">{notaryLocation}</p>
								<p className="deliveryDate mediumContent">{day} de {month} del {year}</p>
							</div>

							<div className="gridUserHelp">
								<h4 className="bigTitlesOS helpTitle">¿Necesitas ayuda?</h4>
								<div className="underlineWhite"></div>
								<span className="icon-angle-down"></span>
								<a href="http://www.facebook.com/legaly.pe" target="_blank" className="gridUserSupport">
									<span className="icon-whatsapp"></span>
									<p className="smallContent">www.facebook.com/legaly.pe</p>
								</a>
								<div className="gridUserSupport">
									<span className="icon-mail_outline"></span>
									<p className="smallContent">info@legaly.pe</p>
								</div>
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

//<div className="btnFaq">Quiero saber más</div>