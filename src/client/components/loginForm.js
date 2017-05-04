/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom'

export default class LoginForm extends Component{


	render(){


		return <div className="login">
				<div className="wrapperLogin">
					<div className="wrapperBtnClose">
						<Link to="/">
							<span className="icon-cross"></span>
						</Link>
					</div>
					<figure>
						<img src="#"/>
					</figure>
					<h5>Una frase vendedora de lo que hacemos</h5>
					<div className="underlineBlue"></div>

					<div className="formLogin">
						<div className="gridFormShort">
							<label className="smallContent">Nombre completo</label>
							<div className="inputSingleValue">
								<input type="text"/>
								<span className="icon-head"></span>
							</div>
						</div>
						<div className="gridFormShort">
							<label className="smallContent">Apellidos</label>
							<div className="inputSingleValue">
								<input type="text"/>
								<span className="icon-head"></span>
							</div>
						</div>
						<div className="gridFormShort">
							<label className="smallContent">Correo</label>
							<div className="inputSingleValue">
								<input type="text"/>
								<span className="icon-mail_outline"></span>
							</div>
						</div>
						<div className="gridFormShort">
							<label className="smallContent">Contraseña</label>
							<div className="inputSingleValue">
								<input type="text"/>
								<span className="icon-lock"></span>
							</div>
						</div>
					</div>
					
					<div className="btnLoginForm emailLogin">
						<a href="">
							<span className=""></span>
							<p>Registrarme</p>
							<span></span>
						</a>
					</div>

					<div className="underlineGrey"></div>

					<div className="btnLoginForm fbLogin">
						<a href="/auth/facebook">
							<span className="icon-facebook"></span>
							<p>Registrarme con facebook</p>
							<span></span>
						</a>	
					
					</div>
					<div className="btnLoginForm linkedinLogin">
						<a href="/auth/linkedin">
							<span className="icon-linkedin"></span>
							<p>Registrarme con linkedin</p>
							<span></span>
						</a>
					</div>
				</div>
			</div>

	}
}