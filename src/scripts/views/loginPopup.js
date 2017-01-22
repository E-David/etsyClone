import React from "react"
import STORE from "../store"
import ACTIONS from "../actions"

const LoginPopup = React.createClass({
	_handleButton: function(eventObj) {
		var buttonClicked = eventObj.target.value

		ACTIONS.togglePopupView(buttonClicked)
	},
	render: function() {
		return (
			<div className="login-popup">
				<div className="login-header">
					<button onClick={this._handleButton} className="register-button" value="Register">Register</button>
					<button onClick={this._handleButton} className="sign-in-button" value="Sign In">Sign In</button>
				</div>
				<LoginView currentView={this.props.loginView} />
			</div>

		)
	}
})

const LoginView = React.createClass({
	render: function() {
		//display container based on STORE loginPopupView property. Changed by LoginPopup component
		var viewToDisplay = this.props.currentView 

		return (
			<div className="login-popup-view">
				{
					viewToDisplay === "Register" ? <RegisterContainer /> : <LoginContainer />
				}
			</div>
		)
	}
})

const LoginContainer = React.createClass({
	_handleSubmit: function(event) {
		event.preventDefault()
		var userEmail = event.target.email.value,
			userPassword = event.target.password.value

		ACTIONS.loginUser(userEmail,userPassword)

		//clear fields after data is passed to ACTIONS
		event.target.email.value = ""
		event.target.password.value = ""
	},
	render: function() {
		return (
			<div className="login-container">
				<h3>Login</h3>
				<form onSubmit={this._handleSubmit}>
					<input type="email" name="email" placeholder="Enter Email" required />
					<input type="password" name="password" placeholder="Enter Password" required />
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
})

const RegisterContainer = React.createClass({
	_handleSubmit: function(event) {
		event.preventDefault()

		for(var i = 0; i < event.target.length; i++) {
			console.log(event.target[i])
		}
		var userInputObj = {
			email: event.target.email.value,
			password: event.target.password.value,
			username: event.target.username.value
		}

		ACTIONS.registerUser(userInputObj)

		//clear fields after data is passed to ACTIONS
		event.target.email.value = ""
		event.target.password.value = ""
		// event.target.confirmPassword.value = ""
		event.target.username.value = ""
	},
	render: function() {
		return (
			<div className="register-container">
				<h3>Register</h3>
				<form onSubmit={this._handleSubmit}>
					<input type="email" name="email" placeholder="Enter Email" required />
					<input type="password" name="password" placeholder="Enter Password" required />
					{
						// TODO: <input type="password" name="confirmPassword" placeholder="Confirm Password" />
					}
					<input name="username" placeholder="Enter Username" required />
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
})

export default LoginPopup