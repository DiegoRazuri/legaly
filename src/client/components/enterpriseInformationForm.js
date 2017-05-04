/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom'

export default class EnterpriseInformationForm extends Component{

	constructor (props){
		super(props);
		this.state={
			enterpriseCategory : "",
			goods_investment : false,
			money_investment : false

		}

		this.handleChange = this.handleChange.bind(this);
		this.handelCheckboxChange = this.handelCheckboxChange.bind(this);
	
	}

	handleEnterpriseInformationSubmit(){
		
		let arryNames = document.getElementsByClassName("company-name-option");

		let names=[];

		for( let i= arryNames.length-1; i>= 0; i--){
			names.push(arryNames[i].innerText);
		}

		let capital = ReactDom.findDOMNode(this.refs.investment_i).value.trim()

		

		let json = {
			names : names,
			enterpriseIndustry : this.state.enterpriseCategory,
			goods_investment : this.state.goods_investment,
			money_investment : this.state.money_investment,
			total_capital : capital
		}

		//Datos listos para enviar.
		console.log(json);

		this.props.sendEnterpriseInformation.call(null, json)
		
/*
		//ELIMINAR TODOS LOS ELEMENTOS CON UN CLASS ESPECIFICO

		let namesSelected = document.getElementsByClassName("option-name");

		while(namesSelected[0]){
			namesSelected[0].parentNode.removeChild(namesSelected[0]);
		}
*/
	

		return;


	}

	handleChange(ev){

		console.log(ev.target.value);
		this.setState({enterpriseCategory: ev.target.value});
	}

	handelCheckboxChange(ev){
		let target = ev.target;

		let value = target.type === 'checkbox' ? target.checked : target.value;
		let name = target.name;

		this.setState({
			[name]: value
		})	
	}

	deleteName(e){

		let idCross= e.srcElement.id;

		let wrapperValue = document.getElementById(idCross).parentNode;

		let wrapperValueS = document.getElementById("wrapperInputValues");

		wrapperValueS.removeChild(wrapperValue);
	}

	
	catchNames(){

		var companyNames_i = ReactDom.findDOMNode(this.refs.companyNames_i).value.trim()

		
		let wrapper = document.getElementById("wrapperInputValues");

		let arry = companyNames_i.split(",")

		for(let i = arry.length-1; i >= 0; i--){
			
			console.log("nombre: " + arry[i])
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
		console.log("dentro componentDidMount")

		console.log(this.props.enterpriseInProcess)

		if(this.props.enterpriseInProcess == true){



			let position = this.props.user.enterprise.length-1

			console.log("esta es la position"+position)

			let input = ReactDom.findDOMNode(this.refs.investment_i)

			input.value = this.props.user.enterprise[position].totalCapital;

			console.log("este es el valor totalCapital"+ this.props.user.enterprise[position].totalCapital);
		}
	}


	render(){

		console.log("enterpriseinfoform props")
		console.log(this.props.enterpriseInProcess)
		console.log(this.props.user)

		return <div className="enterpriseInformationForm">
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
						<h3 className="bigTitlesSS">Constitución de empresa</h3>
						<div className="underlineBlue"></div>
						<form>
							<div className="gridFormLarge">
								<label className="smallContent">Ingresa de 3 a 5 posibles nombres en orden de prioridad</label>
								<div className="inputMultipleValues">
									<div id="wrapperInputValues" className="wrapperInputValues">
										<input autoFocus type="text" id="inputMultipleValuesNames" ref="companyNames_i" onBlur={this.catchNames.bind(this)}/>
									</div>
									<span className="icon-flag2"></span>
								</div>
							</div>
							<div className="gridFormLarge">
								<label className="smallContent">¿A qué se dedicará tu empresa?</label>
								<div className="inputSelect">
									
									<select id="selectEnterpriseIncorporationForm" ref="selectEnterpriseIndustry" onChange={this.handleChange}>
										<option>Elige una opción</option>
										<option>a</option>
										<option>b</option>
										<option>c</option>
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
										<input type="checkbox" name="goods_investment" id="checkboxGoods" onChange={this.handelCheckboxChange}/>
										<span className="icon-box"></span>
										<label className="smallContent">Bienes</label>
									</div>
									<div className="wrapperCheckbox">
										<input type="checkbox" name="money_investment" onChange={this.handelCheckboxChange}/>
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

	}
}