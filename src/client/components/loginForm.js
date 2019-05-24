/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom'

export default class LoginForm extends Component{
	constructor (props){
		super(props);
		this.state={
			name: '',
			email: '',
			password: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.login = this.login.bind(this);
		
	}

	handleChange (ev) {
		this.setState({ [ev.target.name]: ev.target.value })
	}

	login () {
		fetch('/login', {
			method: 'POST',
			headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(this.state)
		})
			.then(res => {
				location.replace(res.url)
			})
			.catch(error => console.error(error))
	}

	render(){


		return <div className="login">
				<div className="wrapperLogin">
					<div className="wrapperBtnClose">
						<Link to="/">
							<span className="icon-cross"></span>
						</Link>
					</div>
					<figure>
						<img src="css/img/LogotipoLegaly.svg"/>
					</figure>
					<h5>Registrate facilmente, luego llena el formulario.</h5>
					<div className="underlineBlue"></div>

					<div className='form-container'>
						<div className='form-input'>
							<img src='css/img/Icon.svg' />
							<input type='text' placeholder='Nombre' name='name' value={this.state.name} onChange={this.handleChange} />
						</div>
						<div className='form-input'>
							<img src='css/img/Mail.svg' />
							<input type='email' placeholder='Correo' name='email' value={this.state.email} onChange={this.handleChange} />
						</div>
						<div className='form-input'>
							<img src='css/img/Lock.svg' />
							<input type='password' placeholder='Contraseña' name='password' value={this.state.password} onChange={this.handleChange} />
						</div>
						<button onClick={this.login}>Ingresar</button>
					</div>
					{/* <div className="wrapperBtnLogin">
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
						<div className="btnLoginForm googleLogin">
							<a href="/auth/google">
								<span className="icon-google"></span>
								<p>Registrarme con google</p>
								<span></span>
							</a>
						</div>
					</div> */}

				</div>
			</div>

	}
}

/*
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
					*/