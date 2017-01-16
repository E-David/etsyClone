import React from "react"
import STORE from "../store"
import Header from "./header"

const ListingsView = React.createClass({
	componentWillMount: function() {
		STORE.on("storeChanged", () => {
			this.setState(STORE._getData())
		})
	},
	getInitialState: function() {
		return STORE._getData()
	},
	componentWillUnmount: function() {
		STORE.off("storeChanged")
	},
	render: function() {
		return (
			<div className="listings-view">
				<Header />
				<ListingsContainer />
				<LoginPopup />
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