/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom'

export default class Landing extends Component{

	
	componentDidMount(){
		window.scrollTo(0, 0)
		this.props.resetEnterpriseRegistrationData.call(null)
	}
	
	render(){


		return <div className="wrapperLanding">
					<div className="wrapperBanner">
						<div className="bannerScene">
							<div className="gridConstitucionEmpresas">
								<figure className="bannerIco">
									<img src="css/img/Constitucion-icon.svg"/>
								</figure>
								<h1>Constituye tu empresa desde S/ 650.00 sin moverte de tu lugar.</h1>
								<p>Todos los trámites garantizados desde la comodidad de tu oficina u hogar</p>
								<div><Link to="/informacion-empresa">Constituir ahora</Link></div>
								<a href="#">¿Cómo funciona?</a>
							</div>
							<div className="gridRegistraMarca">
								<figure className="bannerIco">
									<img src="css/img/Registromarca-icon.svg"/>
								</figure>
								<h1>Registra tu marca, te asistimos en cada paso del proceso.</h1>
								<p>Todos los trámites garantizados desde la comodidad de tu oficina u hogar</p>
								<div>Registra ahora</div>
								<a href="#">¿Cómo funciona?</a>
							</div>
						</div>
						<div className="gridPagination">
							<span className="gridActive">·</span>
							<span>·</span>
						</div>
					</div>
					<div className="wrapperBenefits">
						<h4 className="landingTitles">¿Como te podemos ayudar?</h4>
						<div className="underlineBlue"></div>
						<div className="wrapperInfoBenefits">
							<div className="gridBenefit">
								<figure>
									<img src="css/img/rapidez.svg"/>
								</figure>
								<h2>Rapidez</h2>
								<h3>Ahorra tiempo y llena el formulario desde donde te encuentres. Será procesado de inmediato.</h3>
							</div>
							<div className="gridBenefit">
								<figure>
									<img src="css/img/accesible.svg"/>
								</figure>
								<h2>Accesible</h2>
								<h3>Nuestra plataforma y asesores te orientarán para ajustar tu inversión y prevenir futuros gastos.</h3>
							</div>
							
							<div className="gridBenefit">
								<figure>
									<img src="css/img/delivery.svg"/>
								</figure>
								<h2>Delivery</h2>
								<h3>Invierte tu tiempo en construir tu negocio, nosotros llevamos a tus manos toda la documentación.</h3>
							</div>
							<div className="gridBenefit">
								<figure>
									<img src="css/img/seguridad.svg"/>
								</figure>
								<h2>Seguridad</h2>
								<h3>Contamos con el respaldo de la notaria Párraga y colaboradores certificados por el colegio de notarios</h3>
							</div>
						</div>
						
					</div>
					<div id="faq1" className="wrapperFaq">
						<figure>
							<img src="css/img/constitucion-photo.jpg"/>
						</figure>
						<div className="gridFaq">
							<h1>¿Por qué es importante constituir mi empresa?</h1>
							<div className="underlineBlue"></div>
							<h2>Porque así podrá crecer tu negocio de una manera legal, segura y eficaz, generando más confianza a tus clientes, teniendo la facilidad de obtener un préstamo al banco y participar en licitaciones con el estado.</h2>
							<div className="btnFaq">Quiero saber más</div>
						</div>
					</div>
					<div id="faq2" className="wrapperFaq">
						<figure>
							<img src="css/img/registromarca-photo.jpg"/>
						</figure>
						<div className="gridFaq">
							<h1>¿Por qué debo registrar y proteger mi marca?</h1>
							<div className="underlineBlue"></div>
							<h2>Porque así podrá crecer tu negocio de una manera legal, segura y eficaz, generando más confianza a tus clientes, teniendo la facilidad de obtener un préstamo al banco y participar en licitaciones con el estado.</h2>
							<div className="btnFaq">Quiero saber más</div>
						</div>
					</div>

					<div className="wrapperTestimonials">
						<h4 className="landingTitles">Clientes satisfechos nos cuentas su experiencia</h4>
						<div className="underlineBlue"></div>
						<div className="wrapperWidgetTestimonials">
							
							<div className="wrapperInfoTestimonials">
								<div id="testimonial1" className="gridTestimonial">
									<figure>
										<img src="css/img/sean-rico.jpg"/>
									</figure>
									<div className="gridScore">
										<span className="icon-star"></span>
										<span className="icon-star"></span>
										<span className="icon-star"></span>
										<span className="icon-star"></span>
									</div>
									<p className="testimonial">Perfecto, rápido y muy eficientes.</p>
									<p className="clientName">Sean Rico</p>
									<p className="clientEnterpriseName">Plataforma Zas S.A.C.</p>
								</div>
								<div id="testimonial2" className="gridTestimonial">
									<figure>
										<img src="css/img/cristian-rivero.jpeg"/>
									</figure>
									<div className="gridScore">
										<span className="icon-star"></span>
										<span className="icon-star"></span>
										<span className="icon-star"></span>
										<span className="icon-star"></span>
										<span className="icon-star"></span>
									</div>
									<p className="testimonial">Muy responsables en su trabajo y son una empresa comprometida con la satisfacción de sus clientes, mucho éxito!</p>
									<p className="clientName">Cristian Rivero</p>
									<p className="clientEnterpriseName">CRISTIAN RIVERO PRODUCCIONES E.I.R.L.</p>
								</div>
								<div id="testimonial3" className="gridTestimonial">
									<figure>
										<img src="css/img/roll-star.png"/>
									</figure>
									<div className="gridScore">
										<span className="icon-star"></span>
										<span className="icon-star"></span>
										<span className="icon-star"></span>
										<span className="icon-star"></span>
									</div>
									<p className="testimonial">Ahorre mucho tiempo. Tienen un servicio súper práctico y rápido. Esto es lo que necesitaba y lo encontré en este gran equipo.</p>
									<p className="clientName">Francisco Sierralta Sarco</p>
									<p className="clientEnterpriseName">Roll Star Sushi Bar E.I.R.L.</p>
								</div>
								
							</div>
							
						</div>
					</div>
					<div className="wrapperCounters">
						<h4 className="landingTitles">Ayudando a emprendedores a cumplir sus sueños</h4>
						<div className="underlineBlue"></div>
						<div className="wrapperInfoCounters">
							<div className="gridCounter">
								<span className="icon-paper"></span>
								<p className="number">423</p>
								<p className="counterName">Empresas constituidas</p>
							</div>
							<div className="gridCounter">
								<span className="icon-circle-check"></span>
								<p className="number">112</p>
								<p className="counterName">Marcas registradas</p>
							</div>
							<div className="gridCounter">
								<span className="icon-briefcase"></span>
								<p className="number">106</p>
								<p className="counterName">Empresas asesoradas</p>
							</div>
						</div>
					</div>
				</div>

	}
}