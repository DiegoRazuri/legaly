/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, Redirect, match, Route} from 'react-router-dom'


import LoginForm from './loginForm';
import Landing from './landing';
import Incorporate from './incorporate';

import EnterpriseInformationForm from './enterpriseInformationForm';
import PartnersAddingForm from './partnersAddingForm';
import PersonalInformationForm from './personalInformationForm';
import DateForm from './dateForm';
import PaymentMethodForm from './paymentMethodForm';
import Userprofile from './userprofile';
import UserAvatar from './userAvatar';
import TrackingPanel from './trackingPanel';
import TrackingEnterpriseInfo from './trackingEnterpriseInfo';
import TheCreatorPanel from './theCreatorPanel';



export default class App extends Component{

	constructor (props){
		super(props);
		this.state={
			user : false,
			months: [],
			enterpriseInProcess: 0,
			enterpriseSaved:0,
			partnersInvitationSaved: 0,
			enterpriseInProcessData: {}

		}

		this.sendPartnerInvitation = this.sendPartnerInvitation.bind(this);
		this.switchEnterpriseInProcess = this.switchEnterpriseInProcess.bind(this);
		this.sendEnterpriseInformation = this.sendEnterpriseInformation.bind(this);
		this.inputTextHandler = this.inputTextHandler.bind(this);
		this.selectHandler = this.selectHandler.bind(this);
		this.rowInputsHandler = this.rowInputsHandler.bind(this);
		this.deleteRowInputHandle = this.deleteRowInputHandle.bind(this);
		this.sendPartnersInformation = this.sendPartnersInformation.bind(this);
		this.inputTextHandlerRootLevel = this.inputTextHandlerRootLevel.bind(this);
		this.sendSingingDateInformation = this.sendSingingDateInformation.bind(this);
		this.isItLogin = this.isItLogin.bind(this);
		this.deletingPartnerRow = this.deletingPartnerRow.bind(this);
		this.rowPartnerInputHandler = this.rowPartnerInputHandler.bind(this);
		this.logPageView = this.logPageView.bind(this);
		this.updateEnterpriseInformation = this.updateEnterpriseInformation.bind(this);
		this.rowAccountManagerInputHandler = this.rowAccountManagerInputHandler.bind(this);
		this.updatePartnerInvitation = this.updatePartnerInvitation.bind(this);
		this.switchBtnNavSelected = this.switchBtnNavSelected.bind(this);
	
	}


	// no se esta utilizando pero sirve de ejemplo

	switchStepState(key){
		if(this.state[key] == 0){
			this.setState({
				[key] : 1
			})
		}else{
			this.setState({
				[key] : 0
			})
		}
		
	}

	// FORMSTAGE
	inputTextHandler(ev){
		let target = ev.target;

		let name = target.name;

		let newData = this.state.enterpriseInProcessData;

		if(name == "moneyInput" || name == "goodsInput"){

			newData.partners[target.dataset.pos][name] = target.value;

		}else{

			newData.partners[target.dataset.pos].user[name] = target.value;

		}

		this.setState({enterpriseInProcessData : newData});
	}

	// FORMSTAGE
	inputTextHandlerRootLevel(ev){
		let target = ev.target;
		let name = target.name;

		let newData = this.state.enterpriseInProcessData

		newData[name] = target.value;

		this.setState({enterpriseInProcessData : newData});
	}

	// FORMSTAGE
	selectHandler(ev){

		let target = ev.target;

		let newData = this.state.enterpriseInProcessData;

		newData.partners[target.dataset.pos].user[target.name] = target.value;

		this.setState({enterpriseInProcessData : newData});
	}

	// FORMSTAGE
	rowInputsHandler(json){
		

		let newData = this.state.enterpriseInProcessData;

		newData.partners[json.partnerSelected].goodsInput.push({
			goodName : json.goodName,
			goodValue : json.goodValue
		})

		this.setState({ enterpriseInProcessData : newData});
	}

	// FORMSTAGE
	rowPartnerInputHandler(json){
	

		let newData = this.state.enterpriseInProcessData;

		let partner = {
			user : { name : json.partnerEmail},
			position : json.position
		}

		

		newData.partners.push(partner)

		this.setState({ enterpriseInProcessData : newData});

	}

	rowAccountManagerInputHandler(json){
	

		let newData = this.state.enterpriseInProcessData;

		newData.partners[0].position = json.position;

		this.setState({ enterpriseInProcessData : newData});

	}

	// FORMSTAGE
	deleteRowInputHandle(json){
		
		let newData = this.state.enterpriseInProcessData;

		newData.partners[json.partnerSelected].goodsInput.splice(json.inputPos, 1)

		this.setState({enterpriseInProcessData: newData})
	}

	// FORMSTAGE
	deletingPartnerRow(json){
		
		if(this.state.partnersInvitationSaved == 1){

			$.post('/api/delete_partner_invitation', json, (res)=>{
				if(res.state == 1){
					
					
					let newData = this.state.enterpriseInProcessData;

					newData.partners.splice(json.partnerSelected, 1)

					this.setState({enterpriseInProcessData: newData})
				}
			});

		}else{
			
			let newData = this.state.enterpriseInProcessData;

			newData.partners.splice(json.partnerSelected, 1)

			this.setState({enterpriseInProcessData: newData})
		}

		

	}

	//REACTSTAGE
	switchEnterpriseInProcess(){
		if(this.state.enterpriseInProcess == 1){
			this.setState({enterpriseInProcess: 0})
		}else{
			this.setState({enterpriseInProcess : 1})
		}
		
	}

	// REACTSTAGE STEP 1
	sendEnterpriseInformation(json){
		

		$.post('/api/enterprise_information', json, (res)=>{
			if(res){
				console.log(res)
				
				let newEnterpriseProgressData = res.enterprise

				this.setState({
					enterpriseInProcessData : newEnterpriseProgressData,
					enterpriseSaved: 1
				})
			}
		});
	}

	//DBSTAGE STEP 4
	sendSingingDateInformation(){

		let json = this.state.enterpriseInProcessData;
		
		$.post('/api/signing_date_information', json, (res)=>{
			if(res){
				console.log("info de res")
				console.log(res)

				let newData = this.state.enterpriseInProcessData;

				newData.price = res.price;

				this.setState({enterpriseInProcessData : newData})

			
			
			}
		});

	}

	//DBSTAGE STEP 3
	sendPartnersInformation(){

		let json = this.state.enterpriseInProcessData

		$.post('/api/partners_information', json, (res)=>{
			if(res){
				console.log("info de res")
				console.log(res)

				//let newData = this.state.enterpriseInProcessData.user

				//this.setState({user: newData});

				/*
				this.state.user.enterprise.push(res.enterprise)

				let newData = this.state.user

				let newEnterpriseProgressData = res.enterprise

				this.setState({
					user : newData,
					enterpriseInProcessData : newEnterpriseProgressData

				})
				*/
			
				//console.log(this.state.enterpriseInProcessData)
			}
		});
	}
	
	//DBSTAGE STEP 2
	sendPartnerInvitation(){


		//capturo la data para enviarla

		let json = this.state.enterpriseInProcessData;
		
		$.post('/api/partners_invitation', json, (res)=>{
			if(res){
				
				let newEnterpriseProgressData = res.enterprise

				this.setState({
					enterpriseInProcessData : newEnterpriseProgressData,
					partnersInvitationSaved : 1
					
				})
			}
		});
	}

	updatePartnerInvitation(){
		let json = this.state.enterpriseInProcessData;
		
		$.post('/api/partners_invitation_update', json, (res)=>{
			if(res){

				console.log(res)
				
				let newEnterpriseProgressData = res.enterprise

				this.setState({
					enterpriseInProcessData : newEnterpriseProgressData
					
				})
			}
		});
	}

	//DBSTAGE STEP 2
	updateEnterpriseInformation(json){

		json._id = this.state.enterpriseInProcessData._id;

		$.post('/api/enterprise_information_update', json, (res)=>{
			if(res){

				console.log(res)
				

				let newEnterpriseProgressData = res

				this.setState({
					enterpriseInProcessData : newEnterpriseProgressData

				})
			}
		});
	}


	




	

	isItLogin(){
		$.ajax({
			type:'GET',
            url: '/api/usersession', 
            processData: false,  
 			contentType: false,  
            cache:false,
            success: (res)=>{
            	if(res.user != false){

	            	this.setState({
	            		user : res
	            	})

            	}
               
            },
            error: function(data){
                console.log("error");
                
            }
        });
	}

	componentWillMount(){
		this.isItLogin();
		
		
	}
	componentDidMount(){
		$("#btnMovilMenu").click(function(){
			
			$("#movilMenu").slideDown();
		})

		$("#btnCloseMovilMenu").click(function(){
			
			$("#movilMenu").fadeOut();
		})

		
	}



	logPageView(){
	//    ReactGA.set({page : window.location.pathname });
	//    ReactGA.pageview(window.location.pathname);

	    // instruccion para que suba el scroll hasta el tope cuando carga la ruta
	    let {
	        action
	    } = this.state.location;

	    if (action === 'PUSH') {
	        window.scrollTo(0, 0);
	    }
	}
	switchBtnNavSelected(pos){
		if(pos == 0){
			this.setState({
				btnNavCons : 'btnNavSelected',
				btnNavUs : '',
				btnNavInfo : ''
			})
		} else if( pos == 1){
			this.setState({
				btnNavCons : '',
				btnNavUs : 'btnNavSelected',
				btnNavInfo : ''
			})
		}else if( pos == 2){
			this.setState({
				btnNavCons : '',
				btnNavUs : '',
				btnNavInfo : 'btnNavSelected',

			})
		}else{
			this.setState({
				btnNavCons : '',
				btnNavUs : '',
				btnNavInfo : '',

			})
		}
	}

	
	render(){
		
		let userLogin;

		if(this.state.user != false){
			userLogin = <UserAvatar user= {this.state.user} switchBtnNavSelected={this.switchBtnNavSelected}/>
		}else{
			userLogin = <div className="btnRegistration">
								<Link to="/login">
									<span className="icon-head"></span>
									<p>Registrate</p>
								</Link>
							</div>

		}

	
							
		

		return <div className="appContainer">
					<header>
						<div id="movilMenu" className="movilMenu">
							<div className="wrapperHeaderMovilMenu">
								<span id="btnCloseMovilMenu" className="icon-cross"></span>
								<figure className="movilMenuMainLogo">
									<img src="css/img/LogotipoLegaly.svg"/>
								</figure>
								<span></span>	
							</div>
							<div className="wrapperMovilMenuBtn">
								<div className="wrapperBtnRegistration">
									<span className="icon-head"></span>
									<Link to="/login" className="mediumContent">Registrate</Link>
								</div>
								<div className="underlineWhite"></div>
								<ul>
									<li>
										<Link to="/constitucion" className="mediumContent">Constituye tu Empresa</Link>
									</li>
									<li>
										<a href="#" className="mediumContent">Quienes somos</a>
									</li>
									<li>
										<a href="#" className="mediumContent">Información</a>
									</li>
								</ul>
								<div className="underlineWhite"></div>
								<ul>
									<li className="rowMenuMovil">
										<span className="icon-whatsapp"></span>
										<p className="smallContent">942 914 542</p>
									</li>
									<li className="rowMenuMovil">
										<span className="icon-mail_outline"></span>
										<p className="smallContent">info@legitify.com</p>
									</li>
									<li className="rowMenuMovil">
										<span className="icon-clock"></span>
										<p className="smallContent">Lun-Vie: 9am - 6pm Sab: 9am - 1pm </p>
									</li>
									<li className="rowMenuMovil wrapperMovilMenuSocialNetwork">
										<a href="#">
											<span className="icon-facebook"></span>
										</a>
										<a href="#">
											<span className="icon-instagram"></span>
										</a>
										<a href="#">
											<span className="icon-youtube"></span>	
										</a>
										
									</li>
								</ul>
							</div>
							
						</div>
						<div className="wrapperGeneralInfo">
							<div className="gridSocialNetworks">
								<a href="#" className="socialNetworkIco"><span className="icon-facebook"></span></a>
								<a href="#" className="socialNetworkIco"><span className="socialNetwork icon-instagram"></span></a>
								<a href="#" className="socialNetworkIco"><span className="socialNetwork icon-youtube"></span></a>
							</div>
							<div className="gridGeneralContactInfo">
								<div className="subGrid">
									<span className="icon-office"></span>
									<p>01 468 1546</p>
								</div>
								<div className="subGrid">
									<span className="icon-mail_outline"></span>
									<p>info@legaly.pe</p>
								</div>
								<div className="subGrid">
									<span className="icon-clock"></span>
									<p>Lun-Vie: 9am - 6pm / Sab: 9am - 1pm</p>
								</div>
							</div>
						</div>	
						<nav>
							<span id="btnMovilMenu" className="icon-align-justify btnMovilMenu"></span>
							<figure className="mainLogo">
								<Link to="/" onClick={this.switchBtnNavSelected.bind(this, 4)}>
									<img src="css/img/LogotipoLegaly.svg"/>
								</Link>
							</figure>
							<div className="gridNav">
								<Link to="/informacion-empresa" className="btnMainNav" className={this.state.btnNavCons} onClick={this.switchBtnNavSelected.bind(this, 0)}>Constituye tu Empresa</Link>
								<a href="#" className="btnMainNav" className={this.state.btnNavUs} onClick={this.switchBtnNavSelected.bind(this, 1)}>Quienes somos</a>
								<a href="#" className="btnMainNav" className={this.state.btnNavInfo} onClick={this.switchBtnNavSelected.bind(this, 2)}>Información</a>
							</div>
							

							{ userLogin }
						

						</nav>
					</header>


					<div className="wrapperViews">

						
						<Route exact path="/" component={Landing}/>
					
					
						<Route path="/informacion-empresa" render={(props) => ( this.state.user == false ? (<Redirect to="/login"/>) : (<EnterpriseInformationForm user={this.state.user} sendEnterpriseInformation={this.sendEnterpriseInformation} enterpriseInProcessData={this.state.enterpriseInProcessData} enterpriseInProcess={this.state.enterpriseInProcess} enterpriseSaved={this.state.enterpriseSaved} updateEnterpriseInformation={this.updateEnterpriseInformation}/>)   )}/>
						<Route path="/invitar-socios" render={(props)=>( this.state.user == false ? (<Redirect to="/login"/>) : (<PartnersAddingForm user={this.state.user} sendPartnerInvitation={this.sendPartnerInvitation} enterpriseInProcessData={this.state.enterpriseInProcessData} rowPartnerInputHandler={this.rowPartnerInputHandler} deletingPartnerRow={this.deletingPartnerRow} rowAccountManagerInputHandler={this.rowAccountManagerInputHandler} partnersInvitationSaved={this.state.partnersInvitationSaved} updatePartnerInvitation={this.updatePartnerInvitation}/> )   )}/>
						<Route path="/informacion-personal" render={(props)=>( this.state.user == false ? (<Redirect to="/login"/>) : (<PersonalInformationForm user={this.state.user} enterpriseInProcessData={this.state.enterpriseInProcessData} inputTextHandler={this.inputTextHandler} selectHandler={this.selectHandler} rowInputsHandler={this.rowInputsHandler} deleteRowInputHandle={this.deleteRowInputHandle} sendPartnersInformation={this.sendPartnersInformation} enterpriseSaved={this.state.enterpriseSaved}/> )    )}/>
						<Route path="/fecha-firma" render={(props)=>( this.state.user == false ? (<Redirect to="/login"/>) : (<DateForm inputTextHandlerRootLevel={this.inputTextHandlerRootLevel} enterpriseInProcessData={this.state.enterpriseInProcessData} sendSingingDateInformation={this.sendSingingDateInformation} enterpriseSaved={this.state.enterpriseSaved}/>)    )}/>
						<Route path="/metodo-pago" onUpdate={this.logPageView} render={(props)=>( this.state.user == false ? (<Redirect to="/login"/>) : (<PaymentMethodForm enterpriseInProcessData={this.state.enterpriseInProcessData} enterpriseSaved={this.state.enterpriseSaved}/>)    )}/>
						<Route path="/perfil" onUpdate={this.logPageView} render={(props)=>( this.state.user == false ? (<Redirect to="/login"/>) : (<Userprofile user={this.state.user} isItLogin={this.isItLogin}/>) )}/>
						<Route path="/panel-listado-empresas" onUpdate={this.logPageView} render={(props)=>( <TrackingPanel user={this.state.user} isItLogin={this.isItLogin}/>) }/>
						<Route path="/panel-detalle-empresas/:enterprise_id" onUpdate={this.logPageView}  component={TrackingEnterpriseInfo}/>
						<Route path="/the-creator-panel" onUpdate={this.logPageView} render={(props)=>( <TheCreatorPanel user={this.state.user} isItLogin={this.isItLogin}/>) }/>
						
							
						
					</div>


					<footer>
						<div className="wrapperFooterInfo">
							<div id="footerGrid1" className="gridFooterInfo gridFooterB">
								<h5>ATENCIÓN AL CLIENTE</h5>
								<div className="underlineWhite"></div>
								<ul>
									<li>Lun-Vie : 9am - 6pm / Sab : 9am - 1pm</li>
									<li>Jr. Tomás Guido 160, Lince - CC. Risso</li>
									<li>info@legaly.pe</li>
									<li>01 468 1546</li>
								</ul>
							</div>
							<div id="footerGrid2" className="gridFooterInfo gridFooterA">
								<h5>LEGALY ®</h5>
								<div className="underlineWhite"></div>
								<ul>
									<li><a href="#">Constituye tu empresa</a></li>
									<li><a href="#">Registra tu marca</a></li>
									<li><a href="#">Blog corporativo</a></li>
								</ul>
							</div>
							<div id="footerGrid3" className="gridFooterInfo gridFooterA">
								<h5>INFO</h5>
								<div className="underlineWhite"></div>
								<ul>
									<li><a href="#">¿Como funciona?</a></li>
									<li><a href="#">El equipo</a></li>
									<li><a href="#">Ayuda</a></li>
								</ul>
							</div>
							<div id="footerGrid4" className="gridFooterInfo gridFooterA">
								<h5>PAGOS</h5>
								<div className="underlineWhite"></div>
								<ul>
									<li><a href="#">Métodos de pago</a></li>
									<li><a href="#">Soporte ventas</a></li>
								</ul>
							</div>
							<div id="footerGrid5" className="gridFooterInfo gridFooterA">
								<h5>LEGAL</h5>
								<div className="underlineWhite"></div>
								<ul>
									<li><a href="#">Politicas de privacidad</a></li>
									<li><a href="#">Términos & Condiciones</a></li>
									<li><a href="#">Seguridad</a></li>
								</ul>
							</div>
							<div id="footerGrid6" className="gridFooterInfo gridFooterB">
								<h5>SUSCRÍBITE AL BOLETÍN</h5>
								<div className="underlineWhite"></div>
								<div className="gridForm">
									<input type="text" placeholder="Correo Electrónico"/>
									<span className="icon-arrow-right"></span>
								</div>
								<div className="gridFooterInfoSocialNetwork">
									<a href="#" className="socialNetworkIco"><span className="icon-facebook"></span></a>
									<a href="#" className="socialNetworkIco"><span className="socialNetwork icon-instagram"></span></a>
									<a href="#" className="socialNetworkIco"><span className="socialNetwork icon-youtube"></span></a>
								</div>
								
								
							</div>
						</div>
					</footer>
					<Route path="/login" component={LoginForm}/>
				</div>
	}
}

/*
	
	// este es el que finalmente debe quedar
	<Route path="/informacion-empresa" render={(props) => ( this.state.user == false ? (<Redirect to="/login"/>) : ( <Incorporate user={this.state.user}/> )   )}/>
	<Route path="/invitar-socios" render={(props)=>( this.state.user == false ? (<Redirect to="/login"/>) : (<Incorporate/>) )}/>
	<Route path="/informacion-personal" render={(props)=>( this.state.user == false ? (<Redirect to="/login"/>) : (<Incorporate/>) )}/>
	<Route path="/fecha-firma" render={(props)=>( this.state.user == false ? (<Redirect to="/login"/>) : (<Incorporate/>) )}/>
	<Route path="/metodo-pago" render={(props)=>( this.state.user == false ? (<Redirect to="/login"/>) : (<Incorporate/>) )}/>
	<Route path="/perfil" render={(props)=>( this.state.user == false ? (<Redirect to="/login"/>) : (<Userprofile/>) )}/>
						*/