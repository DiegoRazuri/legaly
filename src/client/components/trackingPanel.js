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
			enterprises: []
			
			

		}

		this.getEnterprises = this.getEnterprises.bind(this);
		this.handleServiceState = this.handleServiceState.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		
	}

	getEnterprises(){
		$.get('/api/all_enterprises', (res)=>{
			
			
			console.log(res)
		
			this.setState({enterprises : res})

		});
	}

	handleOnChange(ev){

		let target = ev.target;

		let enterprise_id = target.name;

		let new_enterprises_data = this.state.enterprises;

		for(let i = 0; i < new_enterprises_data.length; i++){
			if(new_enterprises_data[i]._id == enterprise_id){
				
				new_enterprises_data[i].serviceState = target.value;


				break;

			}
		}

		this.setState({enterprises : new_enterprises_data});
	}

	handleServiceState(){

		let serviceStateSelect = ReactDom.findDOMNode(this.refs.s_serviceState)
		
		let enterprise_id = serviceStateSelect.dataset.userid;

		let stateValue;

		for(let i = 0; i < this.state.enterprises.length; i++){
			if(this.state.enterprises[i]._id == enterprise_id){
				
				stateValue = this.state.enterprises[i].serviceState;


				break;

			}
		}
		
		

		let json = {
			serviceState :  stateValue,
			enterpriseId : enterprise_id
		}

		$.post('/api/update_service_state', json, (res)=>{
			
			
			this.setState({enterprises : res})

		});
		

	}

	componentWillMount(){
	
			
			$.post('/api/is_it_admin', (res)=>{
				
				if(res.state == 1){
					
					this.setState({user_identified: res.state});

					this.getEnterprises();
					console.log("cambio")
					
				}
			});
		

		

	}

	render(){
		let panel;
		let enterpriseRow = [];

		

		if(this.state.user_identified == 1){

			if(this.state.enterprises.length > 0 ){


				this.state.enterprises.map((enterprise)=>{
					

					let months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"]

					let date = enterprise.createdAt

					let dateArry = date.split("-")

					console.log(dateArry)

					let day = dateArry[2].substr(0, 2)

					let num_month = dateArry[1]

					let num_parse = parseInt(num_month)
					let pos = num_parse - 1

					

					let month = months[pos];

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

										<p className="fieldValue"> {enterprise.accountManager[0].phoneNumber ? enterprise.accountManager[0].phoneNumber : "--"} </p>
									</div>
									<div className="trackingListGrid">
										
										<p className="fieldValue">S/. {enterprise.price}.00</p>
									</div>
									<div className="trackingListGrid">
		
										<p className="fieldValue">{day} de {month} del {year}</p>
									</div>
									<div className="trackingListGrid">
										<select ref="s_serviceState" name={enterprise._id} value={enterprise.serviceState} onChange={this.handleOnChange.bind(this)} data-userid={enterprise._id}>
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