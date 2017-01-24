import React from "react"
import STORE from "../store"
import Header from "./header"
import LoginPopup from "./loginPopup"
import ACTIONS from "../actions"
import ListingsContainer from "./listingsContainer"

const ListingsView = React.createClass({
	_bgClick: function() {
		STORE._set({
			showLogin: false
		})
	},
	componentWillMount: function() {
		STORE.on("storeChanged", () => {
			this.setState(STORE._getData())
		})
		ACTIONS.fetchListings()
	},
	componentWillUnmount: function() {
		STORE.off("storeChanged")
	},
	getInitialState: function() {
		return STORE._getData()
	},
	render: function() {
		var LoginPopupClass = this.state.showLogin ? "make-visible" : "make-hidden"
		var bgClass = this.state.showLogin ? "make-visible" : "make-hidden"

		return (
			<div className="listings-view">
				<Header showLogin={this.state.showLogin} isLoggedIn={this.state.isLoggedIn}/>
				<ListingsContainer collection={this.state.etsyCollection} />
				<LoginPopup className={LoginPopupClass} loginView= {this.state.loginPopupView} />
				<div className={`darken-bg ${bgClass}`} onClick={this._bgClick}></div>
			</div>
		)
	}
})

export default ListingsView