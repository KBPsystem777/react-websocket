import React, { Component } from 'react';
import { VERIFY_USER } from '../Events'

export default class LoginForm extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	username:"",
	  	error:""
	  };

	  this.handleChange = this.handleChange.bind(this)
	  this.handleSubmit = this.handleSubmit.bind(this)
	}

	setUser = ({user, isUser}) => {

		if(isUser){
			this.setError("User name taken")
		} else {
			this.setError("")
			this.props.setUser(user)
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { socket } = this.props
		const { username } = this.state
		socket.emit(VERIFY_USER, username, this.setUser)
	}

	handleChange = (e) => {
		this.setState({username:e.target.value})
	}

	setError = (error) => {
		this.setState({error})
	}
	
	render() {	
		const { username, error } = this.state
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login-form" >
					<label htmlFor="username">
						<h2>Enter Your Username</h2>
					</label>
					<input
						ref={(input) => {this.textInput = input}}
						type="text"
						id="username"
						value={username}
						placeholder={'Username'}
						onChange={this.handleChange}
						required
					/>	
					<div className="error">{error ? error:null}</div>
					<button type="submit" onClick={this.handleSubmitter}>Submit me</button>
				</form>
			</div>
		);
	}
}
