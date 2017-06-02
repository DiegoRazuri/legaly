/*
*	module dependencies
*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';

import uid from 'uid'


export default class TheCreatorPanel extends Component{

	constructor (props){
		super(props);
		this.state={

			user_identified : 1,
			usersAdmin : []
			

		}

		this.createSuperUser = this.createSuperUser.bind(this);
		this.listAllUserAdmin = this.listAllUserAdmin.bind(this);
		this.addUserAdmin = this.addUserAdmin.bind(this);
		this.deleteUserAdmin = this.deleteUserAdmin.bind(this);
		
	}

	listAllUserAdmin(){
		$.get('/api/all_users_admin', (res)=>{
			
			console.log("usuarios listados")
		
			this.setState({usersAdmin : res})

		});
	}

	createSuperUser(){
		$.post('/api/create_super_user', (res)=>{
			if(res.state == 1){
				
				
				console.log("super usuario registrado")
			}
		});
	}

	addUserAdmin(){

		let user_id = ReactDom.findDOMNode(this.refs.i_id).value.trim()

		let json = {
			user_id: user_id
		}

		$.post('/api/add_user_admin', json, (res)=>{
			if(res.state == 1){
				
				
				console.log(" usuario registrado");

				ReactDom.findDOMNode(this.refs.i_id).value = '';
			}
		});


		

	}

	deleteUserAdmin(user_id){

		let json = {
			user_id : user_id
		}

		$.post('/api/delete_userAdmin', json, (res)=>{


			this.setState({usersAdmin : res.users})

		
		});

	}

	componentWillMount(){
		
/*
		$.get('/api/is_it_the_creator', (res)=>{
			
			if(res.state == 1){
				
				this.setState({user_identified: res.state});

				this.listAllUserAdmin();
				
			}
		});
*/
	}


	render(){

		let panel;

		if(this.state.user_identified == 1){
				
				
			console.log("super usuario identificado")

			let usersList =[];

			this.state.usersAdmin.map((user) =>{
				
				let key_id = uid();

				usersList.push(<li key= {key_id} >
					<div className="grid">
						<p>User:</p>
						<p>{user.name}</p>
						<p>ID:</p>
						<p>{user._id}</p>
					</div>
					<span onClick={this.deleteUserAdmin.bind(this, user._id)}>x</span>
				</li>);
			});



			panel = <div className="sectionTheCreatorPanel">
				<div className="wrapperTheCreatorPanel">
					<h1>The Creator</h1>
					<div className="underlineBlue"></div>
					<ul>
						<h3>Team Admin</h3>

						{
							usersList
						}
						
					</ul>
					<div className="form">
						<form>
							<input type="text" ref="i_id" name="user_id" placeholder="id de usuario"/>
							<div onClick={this.addUserAdmin.bind(this)}>Agregar</div>
						</form>
					</div>
				</div>
				<div>
					<h2>Registrar al super Usuario</h2>
					<div onClick={this.createSuperUser.bind(this)}> Registrar</div>
				</div>
			</div>


		}


		return <div>
			{panel}
		</div>


	}
}