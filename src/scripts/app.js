import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import ListingsView from "./views/listingsView"
import FavoritesView from "./views/favoritesView"
import DetailView from "./views/detailView"


const app = function() {
	const Router = Backbone.Router.extend({
		routes: {
			"home": "handleHome",
			"search/:query": "handleSearch",
			"details/:listingId": "handleDetails",
			"favorites": "handleFavorites",
			"*default": "redirect"
		},
		handleHome: function() {
			ReactDOM.render(<ListingsView />, document.querySelector(".container"))
		},
		handleSearch: function(query) {
			ReactDOM.render(<ListingsView query={query} />, document.querySelector(".container"))
		},
		handleDetails: function(listingId) {
			ReactDOM.render(<DetailView listingId={listingId} />, document.querySelector(".container"))
		},
		handleFavorites: function() {
			ReactDOM.render(<FavoritesView />, document.querySelector(".container"))
		},
		redirect: function() {
			location.hash = "home"
		},
		initialize: function() {
			Backbone.history.start()
		}
	})
	new Router()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..