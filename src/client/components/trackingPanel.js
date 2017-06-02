/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom'

import uid from 'uid'

export default class TrackingPanel extends Component{

	constructor (props){
		super(props);
		this.state={

			user_identified : 0,
			enterprises: [],
			months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"]
			

		}

		this.getEnterprises = this.getEnterprises.bind(this);
		this.handleServiceState = this.handleServiceState.bind(this);
		
	}

	getEnterprises(){
		$.get('/api/all_enterprises', (res)=>{
			
			console.log("empresas listadas")
			console.log(res)
		
			this.setState({enterprises : res})

		});
	}

	handleServiceState(){
		
		let serviceStateSelect = ReactDom.findDOMNode(this.refs.s_serviceState)
		let serviceState = ReactDom.findDOMNode(this.refs.s_serviceState).value.trim()
		let enterprise_id = serviceStateSelect.dataset.userid;

		let json = {
			serviceState :  serviceState,
			enterpriseId : enterprise_id
		}

		$.post('/api/update_service_state', json, (res)=>{
			
			console.log("service state")
			console.log(res)
		
			this.setState({enterprises : res})

		});
		

	}

	componentWillMount(){
		

		$.get('/api/is_it_admin', (res)=>{
			console.log("res")
			console.log(res)
			
			if(res.state == 1){
				
				this.setState({user_identified: res.state});

				this.getEnterprises();
				
			}
		});

	}

	render(){
		let panel;
		let enterpriseRow = [];

		console.log(this.state.enterprises)

		if(this.state.user_identified == 1){

			if(this.state.enterprises.length > 0 ){


				this.state.enterprises.map((enterprise)=>{
					console.log(enterprise)

					let date = enterprise.createdAt

					let dateArry = date.split("-")

					let day = dateArry[2].substr(0, 1)

					let pos = parseInt(dateArry[1])

					let month = this.state.months[pos];

					let year = dateArry[0]

					let key_id = uid()

					let enterprise_url = "panel-detalle-empresas/" + enterprise._id

					enterpriseRow.push(<li className="trackingListRow" key={key_id}>
									<div className="trackingListGrid">
										
										<p className="fieldValue">{enterprise.optionNames[0]}</p>
									</div>
									<div className="trackingListGrid">
										
										<p className="fieldValue">{enterprise.accountManager[0].name}</p>
									</div>
									<div className="trackingListGrid">

										<p className="fieldValue"> -- </p>
									</div>
									<div className="trackingListGrid">
										
										<p className="fieldValue">S/. {enterprise.price}.00</p>
									</div>
									<div className="trackingListGrid">
		
										<p className="fieldValue">{day} de {month} del {year}</p>
									</div>
									<div className="trackingListGrid">
										<select ref="s_serviceState" defaultValue={enterprise.serviceState} data-userid={enterprise._id}>
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
										</select>	
									</div>
									<div className="trackingListGrid">
										<p className="field"></p>
										<div className="btnSaveData" onClick={this.handleServiceState.bind()}>Guardar</div>
									</div>
									<div className="trackingListGrid">
										<p className="field"></p>
										<Link to={enterprise_url} className="btnSeeMore">ver más</Link>
									</div>
								</li>)
				});

			}

			panel = <div className="sectionTrackingPanel">
						<div className="wrapperTrackingPanel">
							<h1 className="landingTitles">Lista de Empresas</h1>
							<div className="underlineBlue"></div>

							<ul className="wrapperList">
								<li className="fieldsList">
									<div className="trackingListGrid">
										<p className="field">Nombre</p>
									</div>
									<div className="trackingListGrid">
										<p className="field">Usuario</p>
									</div>
									<div className="trackingListGrid">
										<p className="field">Telf de Contacto</p>
									</div>
									<div className="trackingListGrid">
										<p className="field">Precio</p>
									</div>
									<div className="trackingListGrid">
										<p className="field">Fecha de Registro</p>
									</div>
									<div className="trackingListGrid">
										<p className="field">Estado</p>	
									</div>
									<div className="trackingListGrid">
										<p className="field"></p>	
									</div>
									<div className="trackingListGrid">
										<p className="field"></p>	
									</div>
								</li>
								{
									enterpriseRow
								}
							</ul>
						</div>
					</div>
		}


		return <div>
			{
				panel
			}
		</div>
				

	}
}