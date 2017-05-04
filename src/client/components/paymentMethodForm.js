/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom'

export default class PaymentMethodForm extends Component{

	
	
	render(){


		return <div className="wrapperPaymentMethodForm">
					<div className="paymentMethodForm">
						<div className="gridForm">
							<h3 className="bigTitlesSS">Selecciona un método de pago</h3>
							<div className="underlineBlue"></div>
							<div className="wrapperBtnPayments">
								<div className="btnPaymentMethod">
									<figure>
										<img src="#"/>
									</figure>
									<p className="smallContent">Tarjeta de crédito o débito</p>
								</div>
								<div className="btnPaymentMethod">
									<figure>
										<img src="#"/>
									</figure>
									<p className="smallContent">Envío de voucher de pago</p>
								</div>
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
						<p className="detailName mediumContent">Producto</p>
						<p className="mediumContent detail">Constitución</p>
						<p className="detailName mediumContent">Detalles</p>
						<p className="mediumContent detail">3 Gerentes</p>
						<p className="mediumContent detail">20k capital</p>
						<p className="mediumContent detail">8 páginas</p>
						<p className="detailName mediumContent">Precio</p>
						<p className="price mediumContent">S/. 750.00</p>
						<p className="detailName mediumContent">Delivery</p>
						<p className="mediumContent detail">72 horas</p>
						<div className="btnPrint mediumContent">Imprimir Recibo</div>
						<div className="underlineGrey"></div>
						<h3 className="bigTitlesSS subtitle">Delivery</h3>
						<div className="underlineBlue"></div>
						<p className="deliveryLocation mediumContent">Jirón Félix Dibós #791 Magdalena del Mar</p>
						<p className="deliveryDate mediumContent">Lunes 28 de Mayo 5:00 pm</p>
					</div>

					<div className="gridUserHelp">
						<h4 className="bigTitlesOS helpTitle">¿Necesitas ayuda?</h4>
						<div className="underlineWhite"></div>
						<span className="icon-angle-down"></span>
						<div className="gridUserSupport">
							<span className="icon-whatsapp"></span>
							<p className="smallContent">942 914 542</p>
						</div>
						<div className="gridUserSupport">
							<span className="icon-mail_outline"></span>
							<p className="smallContent">ayuda@legitify.com</p>
						</div>
					</div>
			</div>

	}
}