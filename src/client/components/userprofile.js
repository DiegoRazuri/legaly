/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom'
import uid from 'uid'

import ServiceState from './serviceState';
import ContactRow from './contactRow';

export default class Userprofile extends Component{

	componentWillMount(){
		
		this.props.isItLogin();
		
		
	}
	
	componentDidMount(){
		window.scrollTo(0, 0)
	}


	render(){

		let serviceState;
		let contactRow =[]
		let nationality;

		this.props.user.enterprise.map((enterprise)=>{
			if(enterprise.inProcess == true){

				serviceState = <ServiceState enterpriseData = {enterprise}/>

			}

			let companyName = enterprise.name ? enterprise.name : enterprise.optionNames[0]

			enterprise.partners.map((partner)=>{
				if(partner.user._id != this.props.user._id ){
					let key_id = uid()

					contactRow.push( <ContactRow key={key_id} user={partner.user} companyName = {companyName}/>);
				}
			});
		});

		if(this.props.user.documentType){
			if(this.props.user.documentType == "DNI"){
				nationality = "peruana"

			}else{
				nationality = "extranjero"
			}
		}



		return <div className="sectionUserprofile">
					<div className="wrapperPersonalInformation">
						<h4 className="bigTitlesSS">Información de identificación</h4>
						<div className="underlineBlue"></div>
						
						<div className="blockPersonalInformation">
							<div className="gridPersonalInformationA">
								<figure className="userProfilePhoto">
									<img src={this.props.user.photo}/>
								</figure>
								<div className="wrapperPersonalInformationText">
									<h5 className="mediumContent">{this.props.user.name}</h5>
									<div className="gridUserInfo">
										<span className="icon-head"></span>
										<p className="smallContent">{this.props.user.documentType} {this.props.user.documentNumber}</p>
									</div>
									<div className="gridUserInfo">
										<span className="icon-briefcase"></span>
										<p className="smallContent">{this.props.user.profession ? this.props.user.profession : "--"}</p>
									</div>
									<div className="gridUserInfo wrapperBtnLogout">
										<a href="/logout" className="btnLogout">Cerrar sesión</a>
									</div>

								</div>
							</div>
							<div className="underlineGrey"></div>
							<div className="gridPersonalInformationB">
								<ul>
									<li>
										<p className="dataName smallContent">Nacionalidad:</p>
										<p className="userData smallContent">{nationality}</p>
									</li>
									<li>
										<p className="dataName smallContent">Lugar de nacimiento:</p>
										<p className="userData smallContent">--</p>
									</li>
									<li>
										<p className="dataName smallContent">Fecha de nacimiento:</p>
										<p className="userData smallContent">--</p>
									</li>
									<li>
										<p className="dataName smallContent">Estado civil:</p>
										<p className="userData smallContent">{this.props.user.civilStatus}</p>
									</li>
									<li>
										<p className="dataName smallContent">Domicilio:</p>
										<p className="userData smallContent">{this.props.user.location}</p>
									</li>
									<li>
										<p className="dataName smallContent">Teléfono:</p>
										<p className="userData smallContent">{this.props.user.phoneNumber ? this.props.user.phoneNumber : "--"}</p>
									</li>
									<li>
										<p className="dataName smallContent">Correo:</p>
										<p className="userData smallContent userDataEmail">{this.props.user.email}</p>
									</li>
								</ul>
							</div>
						</div>
						
					</div>
					<div className="wrapperServicesState">
						<h4 className="bigTitlesSS">Estado de servicios</h4>
						<div className="wrapperUnderline">
							<div className="underlineBlue"></div>	
						</div>
						
						{serviceState}

					</div>
					<div className="wrapperPartnersNetwork">
						<h4 className="bigTitlesSS">Red de socios</h4>
						<div className="underlineBlue"></div>
						<div className="wrapperPartners">
							
							{contactRow}
						
						</div>
					</div>
				</div>

	}
}