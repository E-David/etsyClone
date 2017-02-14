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
		ACTIONS.fetchFavorites()
		ACTIONS.fetchListings()
	},
	componentWillUnmount: function() {
		STORE.off("storeChanged")
	},
	getInitialState: function() {
		return STORE._getData()
	},
	render: function() {
		var loginPopupClass = this.state.showLogin ? "slow-appear" : "fast-disappear"
		var bgClass = this.state.showLogin ? "bg-appear" : "bg-disappear"
		return (
			<div className="listings-view">
				<Header showLogin={this.state.showLogin} isLoggedIn={this.state.isLoggedIn}/>
				<ListingsContainer collection={this.state.etsyCollection} 
								   loading={this.state.isLoading} 
								   isLoggedIn={this.state.isLoggedIn}
				/>
				<LoginPopup passedClass={loginPopupClass} loginView={this.state.loginPopupView} />
				<div className={`darken-bg ${bgClass}`} onClick={this._bgClick}></div>
			</div>
		)
	}
})

export default ListingsView