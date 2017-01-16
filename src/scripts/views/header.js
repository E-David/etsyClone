import React from "react"
import STORE from "../store"
import ACTIONS from "../actions"

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
			</header>
		)
	}
})

export default Header