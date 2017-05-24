/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom'

export default class ContactRow extends Component{


	render(){

		let displayPhoto;

		if(this.props.user.photo != undefined){

			displayPhoto = <figure>
								<img src={this.props.user.photo}/>
							</figure>
		}else{
			displayPhoto = <p className="displayPhotoName">{this.props.user.name[0]}</p>
		}

		return <div className="row">
					{displayPhoto}
					<div className="partnerInfo">
						<p className="mediumContent">{this.props.user.name}</p>
						<p className="enterpriseName mediumContent"><span className="icon-office"></span>{this.props.companyName}</p>
					</div>
				</div>



	}
}