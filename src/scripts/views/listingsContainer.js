import React from "react"
import toastr from "toastr"
import ACTIONS from "../actions"

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
	_getDetailViewUrl: function(model) {
		return `#details/ ${model.get("listingId")}`
	},
	_handleFavorite: function() {
		console.log("HI")
		ACTIONS.addFavorite(this.props.model)
	},
	render: function() {
		var listingModel = this.props.model
		return (
			<div className="listing">
				<a href={this._getDetailViewUrl(listingModel)}>
					<img src={listingModel.get("MainImage").url_170x135} />
					<h5 onClick={this._handleFavorite}>FAV</h5>
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