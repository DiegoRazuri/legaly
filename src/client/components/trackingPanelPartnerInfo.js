/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';

import uid from 'uid';

export default class TrackingPanelPartnerInfo extends Component{

	
	render(){
		
		let coupleDocumentType, coupleDocumentNumber, rowCoupleData, rowGoodsSeparationData, rowRegistryNumber, rowRegitryOffice;
		if(this.props.user.coupleDocumentType != undefined){
			coupleDocumentType = this.props.user.coupleDocumentType;
			coupleDocumentNumber = this.props.user.coupleDocumentNumber;

			rowCoupleData = <div className="rowPartnerInfo">
						<p className="fieldName">{coupleDocumentType} de conyugue</p>
						<p className="fieldValue">{coupleDocumentNumber}</p>
					</div>

			rowGoodsSeparationData = <div className="rowPartnerInfo">
						<p className="fieldName">Cuenta con separación de bienes</p>
						<p className="fieldValue">{this.props.user.goodsSeparation == "1" ? "si":"no"}</p>
					</div>

			rowRegistryNumber = <div className="rowPartnerInfo">
						<p className="fieldName">Partida registral</p>
						<p className="fieldValue">{this.props.user.registryNumber}</p>
					</div>

			rowRegitryOffice = <div className="rowPartnerInfo">
						<p className="fieldName">Oficina registral</p>
						<p className="fieldValue">{this.props.user.regitryOffice}</p>
					</div>
		}

		let rowGoodsInput =[];

		if(this.props.goodsInput != undefined){

			for(let i =0; i< this.props.goodsInput.length; i++){

				let key_id = uid();
				
				rowGoodsInput.push(<div className="rowPartnerInfo" key={key_id}>
										<p className="fieldName">Inversión en Bienes</p>
										<ul>
											<li>
												<div>
													<p className="subFieldName">descripción</p>
													<p className="fieldValue">{this.props.goodsInput[i].goodName}</p>
												</div>
												<div>
													<p className="subFieldName">valor</p>
													<p className="fieldValue">S/. {this.props.goodsInput[i].goodValue}.00</p>
												</div>
											</li>
										</ul>
									</div>)
			
			}
		}



		return <div className="partnerInfoGrid">
					<div className="rowPartnerInfo">
						<p className="fieldName">Nombre</p>
						<p className="fieldValue">{this.props.user.name}</p>
					</div>
					<div className="rowPartnerInfo">
						<p className="fieldName">Cargo</p>
						<p className="fieldValue">{this.props.position}</p>
					</div>
					<div className="rowPartnerInfo">
						<p className="fieldName">Inversión en dinero</p>
						<p className="fieldValue">S/ {this.props.moneyInput}.00</p>
					</div>
					
					{rowGoodsInput}

					<div className="rowPartnerInfo">
						<p className="fieldName">email</p>
						<p className="fieldValue">{this.props.user.email}</p>
					</div>
					<div className="rowPartnerInfo">
						<p className="fieldName">{this.props.user.documentType}</p>
						<p className="fieldValue">{this.props.user.documentNumber}</p>
					</div>
					<div className="rowPartnerInfo">
						<p className="fieldName">dirección</p>
						<p className="fieldValue">{this.props.user.location}</p>
					</div>
					<div className="rowPartnerInfo">
						<p className="fieldName">Estado civil</p>
						<p className="fieldValue">{this.props.user.civilStatus}</p>
					</div>
					
					{rowCoupleData}
					{rowGoodsSeparationData}
					{rowRegistryNumber}
					{rowRegitryOffice}

					<div className="rowPartnerInfo">
						<p className="fieldName">celular/telefono</p>
						<p className="fieldValue">{this.props.user.phoneNumber}</p>
					</div>
					
				</div>
				

	}
}