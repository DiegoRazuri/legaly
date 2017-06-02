/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';

import uid from 'uid';
import TrackingPanelPartnerInfo from './trackingPanelPartnerInfo';

export default class TrackingEnterpriseInfo extends Component{

	constructor (props){
		super(props);
		this.state={
			
			enterprise : {},
			months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"]
			

		}

		//this.getEnterprises = this.getEnterprises.bind(this);
		
	}

	componentDidMount(){
		
	}


	componentWillMount(){

		console.log(this.props.match.params.enterprise_id)

		let json = {
			enterprise_id: this.props.match.params.enterprise_id
		}

		
		

		$.post('/api/enterprise_detail', json, (res)=>{
			console.log("componentWillMount")
			console.log(res)
			
			if(res){
				
				this.setState({enterprise: res});

			}
		});
	}

	
	render(){
		console.log("TrackingEnterpriseInfo")
		console.log(this.state.enterprise)

		let isItGoods, isItMoney;
		let signDate, signDateArry, signDay, signPos, signMonth, signYear;
		let createdDay, createdPos, createdMonth, createdYear, createdDate, createdDateArry;
		let partnerRowTrakingPanelDetailInfo = [];
		let optionNames = [];
		let dataReader;
		let companyName, industry, societyType, totalCapital, accountManager, signAppointmentTime, signAppointmentLocation, price, inProcess, serviceState;

		console.log(this.state.enterprise.inProcess)
		if(this.state.enterprise.inProcess != undefined){
			console.log("dentro del if")
			if(this.state.enterprise.isItMoneyCapital != false){
				isItMoney = <li><p className="fieldValue">Dinero</p></li>
			}

			if(this.state.enterprise.isItGoodsCapital != false){
				isItGoods = <li><p className="fieldValue">Bienes</p></li>
			}

			
			//fechas de firma

			signDate = this.state.enterprise.signAppointmentDate

			signDateArry = signDate.split("-")

			signDay = signDateArry[2].substr(0, 1)

			signPos = parseInt(signDateArry[1])

			signMonth = this.state.months[signPos];

			signYear = signDateArry[0]

			//fechas de creaciones

			createdDate = this.state.enterprise.createdAt

			createdDateArry = createdDate.split("-")

			createdDay = createdDateArry[2].substr(0, 1)

			createdPos = parseInt(createdDateArry[1])

			createdMonth = this.state.months[createdPos];

			createdYear = createdDateArry[0];

	
			this.state.enterprise.optionNames.map((name)=>{

				let key_id = uid()

				optionNames.push(<li key={key_id} className="fieldValue">{name}</li>)

			});

			let goodsInput, moneyInput, position;

			for(let i = 0; i< this.state.enterprise.partners.length; i++){

				console.log("dentro del for")


				let partner = this.state.enterprise.partners[i];

				console.log(partner.user.name);

				let key_id = uid()
				

				if(partner.goodsInput){
					goodsInput = partner.goodsInput;
				}
				if(partner.moneyInput){
					moneyInput = partner.moneyInput;
				}
				if(partner.position){
					position = partner.position;
				}


				partnerRowTrakingPanelDetailInfo.push(
					<TrackingPanelPartnerInfo
					key= {key_id}
					goodsInput = {goodsInput}
					moneyInput = {moneyInput}
					position = {position}
					user={partner.user}
					/>
				);
			}

			

			dataReader = this.state.enterprise;

			companyName = dataReader.optionNames[0] + " " + dataReader.societyType
			industry = dataReader.industry;
			societyType = dataReader.societyType;
			totalCapital = dataReader.totalCapital;
			accountManager = dataReader.accountManager[0].name;
			signAppointmentTime = dataReader.signAppointmentTime;
			signAppointmentLocation = dataReader.signAppointmentLocation;
			price = dataReader.price;
			inProcess = dataReader.inProcess;
			serviceState = dataReader.serviceState;

		}
		

		return <div className="sectionTrackingEnterprise">
					<div className="wrapperTrackingEnteprise">
						<h1 className="landingTitles">Detalle Empresa</h1>
						<div className="underlineBlue"></div>

						<div className="wrapperEnterpriseInfo">
							<div className="rowEnterpriseInfo">
								<p className="fieldName">Nombre</p>
								<p className="fieldValue">{companyName}</p>
							</div>
							<div className="rowEnterpriseInfo">
								<p className="fieldName">Opciones de Nombre</p>
								<ul className="rowList">

									{optionNames}

								</ul>
							</div>
							<div className="rowEnterpriseInfo">
								<p className="fieldName">Rubro</p>
								<p className="fieldValue">{industry}</p>
							</div>
							<div className="rowEnterpriseInfo">
								<p className="fieldName">Tipo de sociedad</p>
								<p className="fieldValue">{societyType}</p>
							</div>
							<div className="rowEnterpriseInfo">
								<p className="fieldName">Composición de capital social</p>
								<ul>
									
										{isItMoney}
									
									
										{isItGoods}
									
								</ul>
								
								
							</div>
							<div className="rowEnterpriseInfo">
								<p className="fieldName">Total de capital social</p>
								<p className="fieldValue">{totalCapital}</p>
							</div>
							<div className="rowEnterpriseInfo">
								<p className="fieldName">Usuario admin</p>
								<p className="fieldValue">{accountManager}</p>
							</div>
							<div className="rowEnterpriseInfo">
								<p className="fieldName">Fecha y hora de firma</p>
								<p className="fieldValue">{signDay} de {signMonth} del {signYear} a las {signAppointmentTime}</p>
							</div>
							<div className="rowEnterpriseInfo">
								<p className="fieldName">Lugar de firma</p>
								<p className="fieldValue">{signAppointmentLocation}</p>
							</div>
							<div className="rowEnterpriseInfo">
								<p className="fieldName">Precio</p>
								<p className="fieldValue">S/. {price}.00</p>
							</div>
							<div className="rowEnterpriseInfo">
								<p className="fieldName">Estado de proceso</p>
								<p className="fieldValue">{inProcess}</p>
							</div>
							<div className="rowEnterpriseInfo">
								<p className="fieldName">Estado de servicio</p>
								<p className="fieldValue">{serviceState}</p>
							</div>
							<div className="rowEnterpriseInfo">
								<p className="fieldName">Fecha de registro</p>
								<p className="fieldValue">{createdDay} de {createdMonth} del {createdYear}</p>
							</div>

							<div className="wrapperPartnerInfoList">
								<h2 className="bigTitlesSS">Socios</h2>
								<div className="underlineBlue"></div>
								



								{
									partnerRowTrakingPanelDetailInfo
								}


							</div>
							
							
							

						</div>
					</div>
				</div>


	}
}