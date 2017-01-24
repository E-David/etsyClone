import React from "react"
import STORE from "../store"
import Header from "./header"
import ACTIONS from "../actions"
import ListingsContainer from "./listingsContainer"

const FavoritesView = React.createClass({
	componentWillMount: function() {
		STORE.on("storeChanged", () => {
			this.setState(STORE._getData())
		})
		ACTIONS.fetchFavorites()
	},
	componentWillUnmount: function() {
		STORE.off("storeChanged")
	},
	getInitialState: function() {
		return STORE._getData()
	},
	render: function() {
		return (
			<div className="favorites-view">
				<Header showLogin={this.state.showLogin} isLoggedIn={this.state.isLoggedIn}/>
				<ListingsContainer collection={this.state.favCollection} />
			</div>
		)
	}
})

export default FavoritesView