import React from "react"
import STORE from "../store"
import ACTIONS from "../actions"
import User from "../models/userModel"

const Header = React.createClass({
	_handleSubmit: function(event) {
		var query = event.target.value

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
						<input className="search-bar" placeholder="Search for items or shops" />
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
		STORE.set("showLogin",true)
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
						<a href="#favorites">My favorites</a>
					</div> 
					<h3 onClick={this._handleSignOut}>Sign Out</h3>
				</div>
			)
		} else {
			return (
				<div className="user-wrapper">
					<h3 onClick={this._handleClick}>Register</h3>
					<button onClick={this._handleSignIn}>Sign In</button>
				</div>
			)
		}
	}
})

export default Header