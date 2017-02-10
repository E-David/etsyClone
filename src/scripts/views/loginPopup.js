import React from "react"
import STORE from "../store"
import ACTIONS from "../actions"

const LoginPopup = React.createClass({
	_handleButton: function(eventObj) {
		var buttonClicked = eventObj.target.value

		ACTIONS.togglePopupView(buttonClicked)
	},
	render: function() {
		var registerButtonClass = this.props.loginView === "Register" ? "active" : "inactive"
		var signInButtonClass = this.props.loginView === "Sign In" ? "active" : "inactive"
		return (
			<div className={`login-popup ${this.props.passedClass}`}>
				<div className="login-header">
					<button onClick={this._handleButton} className={registerButtonClass} value="Register">Register</button>
					<button onClick={this._handleButton} className={signInButtonClass} value="Sign In">Sign In</button>
				</div>
				<LoginView loginView={this.props.loginView} />
			</div>

		)
	}
})

const LoginView = React.createClass({
	render: function() {
		//display container based on STORE loginPopupView property. Changed by LoginPopup component
		var viewToDisplay = this.props.loginView 

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
				<form onSubmit={this._handleSubmit}>
					<input type="email" name="email" placeholder="Enter Email" required />
					<input type="password" name="password" placeholder="Enter Password" required />
					<button type="submit">Sign In</button>
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
				<form onSubmit={this._handleSubmit}>
					<input type="email" name="email" placeholder="Enter Email" required />
					<input type="password" name="password" placeholder="Enter Password" required />
					{
						// TODO: <input type="password" name="confirmPassword" placeholder="Confirm Password" />
					}
					<input name="username" placeholder="Enter Username" required />
					<button type="submit">Register</button>
				</form>
			</div>
		)
	}
})

export default LoginPopup