import Backbone from "backbone"

export const EtsyCollection = Backbone.Collection.extend({
	url: "https://openapi.etsy.com/v2/listings/active.js",
	_apiKey: "nkpqut8g0cgqpmaixbpsw03c",
	parse: function(rawData){
		return rawData.results
	}
})

export const EtsyModel = Backbone.Model.extend({
	url: function() {
		return "https://openapi.etsy.com/v2/listings/" + this._listingId + ".js"
	},
	_apiKey: "nkpqut8g0cgqpmaixbpsw03c",
	_listingId: "",
	parse: function(rawData){
		return rawData.results[0]
	}
})

export const FavModel = Backbone.Model.extend({
	urlRoot: "/api/favorites",
	idAttribute: '_id'
})

export const FavCollection = Backbone.Collection.extend({
	url: "/api/favorites",
	model: FavModel
})