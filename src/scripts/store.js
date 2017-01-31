import Backbone from "backbone"
import _ from "underscore"
import {EtsyCollection,FavCollection,EtsyModel} from "./models/dataModels"
import UTILS from "./utils"

const STORE = _.extend(Backbone.Events, {
	_data: {
		etsyCollection: new EtsyCollection(),
		etsyModel: new EtsyModel(),
		favCollection: new FavCollection(),
		isLoggedIn: UTILS.checkLoggedIn(),
		loginPopupView: "Sign In", // Sign In | Register
		showLogin: false,
		isLoading: false
	},
	_emitChange: function() {
		this.trigger("storeChanged")
	},
	_get: function(prop) {
		return this._data[prop]
	},
	_getData: function() {
		return this._data
	},
	_set: function(input,value) {
		//allows programmer to change STORE using object or
		//key-value pair, then signals to update View of app
		if (typeof input == "object") {
			var objectInput = input
			this._data = _.extend(this._data,objectInput)
		} else {
			var key = input
			this._data[key] = value
		}
		console.log("IN STORE",input)
		this._emitChange()
	}
})

export default STORE