/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom'

export default class Userprofile extends Component{


	render(){


		return <div className="sectionUserprofile">
					<div className="wrapperPersonalInformation">
						<h4 className="bigTitlesSS">Información de identificación</h4>
						<div className="underlineBlue"></div>
						<div className="blockPersonalInformation">
							<div className="gridPersonalInformationA">
								<figure className="userProfilePhoto">
									<img src="css/img/Fake-client.jpg"/>
								</figure>
								<div className="wrapperPersonalInformationText">
									<h5 className="mediumContent">Paul Alexander Braga Eguren</h5>
									<div className="gridUserInfo">
										<span className="icon-head"></span>
										<p className="smallContent">DNI 46080606</p>
									</div>
									<div className="gridUserInfo">
										<span className="icon-briefcase"></span>
										<p className="smallContent">empresario</p>
									</div>
								</div>
							</div>
							<div className="underlineGrey"></div>
							<div className="gridPersonalInformationB">
								<ul>
									<li>
										<p className="dataName smallContent">Nacionalidad:</p>
										<p className="userData smallContent">peruana</p>
									</li>
									<li>
										<p className="dataName smallContent">Lugar de nacimiento:</p>
										<p className="userData smallContent">iquitos</p>
									</li>
									<li>
										<p className="dataName smallContent">Fecha de nacimiento:</p>
										<p className="userData smallContent">21/08/1989</p>
									</li>
									<li>
										<p className="dataName smallContent">Estado civil:</p>
										<p className="userData smallContent">comprometido</p>
									</li>
									<li>
										<p className="dataName smallContent">Domicilio:</p>
										<p className="userData smallContent">jr. los cóndores 229 bellavista callao</p>
									</li>
									<li>
										<p className="dataName smallContent">Teléfono:</p>
										<p className="userData smallContent">996005400</p>
									</li>
									<li>
										<p className="dataName smallContent">Correo:</p>
										<p className="userData smallContent userDataEmail">plbraga@plaqart.com</p>
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
						<div className="blockServiceState">
							<figure className="serviceImage">
								<img src="css/img/Constitucion-icon.svg"/>
							</figure>
							<h6 className="bigTitlesOS serviceEnterpriseName">la empresa sa</h6>
							<div className="wrapperPie">
								<div className="pie">
									<div className="dataBackground"></div>
									<div className="pieData">50%</div>
								</div>	
							</div>
							
						</div>
						<div className="blockServiceState">
							<figure className="serviceImage">
								<img src="css/img/Constitucion-icon.svg"/>
							</figure>
							<h6 className="bigTitlesOS serviceEnterpriseName">la empresa sa</h6>
							<div className="wrapperPie">
								<div className="pie">
									<div className="dataBackground"></div>
									<div className="pieData">50%</div>
								</div>	
							</div>
							
						</div>
						<div className="blockServiceState">
							<figure className="serviceImage">
								<img src="css/img/Constitucion-icon.svg"/>
							</figure>
							<h6 className="bigTitlesOS serviceEnterpriseName">la empresa sa</h6>
							<div className="wrapperPie">
								<div className="pie">
									<div className="dataBackground"></div>
									<div className="pieData">50%</div>
								</div>	
							</div>
							
						</div>
					</div>
					<div className="wrapperPartnersNetwork">
						<h4 className="bigTitlesSS">Red de socios</h4>
						<div className="underlineBlue"></div>
						<div className="wrapperPartners">
							<div className="row">
								<figure>
									<img src="css/img/Fake-client.jpg"/>
								</figure>
								<div className="partnerInfo">
									<p className="mediumContent">jaime prado hernandez</p>
									<p className="enterpriseName mediumContent"><span className="icon-office"></span> La empresa sac</p>
								</div>
							</div>
							<div className="row">
								<figure>
									<img src="css/img/Fake-client.jpg"/>
								</figure>
								<div className="partnerInfo">
									<p className="mediumContent">jaime prado hernandez</p>
									<p className="enterpriseName mediumContent"><span className="icon-office"></span> La empresa sac</p>
								</div>
							</div>
							<div className="row">
								<figure>
									<img src="css/img/Fake-client.jpg"/>
								</figure>
								<div className="partnerInfo">
									<p className="mediumContent">jaime prado hernandez</p>
									<p className="enterpriseName mediumContent"><span className="icon-office"></span> La empresa sac</p>
								</div>
							</div>
						</div>
					</div>
				</div>

	}
}