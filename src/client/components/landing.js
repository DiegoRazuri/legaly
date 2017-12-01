/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom'

export default class Landing extends Component{

	constructor (props){
		super(props);
		this.state={


		}

		this.scrollinContact = this.scrollinContact.bind(this);
		this.scrollinProduct = this.scrollinProduct.bind(this);
		this.scrollinPricing = this.scrollinPricing.bind(this);
		this.scrollinNotaries = this.scrollinNotaries.bind(this);

		
	}

	scrollinContact(){

		let p = document.querySelector('#contact').offsetTop;
		let pos = p - 70


		window.scroll({
			top : pos,
			left : 0,
			behavior: 'smooth'
		})
	}
	scrollinProduct(){

		let ventana_ancho = $(window).width();
		let val;

		if(ventana_ancho > 700){
			val = 190
		}else{
			val = 120
		}

		let p = document.querySelector('#product').offsetTop;
		let pos = p - val


		window.scroll({
			top : pos,
			left : 0,
			behavior: 'smooth'
		})
	}
	scrollinPricing(){

		let p = document.querySelector('#pricing').offsetTop;
		let pos = p - 70


		window.scroll({
			top : pos,
			left : 0,
			behavior: 'smooth'
		})
	}
	scrollinNotaries(){

		let p = document.querySelector('#notaries').offsetTop;
		let pos = p - 70


		window.scroll({
			top : pos,
			left : 0,
			behavior: 'smooth'
		})
	}
	

	componentDidMount(){
		window.scrollTo(0, 0)
		this.props.resetEnterpriseRegistrationData.call(null)

	}
	
	render(){


		return <div className="wrapperLanding">
					<div className="wrapperBanner">
						<div className="wrapperTxt">
							<h1 className="landingTitles">Inicia tu constitución en 20 minutos</h1>
							<h2 className="bigContent">Olvídate de trámites y largas colas</h2>
							<div className="ctaA">
								<Link to="/login">Crear mi empresa</Link>
							</div>
							<div onClick={this.scrollinContact.bind(this)} id="btnContact" className="ctaB" data-direct="#contact">
								<p>¿Consultas?</p>
							</div>
							<h2 className="mediumContent contactNum"><span className="icon-whatsapp"></span>942 914 542</h2>
							<h2 className="mediumContent contactNum"><span className="icon-office"></span>01 420 6162</h2>
						</div>
					</div>
					<div className="wrapperProductInfo">
						<div className="infoNav">
							<div className="gridTitle">
								<div className="wrapperTxt">
									<p className="navTitle">Los beneficios</p>
									<p className="navSubtitle">usando nuestra plataforma</p>
								</div>
							</div>
							<div className="infoNavBtn" id="btnProduct" data-direct="#product" onClick={this.scrollinProduct.bind(this)}>
								<div className="gridInfoNav">
									<div className="wrapperIcos">
										<figure className="ico">
											<img src="css/img/ComoFuncionaIcono.svg"/>
										</figure>
										<figure className="icoSelected">
											<img src="css/img/ComoFuncionaIconoAzul.svg"/>
										</figure>
									</div>
									<p className="btnTitle smallContent">¿Como funciona?</p>
								</div>
							</div>
							<div className="infoNavBtn" id="btnPricing" data-direct="#pricing" onClick={this.scrollinPricing.bind(this)}>
								<div className="gridInfoNav">
									<div className="wrapperIcos">
										<figure className="ico">
											<img src="css/img/ChanchoAhorroIcono.svg"/>
										</figure>
										<figure className="icoSelected">
											<img src="css/img/ChanchoAhorroIconoAzul.svg"/>
										</figure>
									</div>
									<p className="btnTitle smallContent">Precio</p>
								</div>
							</div>
							<div className="infoNavBtn" id="btnNotaries" data-direct="#notaries" onClick={this.scrollinNotaries.bind(this)}>
								<div className="gridInfoNav">
									<div className="wrapperIcos">
										<figure className="ico">
											<img src="css/img/NotariasAlianzasIcono.svg"/>
										</figure>
										<figure className="icoSelected">
											<img src="css/img/NotariasAlianzasIconoAzul.svg"/>
										</figure>
									</div>
									<p className="btnTitle smallContent">Notarias aliadas</p>
								</div>
							</div>
						</div>
						<div className="wrapperInfoA" id="product">
							<div className="wrapperA">
								<div className="gridA">
									<div className="wrapperTxt">
										<h5 className="landingTitles">¿Cómo funciona?</h5>
										<div className="wrapperContent">
											<p className="instructionTitle smallContent">Llena un simple formulario</p>
											<p className="instructionDescrip smallContent">Dale click a “crear mi empresa” y registrate con la red social de tu preferencia. Luego, llena un formulario con la información de tu negocio y la de tus socios. Si tienes dudas solicita una asistencia telefónica para asesorarte paso a paso. Las consultas no tienen costo!</p>
										</div>
									</div>

								</div>
								<div className="gridB">
									<figure>
										<img src="css/img/ComoFunciona1.png"/>
									</figure>
								</div>
							</div>
							<div className="wrapperB">
								<div className="gridA">
									<div className="wrapperTxt">
										<h5 className="landingTitles">Haz un sólo pago</h5>
										<div className="wrapperContent">
											<p className="instructionTitle smallContent">Todos los costos están incluidos</p>
											<p className="instructionDescrip smallContent">Cuando termines de llenar el formulario, la plataforma calculará el precio del servicio. El pago lo puedes hacer mediante depósito bancario en cualquiera de las cuentas que te indicaremos.</p>
										</div>
									</div>

								</div>
								<div className="gridB">
									<figure>
										<img src="css/img/ComoFunciona2.png"/>
									</figure>
								</div>
							</div>
							<div className="wrapperC">
								<div className="gridA">
									<div className="wrapperTxt">
										<h5 className="landingTitles">Ahorra tiempo</h5>
										<div className="wrapperContent">
											<p className="instructionTitle smallContent">Toma de firmas</p>
											<p className="instructionDescrip smallContent">Enfócate en construir tu negocio que nosotros nos ocuparemos de los trámites. Sin que tengas que dar tantas vueltas te citaremos en la notaría de tu preferencia para la toma de firmas. Eso es todo!</p>
										</div>
									</div>

								</div>
								<div className="gridB">
									<figure>
										<img src="css/img/ComoFunciona3.png"/>
									</figure>
								</div>
							</div>
						</div>
						<div className="wrapperInfoB" id="pricing">
							<h4 className="landingTitles">Constitución de empresa</h4>
							<div className="underlineBlue"></div>
							<div className="wrapperPacks">
								<div className="gridPacks">
									<figure>
										<img src="css/img/Positivo1.png"/>
									</figure>
									<div className="pack">
										<div className="gridInfo">
											<h5 className="bigTitlesSS">Paquete Emprende</h5>
											<h5><p className="symbol">S/.</p><p className="price">580</p></h5>
											<ul>
												<li>Asesoría legal</li>
												<li>Reserva de nombre en SUNARP</li>
												<li>Elaboración de minuta</li>
												<li>Escritura pública ante Notario</li>
												<li>Inscripción en Registros públicos</li>
												<li>R.U.C.</li>
											</ul>
											<div className="btn"><a href="#">Iniciar inscripción</a></div>
										</div>
										<div className="gridTerms">
											<h5>CONDICIONES</h5>
											<ul>
												<li>Máximo S/ 5 000 en valor como capital social</li>
												<li>Un sólo cargo (Gerente general)</li>
												<li>Trámite online en www.legaly.pe</li>
												<li>Firma de documentos en la notaría de su elección</li>
												<li>Poderes especiales sólo para Gerente general</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="gridAditionalCosts">
									<div className="infoTitle">
										<h6>COSTOS ADICIONALES</h6>
										<p>En caso excedas las condiciones estipuladas en el paquete en cargos o capital social, considera los siguientes recargos.</p>
									</div>
									<div className="infoDetail">
										<div className="gridA">
											<div className="wrapperConditPrice">
												<p className="symbol">S/.</p><p className="price">35</p>
											</div>
											<p className="termsDescription">Por cada cargo adicional como Gerentes, Directorio y otros.</p>
										</div>
										<div className="gridB">
											<div className="wrapperConditPrice">
												<p className="symbol">S/.</p><p className="price">5</p>
											</div>
											<p className="termsDescription">Por cada S/ 1 000 adicionales en el valor del capital social.</p>
										</div>
									</div>
								</div>
								<div className="gridRequirements">
									<div className="infoTitle">
										<h6>REQUISITOS</h6>
									</div>
									<div className="infoDetail">
										<ul>
											<li>Información de socios: DNI, nombre completo, domicilio, DNI de conyugues</li>
											<li>3 opciones de nombre</li>
											<li>Inversión por socio</li>
											<li>Descripción de bienes: modelo, marca y nº de serie (si aporta bien como capital)</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="wrapperInfoC" id="notaries">
							<h4 className="landingTitles">Notarías Aliadas</h4>
							<div className="underlineBlue"></div>
							<div className="wrapperList">
								<ul className="gridA">
									<li>
										<p className="notaryName">NOTARÍA TINAGEROS</p>
										<p className="notaryLocation">San Isidro</p>
									</li>
									<li>
										<p className="notaryName">NOTARÍA LANDÁZURI</p>
										<p className="notaryLocation">Av. Brigida Silva de Ochoa 3398 int 201, San Miguel.</p>
									</li>
									<li>
										<p className="notaryName">NOTARÍA ACEVEDO MENDOZA</p>
										<p className="notaryLocation">Av. Javier Prado Oeste 850, Magdalena del Mar.</p>
									</li>
								</ul>
								<ul className="gridB">
									<li>
										<p className="notaryName">NOTARÍA DONATO CARPIO</p>
										<p className="notaryLocation">Av. República de Chile 295 Of. 205, Santa Beatriz.</p>
									</li>
									<li>
										<p className="notaryName">NOTARÍA GÁLVEZ</p>
										<p className="notaryLocation">Av. Oscar R. Benavides (ex av. Colonial) Nº 5177 Parque Industrial, Callao.</p>
									</li>
								</ul>	
							</div>
							
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
					<div className="wrapperContact" id="contact">
						<div className="gridData">
							<div className="wrapperTxt">
								<h5 className="landingTitles">¿Tienes alguna duda?</h5>
								<div className="underlineBlue"></div>
								<p className="field smallContent">Puedes solicitar una asesoría gratuita para la constitución de tu empresa en el momento que lo desees, incluso por whatsapp. Te invitamos a seguirnos en nuestras redes sociales donde compartiremos conocimiento y contactos para la comunidad Legaly!</p>
								<p className="field smallContent">Contáctanos a</p>
								<p className="smallContent data">info@legaly.pe</p>
								<p className="smallContent data">01 420 6162</p>
								<p className="smallContent data">942 914 542</p>
								<p className="field smallContent">Estamos en</p>
								<p className="smallContent data">Calle Porta 165, Miraflores</p>

								

							</div>
						</div>
						<div className="gridMap">
							<figure>
								<img src="css/img/map.png" />
							</figure>
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