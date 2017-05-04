/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom'
import uid from 'uid';

import PartnerRowInput from './partnerRowInput';


export default class PartnersAddingForm extends Component{

	constructor (props){
		super(props);
		this.state={
			numberOfPartners : 4
		}

		this.addPartner = this.addPartner.bind(this);
		this.handlePartnerAddingFormSubmit = this.handlePartnerAddingFormSubmit.bind(this);
		

	}

	addPartner(){
	
		let wrapper = document.getElementById("partnerForm");

		let numWrapperPartnerRow = document.getElementsByClassName("partnerRow").length;

		let num = numWrapperPartnerRow +1;


		
		let comp = `<div class="partnerRow">
					<div class="gridFormShort">
						<label class="smallContent">${num}. Socio</label>
						<div class="inputSingleValue">
							<input class="inputPartnerEmail" type="text" placeholder="e-mail"/>
							<span class="icon-head"></span>
						</div>
					</div>
					<div class="gridFormShort">
						<label class="smallContent">Cargo</label>
						<div class="inputSingleValue">
							<input class="inputPartnerPosition" type="text"/>
							<span></span>
						</div>
					</div>

				</div>`;


		wrapper.insertAdjacentHTML('beforeend', comp)
	}

	handlePartnerAddingFormSubmit(){

		let inputs = document.getElementsByClassName("partnerRow");

		console.log(inputs[0]);

		let arry=[];

		for(let i = 0; i< inputs.length; i++){

			if(inputs[i].children[0].children[1].children[0].value != ""){
				
				arry.push({
					partnerEmail: inputs[i].children[0].children[1].children[0].value,
					position: inputs[i].children[1].children[1].children[0].value

				})

			}

		}

		//INFO LISTA PARA ENVIAR AL SERVER
		console.log(arry)
			

	}



	
	
	render(){

		console.log("partnersAddingForm")
		console.log(this.props.enterpriseInProcess)
		console.log(this.props.user)

		let rows=[];

		for(let i=0; i< this.state.numberOfPartners; i++){

			let key_id = uid();

			rows.push(<PartnerRowInput
					number = {i+1}
					key = {key_id}
				/>)
		}


		return <div className="partnersAddingForm">
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
						<div className="wrapperFormTitle">
							<h3 className="bigTitlesSS">Invita a los fundadores</h3>
							<div className="underlineBlue"></div>	
						</div>
						
						<div className="btnRed btnAddPartner" onClick={this.addPartner.bind(this)}>
							<p>Agregar socio</p>
							<span className="icon-head"></span>
						</div>
						<form id="partnerForm">
							
							{
								rows
							}
							
							<div className="gridFormLarge gridFormMutable wrapperBtnNext">
								<Link to="/informacion-personal"><div className="btnNext" onClick={this.handlePartnerAddingFormSubmit.bind(this)}>Invitar a socios</div></Link>
							</div>
							<div className="gridFormLarge gridFormMutable wrapperBtnTransparent">
								<Link to="/informacion-empresa"><div className="btnTransparentBackground">Anterior</div></Link>
							</div>
						</form>
					</div>
				</div>
	}
}