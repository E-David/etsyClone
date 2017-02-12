import React from "react"
import STORE from "../store"
import ACTIONS from "../actions"
import User from "../models/userModel"

const Header = React.createClass({
	_handleSubmit: function(event) {
		var query = event.target.userQuery.value

		event.preventDefault()
		ACTIONS.search(query)

		//clear input field after sending data to ACTIONS
		query = ""
	},
	render: function() {
		return (
			<header>
				<div className="header-wrapper">
					<a href="#home" className="logo">Etsy</a>
					<form className="search-wrapper" onSubmit={this._handleSubmit}>
						<input className="search-bar" placeholder="Search for items" name="userQuery" required />
						<button className="search-button">Search</button>
					</form>
				</div>
				<UserWrapper showLogin={this.props.showLogin} isLoggedIn={this.props.isLoggedIn} />
			</header>
		)
	}
})

const UserWrapper = React.createClass({
	_handleSignIn: function() {
		STORE._set({
			showLogin: true,
			loginPopupView: "Sign In"
		})
	},
	_handleRegister: function() {
		STORE._set({
			showLogin: true,
			loginPopupView: "Register"
		})
	},
	_handleSignOut: function() {
		ACTIONS.logoutUser()
	},
	render: function() {
		if(this.props.isLoggedIn) {
			return (
				<div className="user-wrapper">
					<div className="user-details">
						<h3>{`Welcome ${User.getCurrentUser().get("username")}!`}</h3>
						<a href="#favorites">My favorites <i className="material-icons md-24">favorite</i></a>
					</div> 
					<h3 className="sign-out" onClick={this._handleSignOut}>Sign Out</h3>
				</div>
			)
		} else {
			return (
				<div className="user-wrapper">
					<h3 className="register" onClick={this._handleRegister}>Register</h3>
					<h3 className="sign-in" onClick={this._handleSignIn}>Sign In</h3>
				</div>
			)
		}
	}
})

export default Header