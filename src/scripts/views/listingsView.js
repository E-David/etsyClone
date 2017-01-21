import React from "react"
import STORE from "../store"
import Header from "./header"
import LoginPopup from "./loginPopup"

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

const ListingsContainer = React.createClass({
	_makeListings: function(mod) {
		return <Listing model={mod} key={mod.cid} />
	},
	render: function() {
		return (
			<div className="listings-container">
				{this.props.collection.map(this._makeListings)}
			</div>
		)
	}
})

const Listing = React.createClass({
	_getListingImage: function(model) {
		if(model.get("MainImage").url_170x135) {
			return model.get("MainImage").url_170x135
		} else {
			return "../../imgs/defaultPic.jpg"
		}
	},
	render: function() {
		var listingModel = this.props.model
		return (
			<div className="listing">
				<img src={this._getListingImage(listingModel)} />
				<div className="details-wrapper">
					<h5 className="listing-name">
					</h5>
					<div className="shop-details-wrapper">
						<h5 className="shop-name">
						</h5>
						<h5 className="listing-price">
						</h5>
					</div>
				</div>
			</div>
		)
	}
})

export default ListingsView