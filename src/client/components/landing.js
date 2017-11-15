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
									<img src="css/img/Constitucion-icon.svg" alt="constitución de empresas - legaly"/>
								</figure>
								<h1>Constituye tu empresa desde S/ 650.00 todo incluido y asesoría totalmente gratuita</h1>
								<p>¿Consultas?</p>
								<p><span className="icon-whatsapp"></span> 942 914 542</p>
								<p><span className="icon-mail_outline"></span> info@legaly.pe</p>
								<div><Link to="/login">Iniciar proceso</Link></div>
								
							</div>
							<div className="gridRegistraMarca">
								<figure className="bannerIco">
									<img src="css/img/Registromarca-icon.svg" alt="registro de marca - legaly"/>
								</figure>
								<h1>Registra tu marca, te asistimos en cada paso del proceso.</h1>
								<p>Todos los trámites garantizados desde la comodidad de tu oficina u hogar</p>
								<div>Registra ahora</div>
								<a href="#">¿Cómo funciona?</a>
							</div>
						</div>
						<div className="gridPagination">
							
						</div>
					</div>
					<div className="wrapperBenefits">
						<h4 className="landingTitles">¿Por qué constituir con nosotros?</h4>
						<div className="underlineBlue"></div>
						<div className="wrapperInfoBenefits">
							<div className="gridBenefit">
								<figure>
									<img src="css/img/rapidez.svg" alt="servicio rápido de constitución - legaly"/>
								</figure>
								<h2>Rapidez</h2>
								<h3>Inicia tu constitución en linea sin colas ni esperas, llena los formularios, elige la notaría de tu preferencia para la toma de firmas y envíanos el depósito (los gastos notariales ya están incluidos en el precio).</h3>
							</div>
							<div className="gridBenefit">
								<figure>
									<img src="css/img/accesible.svg" alt=""/>
								</figure>
								<h2>Incluye</h2>
								<h3>Reserva del nombre<br/>Elaboración de minuta<br/>Escritura pública<br/>Inscripción en Sunarp<br/>Copia Literal</h3>
							</div>
							
							<div className="gridBenefit">
								<figure>
									<img src="css/img/delivery.svg"/>
								</figure>
								<h2>Asesoría</h2>
								<h3>Si tienes dudas, nosotros las resolvemos. Nuestro equipo de abogados te ayudarán a constituir una mype capaz de convertirse en una transnacional.</h3>
							</div>
							<div className="gridBenefit">
								<figure>
									<img src="css/img/seguridad.svg"/>
								</figure>
								<h2>Seguridad</h2>
								<h3>Contamos con el respaldo de la <a href="http://www.notariatinageros.com/">Notaría Tinageros</a>, <a href="http://http://notariaacevedomendoza.com/">Notaría Acevedo Mendoza</a>, <a href="https://www.notariacarpiovelez.com/">Notaría Carpio Vélez</a> y <a href="http://www.notarialandazuri.com/">Notaría Landázuri</a>. Además, de colaboradores certificados por el colegio de notarios.</h3>
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
							<h2>Porque ganarás más dinero. Si tu objetivo es crear riqueza mediante tu empresa, entonces tienes que generar seguridad en tus potenciales clientes y red de contactos. Ser confiable es ser una empresa formal. Te verán con otros ojos, proyectarás una imagen más sólida, podrás licitar con el estado y te recomendarán con absoluta confianza.</h2>
							
						</div>
					</div>
					<div id="faq2" className="wrapperFaq">
						<figure>
							<img src="css/img/registromarca-photo.jpg"/>
						</figure>
						<div className="gridFaq">
							<h1>¿Qué otros trámites me puede facilitar Legaly?</h1>
							<div className="underlineBlue"></div>
							<h2>También ofrecemos servicios de registro de marca, cambio de denominación, transferencia de participaciones, nombramiento de cargo, renuncia y nombramiento de cargo, transferencia de acciones, transformación de tipo societario y modificación de objeto social. Puedes realizar las consultas al 942 914 542</h2>
						</div>
					</div>

					<div className="wrapperTestimonials">
						<h4 className="landingTitles">Clientes satisfechos nos cuentas su experiencia</h4>
						<div className="underlineBlue"></div>
						<div className="wrapperWidgetTestimonials">
							
							<div className="wrapperInfoTestimonials">
								
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
								
							</div>
							
						</div>
					</div>
					<div className="wrapperCounters">
						<h4 className="landingTitles">Ayudando a emprendedores a cumplir sus sueños</h4>
						<div className="underlineBlue"></div>
						<div className="wrapperInfoCounters">
							<div className="gridCounter">
								<span className="icon-paper"></span>
								<p className="number">1073</p>
								<p className="counterName">Empresas constituidas</p>
							</div>
							<div className="gridCounter">
								<span className="icon-circle-check"></span>
								<p className="number">131</p>
								<p className="counterName">Marcas registradas</p>
							</div>
							<div className="gridCounter">
								<span className="icon-briefcase"></span>
								<p className="number">102</p>
								<p className="counterName">Empresas asesoradas</p>
							</div>
						</div>
					</div>
				</div>

	}
}

//<a href="#">¿Cómo funciona?</a>

/*
<span className="gridActive">·</span>
<span>·</span>

*/

//<div className="btnFaq">Quiero saber más</div>