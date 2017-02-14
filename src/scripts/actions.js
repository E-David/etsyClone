import STORE from "./store"
import {EtsyCollection,EtsyModel,FavModel,FavCollection} from "./models/dataModels"
import User from "./models/userModel"
import toastr from "toastr"
import UTILS from "./utils"

const ACTIONS = {
	addFavorite: function(model) {
		var favModel = new FavModel(model.attributes)

		favModel.set ({
			user_id: User.getCurrentUser().id
		})

		favModel.save()
				.then(
					function() {
						//need to fetchFavorites again to replace model with FavModel, fav icon is now filled in
						ACTIONS.fetchFavorites()
						STORE._emitChange()
					},
					function(err) {
						toastr.error(`failed to favorite. ${err.responseText}`)
					}
				)
	},
	deleteFavorite: function(model) {
		var favModel = this.findFavoriteToRemove(model)

		if(favModel !== undefined) {
			favModel.destroy()
			STORE._emitChange()
		} else {
			alert("Error removing favorite")
		}
	},
	findFavoriteToRemove: function(model) {
		var favColl = STORE._get("favCollection"),
			favModArray = favColl.models

		for(var i = 0; i < favModArray.length; i++) {
			if(favModArray[i].get("listing_id") === model.get("listing_id")) return favModArray[i]
		}
	},
	fetchFavorites: function() {
		var favColl = new FavCollection()

		favColl.fetch({
			data: {
				user_id: User.getCurrentUser().id
			}
		}).then(
			function(){
				STORE._set({
					favCollection: favColl
				})
			},
			function(err) {
				alert(`Unable to access favorites. See error: ${err}`)
			}
		)
	},
	fetchDetails: function(listingId) {
		var model = new EtsyModel()
		model["_listingId"] = listingId
		STORE._set("isLoading",true)
		model.fetch({
			dataType: 'jsonp',
			data: {
			   	"api_key": model._apiKey,
			    "includes": "MainImage,Shop"
		    }
		}).then(
			function(){
				STORE._set({
					etsyModel: model,
					isLoading: false
				})
			},
			function(err) {
				alert(`Unable to access favorites. See error: ${err}`)
			}
		)
	},
	fetchListings: function(query) {
		var coll = new EtsyCollection()
		STORE._set("isLoading",true)
		coll.fetch({
			dataType: 'jsonp',
			data: {
			   	"api_key": coll._apiKey,
			    "includes": "MainImage,Shop",
			    "tags": query
		    }
		}).then(function(){
			STORE._set({
				etsyCollection: coll,
				isLoading: false
			})
		})
	},
	loginUser: function(email,password) {
		User.login(email,password)
			.then(
				function(resp){
					STORE._set({
						isLoggedIn: true,
						showLogin: false
					})
					location.hash = "home"
				},
				function(err){
					toastr.error(err.responseText)
				}
			)
	},
	logoutUser: function() {
		User.logout()
			.then(
				function(){
					STORE._set("isLoggedIn", false)
					location.hash = "home"
				},
				function(err){
					toastr.error(err.responseText)
				}
			)
	},
	registerUser: function(userInputObj) {
		console.log(userInputObj)
		User.register(userInputObj)
			.then(
				function(){
					toastr.success(`${userInputObj.username} has successfully registered`)
					ACTIONS.loginUser(userInputObj.email,userInputObj.password)
				},
				function(err){
					toastr.error(`${err.responseText}`)
				}
			)
	},
	search: function(inputQuery) {
		location.hash = "search/" + inputQuery
		ACTIONS.fetchListings(inputQuery)
	},
	toggleFavorite: function(cid) {
		var coll = STORE._get("etsyCollection"),
			mod = coll.get(cid)

		mod.set({
			favorite: mod.get("favorite") ? false : true
		})
		STORE._set("etsyCollection", coll)
	},
	toggleFavModel: function(mod) {
		mod.set({
			favorite: mod.get("favorite") ? false : true
		})
		STORE._set("etsyModel", mod)
	},
	togglePopupView: function(buttonClicked) {
		STORE._set("loginPopupView",buttonClicked)
	}
}

export default ACTIONS