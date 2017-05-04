/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link, BrowserHistory} from 'react-router-dom'
import uid from 'uid'

import GoodRowInput from './goodRowInput';



export default class PersonalInformationForm extends Component{

	constructor (props){
		super(props);
		this.state={
			numberOfGoods : 3,
			userDocumentType: "DNI",
			userCivilStatus: "Soltero",
			spouseDocumentType : "DNI"
		}

		this.addGood = this.addGood.bind(this);
		this.handleChangeUserDocumentType = this.handleChangeUserDocumentType.bind(this);
		this.handleChangeUserCivilStatus = this.handleChangeUserCivilStatus.bind(this);
		this.handleChangeSpouseDocumentType = this.handleChangeSpouseDocumentType.bind(this);
		

	}
	

	addGood(){
	/*
		let n = this.state.numberOfGoods;

		let new_value = n+1;

		this.setState({
			numberOfGoods : new_value
		});
*/

		let wrapper = document.getElementById("gridBForm");

		let numWrapperGoodRow = document.getElementsByClassName("goodRow").length;

		let num = numWrapperGoodRow +1;


		let comp = `<div class="goodRow"><div class="gridFormShort"><label class="smallContent">${num}. Bien</label><div class="inputSingleValue"><input type="text"/><span class="icon-box"></span></div></div><div class="gridFormShort"><label class="smallContent">Valor</label><div class="inputSingleValue"><input type="number"/><span class="icon-usd"></span></div></div></div>`

		wrapper.insertAdjacentHTML('beforeend', comp)


	}


	handleChangeUserDocumentType(ev){
		this.setState({userDocumentType: ev.target.value});
	}


	handleChangeUserCivilStatus(ev){
		this.setState({userCivilStatus: ev.target.value});
	}


	handleChangeSpouseDocumentType(ev){
		this.setState({spouseDocumentType: ev.target.value});
	}




	handlePersonalInformationFormSubmit(){

		let user_name_i = ReactDom.findDOMNode(this.refs.user_name_i).value.trim()
		let user_document_type_i = this.state.userDocumentType;
		let user_document_number_i = ReactDom.findDOMNode(this.refs.user_document_number_i).value.trim()
		let user_email_i = ReactDom.findDOMNode(this.refs.user_email_i).value.trim()
		let user_location_i = ReactDom.findDOMNode(this.refs.user_location_i).value.trim()
		let user_civil_status_i = this.state.userCivilStatus;



		if(this.state.userCivilStatus != "Soltero"){
			let spouse_document_type_i = this.state.spouseDocumentType;
			let supouse_document_number_i = ReactDom.findDOMNode(this.refs.supouse_document_number_i).value.trim()

		}

		let user_money_investment_i = ReactDom.findDOMNode(this.refs.user_money_investment_i).value.trim()


		let inputs = document.getElementsByClassName("goodRow");

		console.log(inputs[0]);

		let arry=[];

		for(let i = 0; i< inputs.length; i++){

			if(inputs[i].children[0].children[1].children[0].value != ""){
				
				arry.push({
					good_name: inputs[i].children[0].children[1].children[0].value,
					good_value: inputs[i].children[1].children[1].children[0].value

				})

			}

		}

		let json = {
			name : user_name_i,
			user_document_type : user_document_type_i,
			user_document_number : user_document_number_i,
			email : user_email_i,
			location : user_location_i,
			civil_status : user_civil_status_i,
			money_investment : user_money_investment_i,
			goods_investment : arry
		}

		if(this.state.userCivilStatus != "Soltero"){
			json.spouse_document_type = spouse_document_type_i;
			json.supouse_document_number = supouse_document_number_i;
		}

		//INFO LISTA PARA ENVIAR AL SERVER
		console.log(json);

		return

	}



	render(){

		let goodRowInputs =[]
		

		for(let i=0; i< this.state.numberOfGoods; i++){

			let key_id = uid();

			goodRowInputs.push(<GoodRowInput
					number = {i+1}
					key = {key_id}
				/>)
		}

		return <div className="personalInformationForm">
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
						<div className="gridUserSupport">
							<span className="icon-whatsapp"></span>
							<p className="smallContent">942 914 542</p>
						</div>
						<div className="gridUserSupport">
							<span className="icon-mail_outline"></span>
							<p className="smallContent">ayuda@legitify.com</p>
						</div>
					</div>
					<div className="gridForm">
						<h3 className="bigTitlesSS">Información personal</h3>
						<div className="wrapperUnderline">
							<div className="underlineBlue"></div>
						</div>
						

						<div className="wrapperPartnersList">
							<div className="btnPartnerProfile btnNewPartner">
								<span className="icon-add"></span>
							</div>
							<div className="btnPartnerProfile">
								<figure>
									<img src="css/img/Fake-client.jpg"/>
								</figure>
							</div>
						</div>

						<form>
							<div className="gridFormLarge">
								<label className="smallContent">Nombre completo:</label>
								<div className="inputSingleValue">
									<input type="text" ref="user_name_i"/>
									<span className="icon-head"></span>
								</div>
							</div>
							<div className="gridFormShort">
								<label className="smallContent">Tipo de documento:</label>
								<div className="inputSelect">
									
									<select  onChange={this.handleChangeUserDocumentType}>
										<option>DNI</option>
										<option>Pasaporte</option>
										<option>Carné de extranjería</option>
									</select>
									<span className="icon-briefcase icoInputSelect"></span>
								</div>
							</div>
							<div className="gridFormShort">
								<label className="smallContent">Número de documento:</label>
								<div className="inputSingleValue">
									<input type="number" ref="user_document_number_i"/>
									<span className="icon-credit-card"></span>
								</div>
							</div>
							<div className="gridFormLarge">
								<label className="smallContent">Correo:</label>
								<div className="inputSingleValue">
									<input type="email" ref="user_email_i"/>
									<span></span>
								</div>
							</div>
							<div className="gridFormLarge">
								<label className="smallContent">Domicilio:</label>
								<div className="inputSingleValue">
									<input type="text" ref="user_location_i"/>
									<span className="icon-room"></span>
								</div>
							</div>
							<div className="gridFormShort">
								<label className="smallContent">Estado civil:</label>
								<div className="inputSelect">
									
									<select onChange={this.handleChangeUserCivilStatus}>
										<option>Soltero</option>
										<option>Casado</option>
										<option>Divorciado</option>
									</select>
									<span className="icoInputSelect"></span>
								</div>
							</div>
							<div className="gridFormShort">
							</div>
							
							<label className="smallContent lblOptional">Documento de identidad del cónyugue</label>
							
							
							<div className="gridFormShort">
								<label className="smallContent">Tipo de documento:</label>
								<div className="inputSelect">
									
									<select onChange={this.handleChangeSpouseDocumentType}>
										<option>DNI</option>
										<option>Pasaporte</option>
										<option>Carné de extranjería</option>
									</select>
									<span className="icon-briefcase icoInputSelect"></span>
								</div>
							</div>
							<div className="gridFormShort">
								<label className="smallContent">Número de documento:</label>
								<div className="inputSingleValue">
									<input type="number" ref="supouse_document_number_i"/>
									<span className="icon-credit-card"></span>
								</div>
							</div>
						</form>
						<div className="gridDesktopDivision"></div>
						<form id="gridBForm" className="gridBForm">
							
							<div className="gridMovilDivision">Aporte de Capital</div>
							<div className="btnRed addGood" onClick={this.addGood.bind(this)}>
								<p>Agregar bien</p>
								<span className="icon-box"></span>
							</div>

							<div className="gridFormLarge">
								<label className="smallContent">Dinero:</label>
								<div className="inputSingleValue">
									<input type="number" ref="user_money_investment_i"/>
									<span className="icon-usd"></span>
								</div>
							</div>

							{
								goodRowInputs
							}
							

							
						</form>
						<div className="wrapperBtnForm">
							<div className="gridFormLarge wrapperBtnNext">
								<Link to="/fecha-firma"><div className="btnNext" onClick={this.handlePersonalInformationFormSubmit.bind(this)}>Guardar información</div></Link>
							</div>
							<div className="gridFormLarge wrapperBtnTransparent">
								<Link to="/invitar-socios"><div className="btnTransparentBackground">Anterior</div></Link>
							</div>
						</div>
						
					</div>
				</div>

	}
}