import React from "react"
import toastr from "toastr"
import ACTIONS from "../actions"
import Loading from "./loading"

const ListingsContainer = React.createClass({
	_makeListings: function(mod) {
		return <Listing model={mod} key={mod.cid} />
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
	_getListingImage: function(model) {
		if(model.get("MainImage").hasOwnProperty("url_170x135")) {
			return model.get("MainImage").url_170x135
		} else {
			return "http://xpenology.org/wp-content/themes/qaengine/img/default-thumbnail.jpg"
		}
	},
	_handleFavorite: function() {
		ACTIONS.addFavorite(this.props.model)
	},
	render: function() {
		var listingModel = this.props.model
		return (
			<div className="listing">
				<a href={this._getDetailViewUrl(listingModel)}>
					<img src={this._getListingImage(listingModel)} />
					<div className="details-wrapper">
						<h5 className="listing-name">
							{listingModel.get("title")}
						</h5>
						<div className="shop-details-wrapper">
							<h5 className="shop-name">
								{listingModel.get("Shop").shop_name}
							</h5>
							<h5 className="listing-price">
								{"$" + listingModel.get("price")}
							</h5>
						</div>
					</div>
				</a>
			</div>
		)
	}
})

export default ListingsContainer