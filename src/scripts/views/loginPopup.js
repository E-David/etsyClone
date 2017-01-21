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
		var viewToDisplay = this.props.currentView === "Register" ? <RegisterContainer /> : <LoginContainer />

		return (
			<div className="login-popup-view">
				{viewToDisplay}
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
					<input type="email" name="email" placeholder="Enter Email or Username" />
					<input type="password" name="password" placeholder="Enter Password" />
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
})

const RegisterContainer = React.createClass({
	_handleSubmit: function(event) {
		event.preventDefault()

		var userInputObj = {
			email: event.target.email.value,
			password: event.target.password.value,
			username: event.target.username.value
		}

		if(ACTIONS.validate(event)) ACTIONS.registerUser(userInputObj)

		//clear fields after data is passed to ACTIONS
		event.target.email.value = ""
		event.target.password.value = ""
		event.target.confirmPassword.value = ""
		event.target.username.value = ""
	},
	_storePassword: function(event) {
		STORE._set(event.target.name,event.target.value)
		console.log(STORE)
	},
	render: function() {
		return (
			<div className="register-container">
				<h3>Register</h3>
				<form onSubmit={this._handleSubmit}>
					<input type="email" name="email" placeholder="Enter Email" />
					<input type="password" name="password" placeholder="Enter Password" onBlur={this._storePassword} />
					<input type="password" name="confirmPassword" placeholder="Confirm Password" onBlur={this._storePassword} />
					<input name="username" placeholder="Enter Username" />
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
})

export default LoginPopup