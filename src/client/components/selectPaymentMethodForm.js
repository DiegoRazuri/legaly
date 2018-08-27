/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom'

export default class SelectPaymentMethodForm extends Component{

	constructor (props){
		super(props);
		this.state={

			
		}
		
	}


	componentDidMount(){
		window.scrollTo(0, 0)

		$('#btnPay').on('click', function(e) {
			// Abre el formulario con las opciones de Culqi.settings
			Culqi.open();
			e.preventDefault();

			
		});


	}

	
	
	render(){

		let prePrice = this.props.enterpriseInProcessData.price + "00"
		let price = parseInt(prePrice)

		Culqi.settings({
			title: 'Legaly',
			currency: 'PEN',
			description: 'Servicio de constitución',
			amount: price
		});

		//console.log(this.props.enterpriseInProcessData._id)
		Culqi.enterprise_id = this.props.enterpriseInProcessData._id 

		

	

		//parseInt(this.props.enterpriseInProcessData.price)
		let months = ["Enero", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"]

		let date = this.props.enterpriseInProcessData.signAppointmentDate

		let dateArry = date.split("-")

		let day = dateArry[2]

		let num_month = dateArry[1]

		let num_parse = parseInt(num_month)
		let pos = num_parse - 1

		let month = months[pos];

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
							<div className="selectPaymentMethodForm">
								<div id="paymentMethodForm" className="gridForm">
									<h3 className="bigTitlesSS">Selecciona un método de pago</h3>
									<div className="underlineBlue"></div>
									<div className="wrapperBtnPayments">
										<div className="gridBtnPaymentMethod">
											<figure id="btnPay" className="btnIcoPaymentMethod icoCards">
												<img src="css/img/TarjetasPago.svg"/>
											</figure>
											<p className="mediumContent">Tarjetas de crédito o débito</p>
											
										</div>
										<div className="gridBtnPaymentMethod">
											<Link to="/metodo-pago-voucher">
												<figure className="btnIcoPaymentMethod icoVoucher">
													<img src="css/img/VoucherPago.svg"/>
												</figure>
											</Link>
											<p className="mediumContent">Envío de voucher de pago</p>
										</div>
									</div>
									
									
									<div className="btnServiceTicket">
										<p className="mediumContent">Orden de servicio</p>
										<span className="icon-angle-down"></span>
									</div>
								</div>
								<div className="gridLoader" id="loader">
									<div className="loader">loading...</div>
								</div>
								<div id="paymentConfirmation" className="gridForm">
									<h3 className="bigTitlesSS">Pago exitoso</h3>
									<div className="underlineBlue"></div>
									<div className="wrapperPaymentInformation">
										<div className="btnPaymentMethod">
											<figure>
												<img src="css/img/VoucherPago.svg"/>
											</figure>
											
										</div>
										<p className="deliveryInstructions">Tu constitución ya está en proceso. En las próximas 24 horas estará lista la reserva de nombre de tu empresa y te contáctaremos por correo para fijar la fecha y hora para la toma de firmas. Si tienes alguna consulta, puedes contactarnos por los siguientes medios:</p>
										<p className="legalyContactInfo">info@legaly.pe</p>
										<p className="legalyContactInfo">Cel. 912 289 540</p>
										<p className="legalyContactInfo">Cel. 996 005 400</p>
										<Link to="/"><div className="btnPrint mediumContent">Cerrar</div></Link>
										
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