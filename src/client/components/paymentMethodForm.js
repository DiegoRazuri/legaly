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

			months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"]
		}
		
	}

	componentDidMount(){
		window.scrollTo(0, 0)
	}	


	
	
	render(){

		let date = this.props.enterpriseInProcessData.signAppointmentDate

		let dateArry = date.split("-")

		let day = dateArry[2]

		let pos = dateArry[1]

		let month = this.state.months[pos];

		let year = dateArry[0]

		let num_position = 0


		for(let i=0; i<this.props.enterpriseInProcessData.partners.length; i++){
						
			if(this.props.enterpriseInProcessData.partners[i].position != '' && this.props.enterpriseInProcessData.partners[i].position != "Ninguno"){
				
				num_position = num_position + 1;
			}
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
										<p className="deliveryInstructions">Establece la hora, fecha y dirección de tu preferencia para que uno de nuestros colaboradores vaya con los papeles necesarios para la firma y huella digital de todos los socios. Por lo tanto, todos los fundadores deben de estar para dicha reunión.</p>
										<p className="legalyContactInfo">pagos@legaly.pe</p>
										<p className="legalyContactInfo">BCP cta xxx 192 - 111111111</p>
										<Link to="/"><div className="btnPrint mediumContent">Confirmar</div></Link>
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
								<p className="mediumContent detail">8 páginas</p>
								<p className="detailName mediumContent">Precio</p>
								<p className="price mediumContent">S/. {this.props.enterpriseInProcessData.price}.00</p>
								<p className="detailName mediumContent">Delivery</p>
								<p className="mediumContent detail">72 horas</p>
								<div className="btnPrint mediumContent">Imprimir Recibo</div>
								<div className="underlineGrey"></div>
								<h3 className="bigTitlesSS subtitle">Delivery</h3>
								<div className="underlineBlue"></div>
								<p className="deliveryLocation mediumContent">{this.props.enterpriseInProcessData.signAppointmentLocation}</p>
								<p className="deliveryDate mediumContent">{day} de {month} del {year} a las {this.props.enterpriseInProcessData.signAppointmentTime}</p>
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
									<p className="smallContent">ayuda@legaly.pe</p>
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