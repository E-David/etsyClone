import React from "react"
import STORE from "../store"
import Header from "./header"
import ACTIONS from "../actions"
import UTILS from "../utils"
import ListingsContainer from "./listingsContainer"
import Loading from "./loading"

const DetailView = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchDetails(this.props.listingId)
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
		return (
			<div className="detail-view">
				<Header showLogin={this.state.showLogin} isLoggedIn={this.state.isLoggedIn}/>
				<DetailContainer model={this.state.etsyModel} loading={this.state.isLoading} />
			</div>
		)
	}
})

var DetailContainer = React.createClass({
	render: function() {
		if(this.props.loading === true) {
			return (
				<Loading />
			)
		} else {
			return (
				<div className="listing-container">
					<ListingLeftCol model={this.props.model}/>
					<ListingRightCol model={this.props.model}/>
				</div>
			)
		}
	}
})

var ListingLeftCol = React.createClass({
	render: function() {
		var listingModel = this.props.model
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
					<h4>{listingModel.get("description")}</h4>
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

		if(materialsArr.length > 0) {
			if(materialsArr.length === 1){
				return <li>Material: {materialsArr[0]}</li>
			} else {
				return <li>Materials: {materialsArr.join(", ")}</li>
			}
		}
	},
	_getFavorites: function(mod) {
		var numFavs = mod.get("num_favorers")
		return `${numFavs} ${UTILS.pluralizePeople(numFavs)}`
	},
	_getViews: function(mod) {
		var numViews = mod.get("views")
		console.log(numViews)
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