import React from "react"
import toastr from "toastr"
import ACTIONS from "../actions"
import Loading from "./loading"
import UTILS from "../utils"

const ListingsContainer = React.createClass({
	_makeListings: function(mod) {
		return <Listing model={mod} key={mod.cid} isLoggedIn={this.props.isLoggedIn} />
	},
	render: function() {
		if(this.props.loading === true) {
			return (
				<Loading />
			)
		} else {
			return (
				<div className="listings-container">
					{this.props.collection.map(this._makeListings)}
				</div>
			)
		}
	}
})

const Listing = React.createClass({
	_getDetailViewUrl: function(model) {
		return `#details/${model.get("listing_id")}`
	},
	_getIfFavorite: function(model) {
		return UTILS.checkIfFavorite(model) ? "favorite" : "favorite_border"
	},
	_getListingImage: function(model) {
		if(model.get("MainImage").hasOwnProperty("url_570xN")) {
			return model.get("MainImage").url_570xN
		} else {
			return "http://xpenology.org/wp-content/themes/qaengine/img/default-thumbnail.jpg"
		}
	},
	_handleFavorite: function() {
		var mod = this.props.model

		UTILS.checkIfFavorite(mod) ? ACTIONS.deleteFavorite(mod) : ACTIONS.addFavorite(mod)
	},
	render: function() {
		var listingModel = this.props.model,
			favoriteStyle = {
				//Fix this: only one call should be necessary for all listings
				display: this.props.isLoggedIn === true ? "block" : "none"
			}

		return (
			<div className="listing-cell">
				<div className="listing">
					<div className="listing-image">
						<a href={this._getDetailViewUrl(listingModel)}>
							<img src={this._getListingImage(listingModel)} />
						</a>
						<i className="material-icons md-24" style={favoriteStyle} onClick={this._handleFavorite}>{this._getIfFavorite(listingModel)}</i>
					</div>
					<div className="details-wrapper">
						<h6 className="listing-name">
							{listingModel.get("title")}
						</h6>
						<div className="shop-details-wrapper">
							<h6 className="shop-name">
								{listingModel.get("Shop").shop_name}
							</h6>
							<h6 className="listing-price">
								{"$" + listingModel.get("price")}
							</h6>
						</div>
					</div>
				</div>
			</div>
		)
	}
})

export default ListingsContainer