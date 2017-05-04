/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Route, Link, Redirect, match } from 'react-router-dom'

import LoginForm from './loginForm';
import Userprofile from './userprofile';
import Landing from './landing';
import Incorporate from './incorporate';

export default class App extends Component{

	constructor (props){
		super(props);
		this.state={
			user : false,
			months: [],
			enterpriseInProcess: false,
			enterpriseIdInProcess: ""

		}

		this.sendEnterpriseInformation = this.sendEnterpriseInformation.bind(this);
		this.switchEnterpriseInProcess = this.switchEnterpriseInProcess.bind(this);
	
	}

	switchEnterpriseInProcess(){
		if(this.state.enterpriseInProcess == true){
			this.setState({enterpriseInProcess: false})
		}else{
			this.setState({enterpriseInProcess : true})
		}
		
	}
	
	sendEnterpriseInformation(json){
		$.post('/api/enterprise_information', json, (res)=>{
			if(res){
				console.log(res)

				this.state.user.enterprise.push(res.enterprise)

				let newData = this.state.user

				this.setState({
					user : newData,
					enterpriseInProcess : true,
					enterpriseIdInProcess : res.enterprise._id

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
                console.log(data);
            }
        });
	}

	componentWillMount(){
		this.isItLogin();
		
		
	}

	
	render(){
		
		let userLogin;

		if(this.state.user != false){
			userLogin = <figure className="userPhoto">
							<Link to="/perfil">
								<img src={this.state.user.photo}/>
							</Link>
						</figure>
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
						<div className="movilMenu">
							<div className="wrapperHeaderMovilMenu">
								<span className="icon-cross"></span>
								<figure className="movilMenuMainLogo">
									<img src="#"/>
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
										<a href="#" className="mediumContent">Registra tu marca</a>
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
									<span className="icon-whatsapp"></span>
									<p>942 914 542</p>
								</div>
								<div className="subGrid">
									<span className="icon-mail_outline"></span>
									<p>info@legitify.com</p>
								</div>
								<div className="subGrid">
									<span className="icon-clock"></span>
									<p>Lun-Vie: 9am - 6pm / Sab: 9am - 1pm</p>
								</div>
							</div>
						</div>	
						<nav>
							<span className="icon-align-justify btnMovilMenu"></span>
							<figure className="mainLogo">
								<img src="#"/>
							</figure>
							<div className="gridNav">
								<a href="#">Constituye tu Empresa</a>
								<a href="#">Registra tu marca</a>
								<a href="#">Quienes somos</a>
								<a href="#">Información</a>
							</div>
							

							{ userLogin }
						

						</nav>
					</header>


					<div className="wrapperViews">
						<Route exact path="/" component={Landing}/>
						
						
						<Route path="/informacion-empresa" render={(props) => ( 
							<Incorporate user={this.state.user} enterpriseInProcess={this.state.enterpriseInProcess} enterpriseIdInProcess={this.state.enterpriseIdInProcess} sendEnterpriseInformation={this.sendEnterpriseInformation} enterpriseInProcess={this.enterpriseInProcess} />   )}/>
						<Route path="/invitar-socios" render={(props)=>( <Incorporate user={this.state.user} enterpriseInProcess={this.state.enterpriseInProcess} enterpriseIdInProcess={this.state.enterpriseIdInProcess} />    )}/>
						<Route path="/informacion-personal" render={(props)=>( <Incorporate/>    )}/>
						<Route path="/fecha-firma" render={(props)=>( <Incorporate/>    )}/>
						<Route path="/metodo-pago" render={(props)=>( <Incorporate/>    )}/>
						<Route path="/perfil" render={(props)=>( this.state.user == false ? (<Redirect to="/login"/>) : (<Userprofile/>) )}/>
						

					</div>


					<footer>
						<div className="wrapperFooterInfo">
							<div id="footerGrid1" className="gridFooterInfo gridFooterB">
								<h5>ATENCIÓN AL CLIENTE</h5>
								<div className="underlineWhite"></div>
								<ul>
									<li>Lun-Vie : 9am - 6pm / Sab : 9am - 1pm</li>
									<li>Jr. Tomás Guido 150, Lince - CC. Risso</li>
									<li>info@legitify.com</li>
									<li>942 914 542</li>
								</ul>
							</div>
							<div id="footerGrid2" className="gridFooterInfo gridFooterA">
								<h5>LEGITIFY ®</h5>
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