/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link, BrowserHistory} from 'react-router-dom'
import uid from 'uid'

import GoodRowInput from './goodRowInput';
import BtnUserprofileInfo from './btnUserprofileInfo';
import BtnUserprofileInfoText from './btnUserprofileInfoText';



export default class PersonalInformationForm extends Component{

	constructor (props){
		super(props);
		this.state={

			partnerSelected: 0,
			numberOfGoods : 1,
			goodsSeparation : "",
			validation : 0,
			redirect : 0
		}

		this.addGood = this.addGood.bind(this);
		this.switchPartnerSelected = this.switchPartnerSelected.bind(this);
		this.handleGoodSeparator = this.handleGoodSeparator.bind(this);
		
	}

	validationForm(){

		let errors = 0;

		let i_name, i_documentType, i_documentNum, i_position, i_email, i_phone, i_location, 
			i_civilStatus, i_goodsSeparation, i_registryNum, i_registryOffice, 
			i_coupleDocType, i_copuleDocNum, i_moneyInvestment, i_nameGoodsInvestment, i_valueGoodsInvestment;

		i_name = ReactDom.findDOMNode(this.refs.user_name_i);
		i_documentType = ReactDom.findDOMNode(this.refs.select_document_type);
		i_documentNum = ReactDom.findDOMNode(this.refs.user_document_number_i);
		i_position = ReactDom.findDOMNode(this.refs.user_position);
		i_email = ReactDom.findDOMNode(this.refs.user_email_i);
		i_phone = ReactDom.findDOMNode(this.refs.user_phone);
		i_location = ReactDom.findDOMNode(this.refs.user_location_i);
		i_civilStatus = ReactDom.findDOMNode(this.refs.user_civil_status);
		i_goodsSeparation = document.getElementsByClassName("inputRadioButtonPersonalInfo");
		i_registryNum = ReactDom.findDOMNode(this.refs.user_registry_num);
		i_registryOffice = ReactDom.findDOMNode(this.refs.user_registry_office);
		i_coupleDocType = ReactDom.findDOMNode(this.refs.couple_doc_type);
		i_copuleDocNum = ReactDom.findDOMNode(this.refs.couple_document_number_i);
		
		if(this.props.enterpriseInProcessData.isItGoodsCapital){
			i_nameGoodsInvestment = ReactDom.findDOMNode(this.refs.good_name_i);
			i_valueGoodsInvestment = ReactDom.findDOMNode(this.refs.good_value_i);
		}

		if(this.props.enterpriseInProcessData.isItMoneyCapital){
			i_moneyInvestment = ReactDom.findDOMNode(this.refs.user_money_investment_i);
		}

		
		input.parentNode.parentNode.classList.remove("inputError");

		this.props.enterpriseInProcessData.partners.map((partner)=>{

			if(json.optionNames.length == 0){

				i_optionnames.parentNode.parentNode.classList.add("inputError");

				errors += 1;

			}
		
		});

		if(errors > 0){
			this.setState({validation : 0})
		}else{
			this.setState({validation : 1})
		}

	}
	

	addGood(){

		let good_name = ReactDom.findDOMNode(this.refs.good_name_i).value.trim()
		let good_value = ReactDom.findDOMNode(this.refs.good_value_i).value.trim()

		let json ={
			partnerSelected : this.state.partnerSelected,
			goodName: good_name,
			goodValue : good_value
		}

		this.props.rowInputsHandler.call(null, json)

		ReactDom.findDOMNode(this.refs.good_name_i).value = '';
		ReactDom.findDOMNode(this.refs.good_value_i).value = '';

	}


	switchPartnerSelected(pos){
		this.setState({partnerSelected: pos})
	}

	handlePersonalInformationFormSubmit(){
		
		this.props.sendPartnersInformation.call(null)

		return

	}

	handleGoodSeparator(ev){
		this.setState({
			goodsSeparation : ev.target.value
		})
	}

	
	componentDidMount(){
		window.scrollTo(0, 0)
	}


	render(){

		let dataReaderPartner = this.props.enterpriseInProcessData.partners[this.state.partnerSelected];

		let rowInputNumber;
		let goodlistpos;

		let goodRowInputs =[]

		let btnAddingGoods, goodInputTextBox;

		//for para agregar listado de bienes

		if(this.props.enterpriseInProcessData.isItGoodsCapital == true){

			if(dataReaderPartner.goodsInput){
				
				for(let i=0; i< dataReaderPartner.goodsInput.length; i++){

					let key_id = uid();
					let num = i+1

					goodRowInputs.push(<GoodRowInput
							number = {num}
							key = {key_id}
							partnerSelected = {this.state.partnerSelected}
							goodInfo = {dataReaderPartner.goodsInput[i]}
							goodListPos = {i}
							deleteRowInputHandle = {this.props.deleteRowInputHandle}

						/>)
				}

				rowInputNumber = dataReaderPartner.goodsInput.length +1;

			}else{
				rowInputNumber = 1;
				
			}

			//btn para agregar bienes

			btnAddingGoods = <div className="btnRed addGood" onClick={this.addGood.bind(this)}>
								<p>Agregar bien</p>
								<span className="icon-box"></span>
							</div>

			//input para agregar bienes

			goodInputTextBox = <div className="goodRow">
									<div className="gridFormShort">
										<label className="smallContent">{rowInputNumber}. Bien</label>
										<div className="inputSingleValue">
											<input type="text" ref="good_name_i" name="goodName" data-pos={this.state.partnerSelected}/>
											<span className="icon-box"></span>
										</div>
									</div>
									<div className="gridFormShort">
										<label className="smallContent">Valor</label>
										<div className="inputSingleValue">
											<input type="number" ref="good_value_i" name="goodValue" data-pos={this.state.partnerSelected}/>
											<span className="icon-usd"></span>
										</div>
									</div>
								</div>
		}

		


		//agregando los inputs


		let inputName, inputDocTypePartner, inputDocPartnerNumber, inputMail, inputLocation, inputCivilStatus, inputDocTypeCouple, inputDocNumCouple, inputMoneyInvestment, inputGoodsSeparation, inputRegistryNumber, inputRegistryOffice, inputPosition, inputPhoneNumber;
		
		if(dataReaderPartner.user){
			
			
			inputName = <input type="text" ref="user_name_i" value={dataReaderPartner.user.name} onChange={this.props.inputTextHandler.bind()} name="name" data-pos={this.state.partnerSelected}/>
			
			inputDocTypePartner = <select  onChange={this.props.selectHandler.bind()} value={dataReaderPartner.user.documentType != undefined ? dataReaderPartner.user.documentType : "" } name="documentType" data-pos={this.state.partnerSelected} ref="select_document_type">
												<option disabled></option>
												<option>DNI</option>
												<option>Pasaporte</option>
												<option>Carné de extranjería</option>
											</select>;

			inputDocPartnerNumber = <input type="number" ref="user_document_number_i" value={dataReaderPartner.user.documentNumber != undefined? dataReaderPartner.user.documentNumber : ""} onChange={this.props.inputTextHandler.bind()} name="documentNumber" data-pos={this.state.partnerSelected}/>

			inputMail = <input type="email" ref="user_email_i" value={dataReaderPartner.user.email != undefined ? dataReaderPartner.user.email : ""} onChange={this.props.inputTextHandler.bind()} name="email" data-pos={this.state.partnerSelected}/>
		
			inputLocation = <input type="text" ref="user_location_i" value={dataReaderPartner.user.location != undefined ? dataReaderPartner.user.location : ""} onChange={this.props.inputTextHandler.bind()} name="location" data-pos={this.state.partnerSelected}/>
		
			inputCivilStatus = <select onChange={this.props.selectHandler.bind()} value={dataReaderPartner.user.civilStatus != undefined ? dataReaderPartner.user.civilStatus : ""} name="civilStatus" data-pos={this.state.partnerSelected} ref="user_civil_status">
									<option disabled></option>
									<option>Soltero</option>
									<option>Casado</option>
									<option>Divorciado</option>
								</select>

			inputDocTypeCouple = <select onChange={this.props.selectHandler.bind()} value={dataReaderPartner.user.coupleDocumentType != undefined ? dataReaderPartner.user.coupleDocumentType : ""} name="coupleDocumentType" data-pos={this.state.partnerSelected} ref="couple_doc_type">
									<option disabled></option>
									<option>DNI</option>
									<option>Pasaporte</option>
									<option>Carné de extranjería</option>
								</select>

			inputDocNumCouple = <input type="number" ref="couple_document_number_i" value={dataReaderPartner.user.coupleDocumentNumber != undefined ? dataReaderPartner.user.coupleDocumentNumber : ""} onChange={this.props.inputTextHandler.bind()} name="coupleDocumentNumber" data-pos={this.state.partnerSelected}/>
		
			inputMoneyInvestment =<input type="number" ref="user_money_investment_i" value={dataReaderPartner.moneyInput != undefined ? dataReaderPartner.moneyInput : ""} onChange={this.props.inputTextHandler.bind()} name="moneyInput" data-pos={this.state.partnerSelected}/>
	
			inputGoodsSeparation = <div className="wrapperInputRadio">
										<label>
											<input type="radio" name="goodsSeparation" onChange={this.props.selectHandler.bind()} checked={dataReaderPartner.user.goodsSeparation === "1"} value="1" data-pos={this.state.partnerSelected} className="inputRadioButtonPersonalInfo"/>Si
										</label>
										<label>
											<input type="radio" name="goodsSeparation" onChange={this.props.selectHandler.bind()} checked={dataReaderPartner.user.goodsSeparation === "0"} value="0" data-pos={this.state.partnerSelected} className="inputRadioButtonPersonalInfo"/>No
										</label>
										
										
									</div>

			inputRegistryNumber = <input type="text" value={dataReaderPartner.user.registryNumber != undefined ? dataReaderPartner.user.registryNumber : ""} onChange={this.props.inputTextHandler.bind()} name="registryNumber" data-pos={this.state.partnerSelected} ref="user_registry_num"/>

			inputRegistryOffice = <select onChange={this.props.selectHandler.bind()} value={dataReaderPartner.user.regitryOffice != undefined ? dataReaderPartner.user.regitryOffice : ""} name="regitryOffice" data-pos={this.state.partnerSelected} ref="user_registry_office">
									<option disabled></option>
									<option>ABANCAY</option>
									<option>AREQUIPA</option>
									<option>AYACUCHO</option>
									<option>BAGUA</option>
									<option>BARRANCA</option>
									<option>CAJAMARCA</option>
									<option>CALLAO</option>
									<option>CAMANA</option>
									<option>CASMA</option>
									<option>CASTILLA-APLAO</option>
									<option>CAÑETE</option>
									<option>CHACHAPOYAS</option>
									<option>CHEPEN</option>
									<option>CHICLAYO</option>
									<option>CHIMBOTE</option>
									<option>CHINCHA</option>
									<option>CHOTA</option>
									<option>CUSCO</option>
									<option>ESPINAR</option>
									<option>HUACHO</option>
									<option>HUAMACHUCO</option>
									<option>HUANCAVELICA</option>
									<option>HUANCAYO</option>
									<option>HUANTA</option>
									<option>HUANUCO</option>
									<option>HUARAL</option>
									<option>HUARAZ</option>
									<option>ICA</option>
									<option>ILO</option>
									<option>ISLAY - MOLLENDO</option>
									<option>JAEN</option>
									<option>JUANJUI</option>
									<option>JULIACA</option>
									<option>LA MERCED</option>
									<option>LIMA</option>
									<option>MADRE DE DIOS</option>
									<option>MAYNAS</option>
									<option>MOQUEGUA</option>
									<option>MOYOBAMBA</option>
									<option>NAZCA</option>
									<option>OTUZCO</option>
									<option>PASCO</option>
									<option>PISCO</option>
									<option>PIURA</option>
									<option>PUCALLPA</option>
									<option>PUNO</option>
									<option>QUILLABAMBA</option>
									<option>SAN PEDRO</option>
									<option>SATIPO</option>
									<option>SICUANI</option>
									<option>SULLANA</option>
									<option>TACNA</option>
									<option>TARAPOTO</option>
									<option>TARMA</option>
									<option>TINGO MARIA</option>
									<option>TRUJILLO</option>
									<option>TUMBES</option>
									<option>YURIMAGUAS</option>
								</select>

			inputPosition = <input type="text" value={dataReaderPartner.user.position != undefined ? dataReaderPartner.user.position : ""} onChange={this.props.inputTextHandler.bind()} name="position" data-pos={this.state.partnerSelected} ref="user_position"/>

			inputPhoneNumber = <input type="text" value={dataReaderPartner.user.phoneNumber != undefined ? dataReaderPartner.user.phoneNumber : ""} onChange={this.props.inputTextHandler.bind()} name="phoneNumber" data-pos={this.state.partnerSelected} ref="user_phone"/>
		}


		//agregando input de inversion en Dinero

		let moneyCapitalInput;

		if(this.props.enterpriseInProcessData.isItMoneyCapital == true){
			

			moneyCapitalInput = <div className="gridFormLarge">
									<label className="smallContent">Dinero:</label>
									<div className="inputSingleValue">
										{inputMoneyInvestment}
										
										<span className="icon-usd"></span>
									</div>
								</div>

		}


		//agregando selectores de socios
		

		let btnUserprofileInfo =[];

		if(this.props.enterpriseInProcessData.partners[0].user){
			for(let i= 0; i< this.props.enterpriseInProcessData.partners.length; i++){

				let key_id = uid()

				

			
				
				let btnText = this.props.enterpriseInProcessData.partners[i].user.name;

				if(this.state.partnerSelected == i){
					let classSelected = "btnPartnerProfile btnPartnerProfileText btnPartnerProfileSelected"

					btnUserprofileInfo.push(<BtnUserprofileInfoText btnText={btnText} key={key_id} switchPartnerSelected={this.switchPartnerSelected} classSelected={classSelected} pos={i}/>)

				}else{

					let classSelected = "btnPartnerProfile btnPartnerProfileText"

					btnUserprofileInfo.push(<BtnUserprofileInfoText btnText={btnText} key={key_id} switchPartnerSelected={this.switchPartnerSelected} classSelected={classSelected} pos={i}/>)

				}
				
				
				
				
			}
		}

		
		

		return <div className="sectionEnterpriseIncorporation">
					<div className="wrapperIncorporationForm">

						<div className="personalInformationForm">
							<div className="gridStepProgress">
								<span className="icon-cross"></span>
								<ul className="stepProgress">
									<li>1</li>
									<li>2</li>
									<li className="stepActive">3</li>
								</ul>
								<figure>
									<img src="css/img/InfoPersonal3.svg"/>
								</figure>
								<h4 className="bigTitlesOS">Información personal</h4>
								<p className="mediumContent instructions">Debes ingresar la información de cada socio.</p>
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
								<h3 className="bigTitlesSS">Información personal</h3>
								<div className="wrapperUnderline">
									<div className="underlineBlue"></div>
								</div>
								<label id="lblValidationMsgPersonalInformation" className="smallContent">Acá puedes ingresar la información personal de cada socio.</label>
								<div className="wrapperPartnersList">
									
									
									{ btnUserprofileInfo }

								</div>

								
								

								<form>
									<div className="gridFormLarge">
										<label className="smallContent">Nombre completo:</label>
										<div className="inputSingleValue">
											{inputName}
											<span className="icon-head"></span>
										</div>
									</div>
									<div className="gridFormShort">
										<label className="smallContent">Tipo de documento:</label>
										<div className="inputSelect">
											{inputDocTypePartner}
											
											<span className="icon-briefcase icoInputSelect"></span>
										</div>
									</div>
									<div className="gridFormShort">
										<label className="smallContent">Número de documento:</label>
										<div className="inputSingleValue">
											{inputDocPartnerNumber}
											
											<span className="icon-credit-card"></span>
										</div>
									</div>
									<div className="gridFormLarge">
										<label className="smallContent">Ocupación:</label>
										<div className="inputSingleValue">
											{inputPosition}
											
											<span></span>
										</div>
									</div>
									<div className="gridFormLarge">
										<label className="smallContent">Correo:</label>
										<div className="inputSingleValue">
											{inputMail}
											
											<span></span>
										</div>
									</div>
									<div className="gridFormLarge">
										<label className="smallContent">Celular:</label>
										<div className="inputSingleValue">
											{inputPhoneNumber}
											
											<span></span>
										</div>
									</div>

									<div className="gridFormLarge">
										<label className="smallContent">Domicilio:</label>
										<div className="inputSingleValue">
											{inputLocation}
											
											<span className="icon-room"></span>
										</div>
									</div>
									<div className="gridFormShort">
										<label className="smallContent">Estado civil:</label>
										<br/>
										<div className="inputSelect">
											{inputCivilStatus}
											
											<span className="icoInputSelect"></span>
										</div>
									</div>
									
									<div className="gridFormShort">
										<label className="smallContent">¿Cuentas con separación de bienes?</label>
										<div className="inputSelect wrapperRadios">
											{inputGoodsSeparation}
											
										</div>
									</div>

									<label className="smallContent lblOptional">Si cuentas con separación de bienes ingresa estos datos</label>

									<div className="gridFormShort">
										<label className="smallContent">Nº de partida registral:</label>
										<div className="inputSingleValue">
											{inputRegistryNumber}
											
											<span className="icon-credit-card"></span>
										</div>
									</div>
									<div className="gridFormShort">
										<label className="smallContent">Oficina Registral:</label>
										<div className="inputSelect">
											{inputRegistryOffice}

											
											<span className="icon-briefcase icoInputSelect"></span>
										</div>
									</div>
									

									
									
									<label className="smallContent lblOptional">Documento de identidad del cónyugue</label>
									
									
									<div className="gridFormShort">
										<label className="smallContent">Tipo de documento:</label>
										<div className="inputSelect">
											{inputDocTypeCouple}

											
											<span className="icon-briefcase icoInputSelect"></span>
										</div>
									</div>
									<div className="gridFormShort">
										<label className="smallContent">Número de documento:</label>
										<div className="inputSingleValue">
											{inputDocNumCouple}
											
											<span className="icon-credit-card"></span>
										</div>
									</div>
								</form>
								<div className="gridDesktopDivision"></div>
								<form id="gridBForm" className="gridBForm">
									
									<div className="gridMovilDivision">Aporte de Capital</div>

									{ btnAddingGoods }

									{ moneyCapitalInput }

									
									{
										goodRowInputs
									}

									{ goodInputTextBox }

									
									

									
								</form>
								<div className="wrapperBtnForm">
									<div className="gridFormLarge wrapperBtnNext">
										<Link to="/fecha-firma"><div className="btnNext" onClick={this.handlePersonalInformationFormSubmit.bind(this)}>Siguiente</div></Link>
									</div>
									<div className="gridFormLarge wrapperBtnTransparent">
										
									</div>
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
/*
//agregando selectores de socios
		

		let btnUserprofileInfo =[];

		if(this.props.enterpriseInProcessData.partners[0].user){
			for(let i= 0; i< this.props.enterpriseInProcessData.partners.length; i++){

				let key_id = uid()

				

				if(this.props.enterpriseInProcessData.partners[i].user.photo){

					let photoUrl = this.props.enterpriseInProcessData.partners[i].user.photo;

					if(this.state.partnerSelected == i){

						let classSelected = "btnPartnerProfile btnPartnerProfileSelected"

						btnUserprofileInfo.push(<BtnUserprofileInfo photoUrl={photoUrl} key={key_id} switchPartnerSelected={this.switchPartnerSelected} classSelected={classSelected} pos={i}/>)
					}else{
						let classSelected = "btnPartnerProfile"

						btnUserprofileInfo.push(<BtnUserprofileInfo photoUrl={photoUrl} key={key_id} switchPartnerSelected={this.switchPartnerSelected} classSelected={classSelected} pos={i}/>)
					}

					

				}else{
					console.log("dentro de else")
					console.log(this.props.enterpriseInProcessData.partners[i].user)
					console.log(this.props.enterpriseInProcessData.partners[i].user.name[0])
					let btnText = this.props.enterpriseInProcessData.partners[i].user.name[0];

					if(this.state.partnerSelected == i){
						let classSelected = "btnPartnerProfile btnPartnerProfileText btnPartnerProfileSelected"

						btnUserprofileInfo.push(<BtnUserprofileInfoText btnText={btnText} key={key_id} switchPartnerSelected={this.switchPartnerSelected} classSelected={classSelected} pos={i}/>)

					}else{

						let classSelected = "btnPartnerProfile btnPartnerProfileText"

						btnUserprofileInfo.push(<BtnUserprofileInfoText btnText={btnText} key={key_id} switchPartnerSelected={this.switchPartnerSelected} classSelected={classSelected} pos={i}/>)

					}
					
					
				}
				
			}
		}
*/

/*
<div className="btnPartnerProfile btnNewPartner">
	<span className="icon-add"></span>
</div>
*/									

//value={dataReader.name != undefined ? this.props.enterpriseInProcessData.partners[this.state.partnerSelected].user.name : ""}