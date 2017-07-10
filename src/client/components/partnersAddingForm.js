/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link, Redirect} from 'react-router-dom'
import uid from 'uid';

import PartnerRowInput from './partnerRowInput';


export default class PartnersAddingForm extends Component{

	constructor (props){
		super(props);
		this.state={
			positionSelected : "",
			AccountManagerPositionSelected : "",
			enterpriseSaved : 0,
			redirect : false,
			name:""


		}

		this.selectPositionHandler = this.selectPositionHandler.bind(this);
		this.addPartner = this.addPartner.bind(this);
		this.handlePartnerAddingFormSubmit = this.handlePartnerAddingFormSubmit.bind(this);
		this.validationForm = this.validationForm.bind(this);
		this.handlePartnerNameValidation = this.handlePartnerNameValidation.bind(this);
		
	}

	validationForm(){
		let isItGG = 0;
		this.props.enterpriseInProcessData.partners.map((partner)=>{
			if(partner.position == "Gerente General"){
				isItGG = 1;

				
			}
		});

		if(this.state.name != ""){
			console.log("nombre escrito sin dar click en boton")
			isItGG = 0;

			document.getElementById("lblValidationMsgAddPartner").innerHTML = "Debes darle click en el boton Agregar Socio";

		}
		console.log("se salto restriccion de nombre lleno");

		return isItGG;
	}

	handlePartnerNameValidation(ev){

		console.log("validation partnername")

		let target = ev.target;

		let name = target.value;

		this.setState({ name : name});
	}

	addPartner(){
		let email = ReactDom.findDOMNode(this.refs.inputPartnerEmail).value.trim()
		

		let json ={
			partnerEmail :  email,
			position : this.state.positionSelected

		}

		this.props.rowPartnerInputHandler.call(null, json)

		this.setState({name: ""})

		ReactDom.findDOMNode(this.refs.inputPartnerEmail).value = '';
		ReactDom.findDOMNode(this.refs.positionSelect).value = '';
		
	}

	handlePartnerAddingFormSubmit(){

		if(this.props.partnersInvitationSaved == 0){
			let json = { position : this.state.AccountManagerPositionSelected }


			this.props.rowAccountManagerInputHandler.call(null, json)

			let validation = this.validationForm()

			if(validation == 1){
				
				this.props.sendPartnerInvitation.call(null)

				this.setState({
					redirect :true
				})

			}else{
				document.getElementById("lblValidationMsg").innerHTML = "Debes seleccionar al menos a un socio como Gerente General."
			}

			
			
		}else{

			let json = { position : this.state.AccountManagerPositionSelected }

			this.props.rowAccountManagerInputHandler.call(null, json)


			let validation = this.validationForm()

			if(validation == 1){
				
				this.props.updatePartnerInvitation.call(null)

				this.setState({
					redirect :true
				})

			}else{
				document.getElementById("lblValidationMsg").innerHTML = "Debes seleccionar al menos a un socio como Gerente General."
			}

			
		}

		

		


			

	}

	selectPositionHandler(ev){


		let target = ev.target;


		this.setState({ [target.name] : target.value});
	}

	componentDidMount(){
		window.scrollTo(0, 0)


		if(this.props.partnersInvitationSaved == 1){
			let inputAccountManagerPosition = ReactDom.findDOMNode(this.refs.AccountManagerPositionSelected)

			inputAccountManagerPosition.value = this.props.enterpriseInProcessData.partners[0].position;

			
			this.setState({
				AccountManagerPositionSelected : this.props.enterpriseInProcessData.partners[0].position
			})			
		}
	}



	
	
	render(){

	

		let partnerRow=[];

		if(this.props.enterpriseInProcessData.partners){

		

			for(let i=0; i< this.props.enterpriseInProcessData.partners.length; i++){

				if(this.props.enterpriseInProcessData.partners[i].user._id != this.props.user._id){

					let key_id = uid();

					partnerRow.push(<PartnerRowInput
							deletingPartnerRow = {this.props.deletingPartnerRow}
							partner_id = {this.props.enterpriseInProcessData.partners[i]._id}
							name = {this.props.enterpriseInProcessData.partners[i].user.name}
							position = {this.props.enterpriseInProcessData.partners[i].position}
							partnerListPos = {i}
							enterprise_id = {this.props.enterpriseInProcessData._id}
							user_id = {this.props.enterpriseInProcessData.partners[i].user._id}
							number = {i+1}
							key = {key_id}
						/>)
				}
				
			}

		}

	
		if(this.state.redirect){
			return <Redirect to="/informacion-personal"/>
		}
		else{

			return <div className="sectionEnterpriseIncorporation">
						<div className="wrapperIncorporationForm">

							<div className="partnersAddingForm">
								<div className="gridStepProgress">
									<span className="icon-cross"></span>
									<ul className="stepProgress">
										<li>1</li>
										<li className="stepActive">2</li>
										<li>3</li>
									</ul>
									<figure>
										<img src="css/img/Infosocios2.svg"/>
									</figure>
									<h4 className="bigTitlesOS">Agrega a tus socios</h4>
									<p className="mediumContent instructions">Incorpora a todos las personas que conformarán la sociedad.</p>
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
									<div className="wrapperFormTitle">
										<h3 className="bigTitlesSS">Invita a los fundadores</h3>
										<div className="underlineBlue"></div>
										
									</div>

									<label id="lblValidationMsg" className="smallContent"></label>
								
									<form id="partnerForm">

										<div className="partnerRow partnerRowInfo" data-partnerlistpos={0}>
											<div className="gridFormShort gridEmail">
												<label className="smallContent">1. Socio</label>
												<p className="smallContent">{this.props.enterpriseInProcessData.partners ? this.props.enterpriseInProcessData.partners[0].user.name: ""}</p>
												
											</div>
											<div className="gridFormShort">
												<label className="smallContent">Cargo</label>
												<div className="inputSelect">
													<select onChange={this.selectPositionHandler.bind()} ref="AccountManagerPositionSelected" value={this.state.AccountManagerPositionSelected} name="AccountManagerPositionSelected">
														<option disabled></option>
														<option>Ninguno</option>
														<option>Gerente General</option>
														<option>Sub Gerente</option>
														<option>Apoderado Especial</option>
														<option>Gerente Finanzas</option>
														<option>Gerente Administrativo</option>
													</select>
													<span></span>
												</div>
											</div>
											<span className=""></span>
										</div>

										{ partnerRow }
										
										<div className="partnerRow">
											<div className="gridFormShort">
												<label className="smallContent">Socio</label>
												<div className="inputSingleValue">
													<input ref="inputPartnerEmail" className="inputPartnerEmail" type="text" placeholder="Nombre Completo" onChange={this.handlePartnerNameValidation.bind(this)}/>
													<span className="icon-head"></span>
												</div>
											</div>
											<div className="gridFormShort">
												<label className="smallContent">Cargo</label>
												<div className="inputSelect">
													<select onChange={this.selectPositionHandler.bind()} ref="positionSelect" value={this.state.positionSelected} name="positionSelected">
														<option disabled></option>
														<option>Ninguno</option>
														<option>Gerente General</option>
														<option>Sub Gerente</option>
														<option>Apoderado Especial</option>
														<option>Gerente Finanzas</option>
														<option>Gerente Administrativo</option>
			
													</select>
													<span></span>
												</div>
											</div>

										</div>
										<label id="lblValidationMsgAddPartner" className="smallContent"></label>
										<div className="gridFormLarge">
											<div className="btnRed btnAddPartner" onClick={this.addPartner.bind(this)}>
												<p>Agregar socio</p>
												<span className="icon-head"></span>
											</div>
										</div>
										<div className="gridFormLarge gridFormMutable wrapperBtnNext">
											<a><div className="btnNext" onClick={this.handlePartnerAddingFormSubmit.bind(this)}>Siguiente</div></a>
										</div>
										<div className="gridFormLarge gridFormMutable wrapperBtnTransparent">
											
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
}

//<div className="btnFaq">Quiero saber más</div>

//<Link to="/informacion-empresa"><div className="btnTransparentBackground">Anterior</div></Link>