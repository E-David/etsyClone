import React from "react"
import STORE from "../store"
import Header from "./header"
import ACTIONS from "../actions"
import UTILS from "../utils"
import ListingsContainer from "./listingsContainer"

const DetailView = React.createClass({
	componentWillMount: function() {
		STORE.on("storeChanged", () => {
			this.setState(STORE._getData())
		})
		ACTIONS.fetchDetails()
	},
	componentWillUnmount: function() {
		STORE.off("storeChanged")
	},
	getInitialState: function() {
		return STORE._getData()
	},
	render: function() {
		return (
			<div className="detail-view">
				<Header showLogin={this.state.showLogin} isLoggedIn={this.state.isLoggedIn}/>
				<DetailContainer model={this.state.EtsyModel} />
			</div>
		)
	}
})

var DetailContainer = React.createClass({
	render: function() {
		return (
			<div className="listing-container">
				<ListingLeftCol model={this.props.model}/>
				<ListingRightCol model={this.props.model}/>
			</div>
			)
	}
})

var ListingLeftCol = React.createClass({
	render: function() {
		return (
			<div className="listing-left-col">
				<div className="favorite-bar">
					<button onClick={this._handleFavorite}><i className="material-icons md-24">favorite</i> Favorite</button>
					<div className="favorite-bar-text">
						<h3>Like this item?</h3>
						<h4>Add it to your favorites to visit it later.</h4>
					</div>
				</div>
				<img src={listingModel.get("MainImage").url_570xN} />
				<div className="item-description">
					<h4>{this.props.model.get("description")}</h4>
				</div>
			</div>
		)
	}
})

var ListingRightCol = React.createClass({
	_checkIfHandmade: function(mod) {
		if(mod.get("who_made") === "i_did") return <li>Handmade item</li>
	},
	_checkIfMaterials: function(mod) {
		var materialsArr = mod.get("materials")
		if(materialsArr.length > 0) return ACTIONS.getMaterials(materialsArr)
	},
	_getFavorites: function(mod) {
		var numFavs = mod.get("num_favorers")
		return `${numFavs} ${UTILS.pluralizePeople(numViews)}`
	},
	_getViews: function(mod) {
		var numViews = mod.get("views")
		return `${numViews} ${UTILS.pluralizePeople(numViews)}`
	},
	render: function() {
		var model = this.props.model
		return (
			<div className="listing-right-col">
				<div className="summary-container">
					<h3>{model.get("title")}</h3>
					<h4>{"$" + model.get("price")}</h4>
					<ul className="overview">
						<li>Overview</li>
						{this._checkIfHandmade(model)}
						{this._checkIfMaterials(model)}
						<li>Viewed by: {this._getViews(model)}</li>
						<li>Favorited by: {this._getFavorites(model)}</li>
					</ul>
				</div>
			</div>
			)
	}
})

export default DetailView