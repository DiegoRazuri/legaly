/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link, Redirect} from 'react-router-dom'

export default class EnterpriseInformationForm extends Component{

	constructor (props){
		super(props);
		this.state={
			industry : "",
			societyType : ""

		}

		this.handleChange = this.handleChange.bind(this);
		this.handleChangeSocietyType = this.handleChangeSocietyType.bind(this);
		//this.handelCheckboxChange = this.handelCheckboxChange.bind(this);
	
	}

	handleEnterpriseInformationSubmit(){
		
		let arryNames = document.getElementsByClassName("company-name-option");

		let names=[];

		for( let i= arryNames.length-1; i>= 0; i--){
			names.push(arryNames[i].innerText);
		}

		let capital = ReactDom.findDOMNode(this.refs.investment_i).value.trim()



		let good_investment = document.getElementById("checkboxGoods").checked;

		let money_investment = document.getElementById("checkboxMoney").checked ;
		

		let json = {
			optionNames : names,
			industry : this.state.industry,
			societyType : this.state.societyType,
			isItGoodsCapital : good_investment,
			isItMoneyCapital : money_investment,
			totalCapital : capital
			
		}

		if(this.props.enterpriseSaved == 1){
			this.props.updateEnterpriseInformation.call(null, json)

		}else{
			this.props.sendEnterpriseInformation.call(null, json)
		}

		
	

		return;


	}

	handleChange(ev){

		this.setState({industry: ev.target.value});
	}
	handleChangeSocietyType(ev){

		this.setState({societyType: ev.target.value});
	}

	deleteName(e){

		let idCross= e.srcElement.id;

		let wrapperValue = document.getElementById(idCross).parentNode;

		let wrapperValueS = document.getElementById("wrapperInputValues");

		wrapperValueS.removeChild(wrapperValue);
	}

	
	catchNames(val){

		var companyNames_i;

		if(val== 0){
			var companyNames_i = ReactDom.findDOMNode(this.refs.companyNames_i).value.trim()
		}else if(this.props.enterpriseInProcessData){

			

			var companyNames_i = this.props.enterpriseInProcessData.optionNames.toString();

		}	

		

		
		let wrapper = document.getElementById("wrapperInputValues");

		let arry = companyNames_i.split(",")

		for(let i = arry.length-1; i >= 0; i--){
			

			name = arry[i];

			if(arry[i] != ""){
				var newDiv = document.createElement("div");
				var newP = document.createElement("p");
				var newSpan = document.createElement("span");

				newDiv.className ="option-name";
				newDiv.id ="option"+i;
				newSpan.id ="cross" + i;
				newSpan.className = "icon-cross";
				newSpan.onclick = this.deleteName.bind(this);
				newP.className = "company-name-option"



				var newContent = document.createTextNode(name);

				newP.appendChild(newContent)


				newDiv.appendChild(newP);
				newDiv.appendChild(newSpan);

				wrapper.appendChild(newDiv);

			}		
		}

		let inputE = document.getElementById("inputMultipleValuesNames");

		inputE.value = "";




	}
	

	componentDidMount(){

		window.scrollTo(0, 0)


		if(this.props.enterpriseSaved == 1){

			let inputInvestment = ReactDom.findDOMNode(this.refs.investment_i)
			let inputIndustry = ReactDom.findDOMNode(this.refs.selectEnterpriseIndustry)
			let inputSocietyType = ReactDom.findDOMNode(this.refs.selectSocietyType)



			inputInvestment.value = this.props.enterpriseInProcessData.totalCapital;
			inputIndustry.value = this.props.enterpriseInProcessData.industry;
			inputSocietyType.value = this.props.enterpriseInProcessData.societyType;

			this.setState({
				enterpriseCategory: this.props.enterpriseInProcessData.industry,
				societyType : this.props.enterpriseInProcessData.societyType,
				industry : this.props.enterpriseInProcessData.industry
			})

			this.catchNames(1)

			
			if(this.props.enterpriseInProcessData.isItGoodsCapital == true){
				document.getElementById("checkboxGoods").checked = true;

			}else {
				document.getElementById("checkboxGoods").checked = false;				
			}


			if(this.props.enterpriseInProcessData.isItMoneyCapital == true){
				document.getElementById("checkboxMoney").checked = true;
			}else{
				document.getElementById("checkboxMoney").checked = false;
			}
			
		}
	}


	render(){
/*
		let dataReader;

		if(this.props.enterpriseInProcess != 0){

			dataReader = this.props.enterpriseInProcessData;



		}
		
*/

		return <div className="sectionEnterpriseIncorporation">
					<div className="wrapperIncorporationForm">

						<div className="enterpriseInformationForm">
							<div className="gridStepProgress">
								<span className="icon-cross"></span>
								<ul className="stepProgress">
									<li className="stepActive">1</li>
									<li>2</li>
									<li>3</li>
								</ul>
								<figure>
									<img src="css/img/InfoEmpresa1.svg"/>
								</figure>
								<h4 className="bigTitlesOS">Constitución de empresa</h4>
								<p className="mediumContent instructions">Ingresa la información que necesitas para emitir la minuta</p>
								<h4 className="bigTitlesOS helpTitle">¿Necesitas ayuda?</h4>
								<span className="icon-angle-down"></span>
								<a href="http://www.facebook.com/legaly.pe" target="_blank" className="gridUserSupport">
									<span className="icon-facebook"></span>
									<p className="smallContent">www.facebook.com/legaly.pe</p>
								</a>
								<div className="gridUserSupport">
									<span className="icon-mail_outline"></span>
									<p className="smallContent">ayuda@legaly.pe</p>
								</div>
							</div>
							<div className="gridForm">
								<h3 className="bigTitlesSS">Constitución de empresa</h3>
								<div className="underlineBlue"></div>
								<form>
									<div className="gridFormLarge">
										<label className="smallContent">Ingresa de 3 a 5 posibles nombres en orden de prioridad</label>
										<div className="inputMultipleValues">
											<div id="wrapperInputValues" className="wrapperInputValues">
												<input autoFocus type="text" id="inputMultipleValuesNames" ref="companyNames_i" onBlur={this.catchNames.bind(this, 0)}/>
											</div>
											<span className="icon-flag2"></span>
										</div>
									</div>
									<div className="gridFormLarge">
										<label className="smallContent">Elige un tipo de sociedad</label>
										<div className="inputSelect">
											
											<select id="selectEnterpriseIncorporationForm" value={this.state.societyType} ref="selectSocietyType" onChange={this.handleChangeSocietyType}>
												<option disabled></option>
												<option>S.A.C.</option>
												<option>S.A.</option>
												<option>E.I.R.L.</option>
												<option>S.R.L.</option>
												
											</select>
											<span className="icon-flag2 icoInputSelect"></span>
										</div>

									</div>
									<div className="gridFormLarge">
										<label className="smallContent">¿A qué se dedicará tu empresa?</label>
										<div className="inputSelect">
											
											<select id="selectEnterpriseIncorporationForm" value={this.state.industry} ref="selectEnterpriseIndustry" onChange={this.handleChange}>
												<option disabled></option>
												<option>ASESORIA EMPRESARIAL</option>
												<option>ASESORIA ENERGETICA</option>
												<option>ASESORIA FINANCIERA</option>
												<option>ASESORIA INFORMATICA</option>
												<option>BEBIDAS</option>
												<option>BIBLIOTECA</option>
												<option>BUFFET- CATERING</option>
												<option>ABARROTES</option>
												<option>ACCESORIOS MEDICOS/ INSTRUMENTOS MEDICOS</option>
												<option>AGENCIA DE ADUANAS</option>
												<option>AGENCIA DE VIAJES Y TURISMO</option>
												<option>AGENTE DE CARGA INTERNACIONAL</option>

												<option>AIRE ACONDICIONADO</option>
												<option>ALIMENTOS NATURALES</option>
												<option>ANALISIS DE ECOSISTEMAS/EVALUACION DE IMPACTO AMBIENTAL</option>
												<option>ARTEFACTOS</option>
												<option>ARTESANIA</option>
												<option>ARTICULOS DE BASAR</option>
												<option>ARTICULOS DE SEGURIDAD</option>
												<option>ARTICULOS ELECTRONICOS</option>
												<option>ASESORIA CONTABLE</option>
												<option>CORRETAJE INMOBILIARIOADUANAS</option>
												<option>CORTINAS Y PERSIANASTURISMO</option>
												<option>COSMETOLOGIA</option>
												<option>CRIANZA DE ANIMALES</option>
												<option>DEPORTE</option>
												<option>DISEÑO DE INTERIORES</option>
												<option>DISEÑO GRAFICO</option>
												<option>EDITORIAL</option>
												<option>ESTIMULACION TEMPRANA</option>
												<option>FUEGOS ARTIFICIALES</option>
												<option>IDIOMAS</option>
												<option>LAVANDERIA</option>
												<option>MANTENIMIENTO AERONAVES</option>
												<option>PANADERIA</option>
												<option>PLASTICOS</option>
												<option>PSICOLOGOS</option>
												<option>RESIDUOS SOLIDOS</option>
												<option>SERVICIOS MEDICOS</option>
												<option>TOPOGRAFIA</option>
												<option>YOGA</option>
												<option>ASESORIA EN GENERAL</option>
												<option>JARDINERIA</option>
												<option>ESCUELA DE MANEJO</option>
												<option>MANUALIDADES</option>
												<option>REDES Y MERCADEO</option>
												<option>ASESORIA PARA TESIS</option>
												<option>GIMNASIO</option>
												<option>CONSULTORIA EN INGENIERIA ELECTRICA</option>
												<option>CONSULTORIA NAVAL</option>
												<option>CONSULTORIA Y EVALUACION DE PROYECTOS</option>
												<option>EQUIPO DE CARNICERIA</option>
												<option>ESTAMPADOS</option>
												<option>ADMINISTRACION DE EDIFICIOS</option>
												<option>ARTICULOS DE LIMPIESA</option>
												<option>ASESORIA MINERA</option>
												<option>ASESORIA PETROLERA</option>
												<option>ASESORÍA RADIOLOGICA Y MEDICINA NUCLEAR</option>
												<option>CERTIFICACION DE CURSOS</option>
												<option>CONSULTORIA EN SALUD E HIGIENE OCUPACIONAl</option>
												<option>CONSULTORIA EN SEGURIDAD INDUSTRIAL</option>
												<option>CONTROL DE CALIDAD</option>
												<option>SERVICIO DE COMUNICACIÓN</option>
												<option>SERVICIOS DENTALES</option>
												<option>SERVICIOS EDUCATIVOS</option>
												<option>SISTEMAS CONTRA INCENDIOS</option>
												<option>SPA- SALON DE BELLESA</option>
												<option>SUPERMERCADO</option>
												<option>TALLER AUTOMOTRIS</option>
												<option>TECNOLOGIA NUCLEAR</option>
												<option>TELE- COMUNICACIONES</option>
												<option>TEXTILES</option>
												<option>TRAGAMONEDAS Y CASINOS</option>
												<option>TRANSPORTE</option>
												<option>VEHICULOS Y ACCESORIOS</option>
												<option>VETERINARIA</option>
												<option>VIDRIERIA</option>
												<option>CONSULTORIA METAL- MECANICA</option>
												<option>PERFUMERIA</option>
												<option>PESQUERIA</option>
												<option>PINTURA</option>
												<option>PORTUARIO LOGISTICA</option>
												<option>PRENDAS DE VESTIR</option>
												<option>PRESTAMOS</option>
												<option>PRODUCTORA</option>
												<option>PUBLICIDAD</option>
												<option>RECICLAJE</option>

												<option>RESTAURANTE</option>
												<option>SELECCIÓN DE PERSONAL</option>
												<option>MARKETING</option>
												<option>MENSAJERIA Y COURIER</option>
												<option>METALMECANICA</option>
												<option>METALURGIA</option>
												<option>MINERIA</option>
												<option>MODELAJE</option>
												<option>MUEBLES</option>
												<option>OPTICA</option>
												<option>PANADERIA</option>
												<option>PERFORACION Y DEMOLICION</option>
												<option>ESTUDIO DE SUELOS</option>
												<option>EVENTOS</option>
												<option>FARMACIA</option>
												<option>FERRETERIA</option>
												<option>FORESTAL</option>
												<option>FOTOGRAFIA</option>
												<option>FRUTAS Y VERDURAS</option>
												<option>FUMIGACION Y EXTINTORES</option>
												<option>FUNERARIAS</option>
												<option>GANADERIA</option>
												<option>GASOLINERA Y ESTACION DE SERVICIOS</option>
												<option>HOSPEDAJE</option>
												<option>IMPRENTA</option>
												<option>INDUSTRIA PETROLERA</option>
												<option>INGENIERIA DE MINAS</option>
												<option>INSTALACIONES DE GAS</option>
												<option>INTERMEDIACION TURISTICA</option>
												<option>JOYERIA</option>
												<option>LACTEOS</option>
												<option>LIBRERÍA</option>
												<option>LICORERIA</option>
												<option>MADERERA</option>
												<option>MAQUINARIA AGROINDUSTRIAL</option>
												<option>COMPUTACIÓN E INFORMÁTICA</option>
												<option>CONSTRUCCION</option>
												<option>CONSTRUCCION DE POZOS</option>
												<option>CONSULTORIA AMBIENTAL</option>
												<option>CONSULTORIA EN INGENIERIA ELECTRICA</option>

											</select>
											<span className="icon-briefcase icoInputSelect"></span>
										</div>

									</div>
									<div className="gridFormLarge gridFormMutable">
										<label className="smallContent">¿Cuál es el capital del negocio?</label>
										<div className="inputSingleValue">
											<input type="number" min="1" ref="investment_i"/>
											<span className="icon-dollar"></span>
										</div>
									</div>
									<div className="gridFormLarge gridFormMutable">
										<label className="smallContent">Capital constituido por:</label>
										<div className="inputCheckbox">
											<div className="wrapperCheckbox">
												<input type="checkbox" name="goods_investment" id="checkboxGoods"/>
												<span className="icon-box"></span>
												<label className="smallContent">Bienes</label>
											</div>
											<div className="wrapperCheckbox">
												<input type="checkbox" name="money_investment" id="checkboxMoney"/>
												<span className="icon-dollar"></span>
												<label className="smallContent">Dinero</label>
											</div>
										</div>
									</div>
									<div className="gridFormLarge gridFormMutable btnStepWrapperNext">
										<Link to="/invitar-socios"><div className="btnNext" onClick={this.handleEnterpriseInformationSubmit.bind(this)}>Siguiente</div></Link>
									</div>
									<div className="gridFormShort btnStepWrapperBack">
										<Link to="/"><div className="btnTransparentBackground">Cancelar</div></Link>
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