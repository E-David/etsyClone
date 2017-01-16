import Backbone from "backbone"
import _ from "underscore"

const STORE = _.extend(Backbone.Events, {
	_data: {

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
		//key-value pair, then signals change to View 
		if (typeof input == "object") {
			var objectInput = input
			this._data = _.extend(this._data,objectInput)
		} else {
			var key = input
			this._data[key] = value
		}
		this._emitChange()
	}
})

export default STORE