/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link, Redirect} from 'react-router-dom'

export default class DateForm extends Component{

	constructor (props){
		super(props);
		this.state={

			redirect : false,
			district: ""
		}
		
	}

	handleRadioOption(ev){
		this.setState({
			district : ev.target.value
		})

		this.props.inputTextHandlerRootLevel(ev);
	}

	


	handleDateFormSubmit(){

		let i_date, i_time, i_location;

		let msg = document.getElementById("msgNotarySelection");

		//i_time = ReactDom.findDOMNode(this.refs.signAppointmentTime);
		i_location = this.state.district;

		//i_date.parentNode.classList.remove("inputError");
		//i_time.parentNode.classList.remove("inputError");
		//i_location.parentNode.classList.remove("inputError");

		let errors = 0;

		if(this.state.district == ""){


			msg.style.color = "red";
			msg.innerText = "Debes elegir una notaría donde firmar.";

			

			errors += 1;

		}

		

		if(errors == 0){

			
			let json = {
				"field" : "signAppointmentDate",
				"value" : this.state.dateServerFormat
			} 
			this.props.insertDataRootLevel(json)

			this.props.sendSingingDateInformation.call(null)

			this.setState({
				redirect :true
			})
		}else{
			
		
		}
		

	}
	componentWillMount(){
		let date = new Date();

			let numOfDays = 3;

			let options = {
				weekday : 'long'
			};

			let dayName = date.toLocaleDateString('es-MX', options)

			let optionsRestric ={
				year: 'numeric',
				month : 'numeric',
				day : 'numeric'
			}

			let day = date.toLocaleDateString('es-MX', optionsRestric)

			let dateComplete;

			if(dayName == "jueves" || dayName == "viernes" || dayName == "sábado"){
				numOfDays = 4;
				let dayArry = day.split("/")
				let dayNum = parseInt(dayArry[0])
				dayNum += numOfDays;
				

				if(dayNum >= 31){
					dayNum = dayNum - 30

					let newMonth = parseInt(dayArry[1])
					newMonth += 1;

					if(newMonth <= 9 ){

						let val = "0" + newMonth.toString();

						dayArry[1] = val;
					}else{
						dayArry[1] = newMonth;
					}
					
					
				}

				if(dayNum <= 9){
					let val = "0" + dayNum;
					dayArry[0] = val;
				}else{
					dayArry[0] = dayNum;
				}



				dateComplete = dayArry[0] + "-" + dayArry[1] + "-" + dayArry[2]
				let dateServerFormat = dayArry[2] + "-" + dayArry[1] + "-" + dayArry[0]
				dateComplete.toString();
				this.setState({
					date: dateComplete,
					dateServerFormat : dateServerFormat
				});
				

			}else{
				let dayArry = day.split("/")
				let dayNum = parseInt(dayArry[0])
				dayNum += numOfDays;

				if(dayNum >= 31){
					dayNum = dayNum - 30

					let newMonth = parseInt(dayArry[1])
					newMonth += 1;

					if(newMonth <= 9 ){

						let val = "0" + newMonth.toString();

						dayArry[1] = val;
					}else{
						dayArry[1] = newMonth;
					}

					
				}

				if(dayNum <= 9){
					let val = "0" + dayNum;
					dayArry[0] = val;
				}else{
					dayArry[0] = dayNum;
				}

				let newMonth = parseInt(dayArry[1])

				if(newMonth <= 9){
					let val = "0" + newMonth;
					dayArry[1] = val;
				}
				

				dateComplete = dayArry[0] + "-" + dayArry[1] + "-" + dayArry[2]
				let dateServerFormat = dayArry[2] + "-" + dayArry[1] + "-" + dayArry[0]
				dateComplete.toString();
				this.setState({
					date: dateComplete,
					dateServerFormat : dateServerFormat
				});
				
			}
	}

	componentDidMount(){
		window.scrollTo(0, 0)

	}
	
	
	
	render(){

		if(this.state.redirect){
			return <Redirect to="/seleccion-metodo-pago"/>
		}
		else{

			return <div className="sectionEnterpriseIncorporation">
						<div className="wrapperIncorporationForm">

							<div className="dateForm">
								<div className="gridForm">
									<h3 className="bigTitlesSS">Firma de Minuta</h3>
									<div className="underlineBlue"></div>
									<p className="instructions smallContent">En los próximos días te contactaremos para establecer una cita en la notaría para la toma de firmas de todos los socios. Elige la notaría donde firmarás la minuta.</p>
									<form>
										<div className="gridFormShort">
											<label className="smallContent">Fecha estimada de toma de firma</label>
											<div className="inputSingleValue">
												
												<label id="txtSignDate" className="smallContent">{this.state.date}</label>
											</div>
										</div>
										

										<div className="gridFormLarge gridFormMutable">
											<label id="msgNotarySelection" className="smallContent">Notarías:</label>
											<div className="inputRadio">
												<label>
													<input type="radio" name="signAppointmentLocation" className="radioBtn" value="Cercado de Lima" checked={this.state.district=== "Cercado de Lima"} onChange={this.handleRadioOption.bind(this)}/>Donato Carpio Vélez | Cercado de Lima (Santa Beatriz)
												</label>
												<label>
													<input type="radio" name="signAppointmentLocation" className="radioBtn" value="San Isidro" checked={this.state.district=== "San Isidro"} onChange={this.handleRadioOption.bind(this)}/>Tinageros | San Isidro
												</label>
												<label>
													<input type="radio" name="signAppointmentLocation" className="radioBtn" value="San Miguel" checked={this.state.district=== "San Miguel"} onChange={this.handleRadioOption.bind(this)}/>Landázuri | San Miguel
												</label>
												<label>
													<input type="radio" name="signAppointmentLocation" className="radioBtn" value="Magdalena" checked={this.state.district=== "Magdalena"} onChange={this.handleRadioOption.bind(this)}/>Acevedo Mendoza | Magdalena
												</label>


											</div>
										</div>
										
										<div className="gridFormLarge gridFormMutable wrapperBtnNext">
											<a><div className="btnNext" onClick={this.handleDateFormSubmit.bind(this)}>Siguiente</div></a>
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
/*
Fragmento de codigo de formulario antiguo con validaciones de fechas


	render(){

		if(this.state.redirect){
			return <Redirect to="/metodo-pago"/>
		}
		else{

			let date = new Date();

			let numOfDays = 4;

			let options = {
				weekday : 'long'
			};

			let dayName = date.toLocaleDateString('es-MX', options)

			let optionsRestric ={
				year: 'numeric',
				month : 'numeric',
				day : 'numeric'
			}

			let day = date.toLocaleDateString('es-MX', optionsRestric)

			let dateComplete;

			if(dayName == "miércoles" || dayName == "jueves" || dayName == "viernes" || dayName == "sábado"){
				numOfDays = 5;
				let dayArry = day.split("/")
				let dayNum = parseInt(dayArry[0])
				dayNum += numOfDays;
				

				if(dayNum >= 31){
					dayNum = dayNum - 30

					let newMonth = parseInt(dayArry[1])
					newMonth += 1;

					if(newMonth <= 9 ){

						let val = "0" + newMonth.toString();

						dayArry[1] = val;
					}else{
						dayArry[1] = newMonth;
					}
					
					
				}

				if(dayNum <= 9){
					let val = "0" + dayNum;
					dayArry[0] = val;
				}else{
					dayArry[0] = dayNum;
				}



				dateComplete = dayArry[2] + "-" + dayArry[1] + "-" + dayArry[0]
				dateComplete.toString();

			}else{
				let dayArry = day.split("/")
				let dayNum = parseInt(dayArry[0])
				dayNum += numOfDays;

				if(dayNum >= 31){
					dayNum = dayNum - 30

					let newMonth = parseInt(dayArry[1])
					newMonth += 1;

					if(newMonth <= 9 ){

						let val = "0" + newMonth.toString();

						dayArry[1] = val;
					}else{
						dayArry[1] = newMonth;
					}

					
				}

				if(dayNum <= 9){
					let val = "0" + dayNum;
					dayArry[0] = val;
				}else{
					dayArry[0] = dayNum;
				}

				let newMonth = parseInt(dayArry[1])

				if(newMonth <= 9){
					let val = "0" + newMonth;
					dayArry[1] = val;
				}
				

				dateComplete = dayArry[2] + "-" + dayArry[1] + "-" + dayArry[0]
				dateComplete.toString();
			}

			



			let dataReaderEnterprise = this.props.enterpriseInProcessData;

			let inputDate, selectTime, inputLocation;

			if(dataReaderEnterprise){

				inputDate = <input type="date" id="inputDate" value={dataReaderEnterprise.signAppointmentDate != undefined ? dataReaderEnterprise.signAppointmentDate : ""} onChange={this.props.inputTextHandlerRootLevel.bind()} name="signAppointmentDate" min={dateComplete} ref="signAppointmentDate"/>;

				selectTime = <select value={dataReaderEnterprise.signAppointmentTime != undefined ? dataReaderEnterprise.signAppointmentTime : ""} onChange={this.props.inputTextHandlerRootLevel.bind()} name="signAppointmentTime" ref="signAppointmentTime">
								<option disabled></option>
								<option>8:00 am</option>
								<option>8:30 am</option>
								<option>9:00 am</option>
								<option>9:30 am</option>
								<option>10:00 am</option>
								<option>10:30 am</option>
								<option>11:00 am</option>
								<option>11:30 am</option>
								<option>12:00 pm</option>
								<option>12:30 pm</option>
								<option>1:00 pm</option>
								<option>1:30 pm</option>
								<option>2:00 pm</option>
								<option>2:30 pm</option>
								<option>3:00 pm</option>
								<option>3:30 pm</option>
								<option>4:00 pm</option>
								<option>4:30 pm</option>
								<option>5:00 pm</option>
								<option>5:30 pm</option>
								<option>6:00 pm</option>

							</select>

				inputLocation = <input type="text" value={dataReaderEnterprise.signAppointmentLocation != undefined ? dataReaderEnterprise.signAppointmentLocation : ""} onChange={this.props.inputTextHandlerRootLevel.bind()} name="signAppointmentLocation" ref="signAppointmentLocation"/>

			}


			return <div className="sectionEnterpriseIncorporation">
						<div className="wrapperIncorporationForm">

							<div className="dateForm">
								<div className="gridForm">
									<h3 className="bigTitlesSS">Delivery - Firma de Constitución</h3>
									<div className="underlineBlue"></div>
									<p className="instructions smallContent">Establece la hora, fecha y dirección de tu preferencia para que uno de nuestros colaboradores vaya con los papeles necesarios para la firma y huella digital de todos los socios. Por lo tanto, todos los fundadores deben de estar para dicha reunión. </p>
									<form>
										<div className="gridFormShort">
											<label className="smallContent">Fecha</label>
											<div className="inputDate">
												{inputDate}
												<span className="icon-layout icoInputDate"></span>
											</div>
										</div>
										<div className="gridFormShort">
											<label className="smallContent">Hora</label>
											<div className="inputSelect">
												
												{selectTime}

												<span className="icon-clock icoInputSelect"></span>
											</div>
										</div>
										<div className="gridFormLarge">
											<label className="smallContent">Dirección</label>
											<div className="inputSingleValue">
												
												{inputLocation}

												<span className="icon-room"></span>
											</div>
										</div>
										<div className="gridFormLarge gridFormMutable wrapperBtnNext">
											<a><div className="btnNext" onClick={this.handleDateFormSubmit.bind(this)}>Siguiente</div></a>
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


*/


//<div className="btnFaq">Quiero saber más</div>

//<Link to="/informacion-perosnal"><div className="btnTransparentBackground">Anterior</div></Link>