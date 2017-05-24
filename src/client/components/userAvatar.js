/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom'

export default class UserAvatar extends Component{


	shouldComponentUpdate(){
		return false
	}


	render(){


		return <figure className="userPhoto" onClick={this.props.switchBtnNavSelected.bind(this, 5)}>
					<Link to="/perfil">
						<img src={this.props.user.photo}/>
					</Link>
				</figure>



	}
}