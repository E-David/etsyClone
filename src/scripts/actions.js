import STORE from "./store"
import {EtsyCollection,EtsyModel,FavModel,FavCollection} from "./models/dataModels"
import User from "./models/userModel"
import toastr from "toastr"

const ACTIONS = {
	addFavorite: function(model) {
		var favModel = new FavModel(model.attributes)

		console.log(User.getCurrentUser().id)
		favModel.set ({
			_userId: User.getCurrentUser().id
		})
		//FIX ERROR HERE, UNDEFINED ID
		console.log("MODEL TO SAVE", favModel)
		favModel.save()
				.fail((err)=> console.log(err))
				// .fail((err)=> alert(`Unable to add favorite. See error: ${err}`))
	},
	deleteFavorite: function(model) {
		model.destroy()
			.fail((err)=>alert(`Failed to remove favorite see error: ${err}`))
		STORE._emitChange()
	},

	fetchFavorites: function() {
		var favColl = new FavCollection()

		STORE._set("isLoading",true)
		favColl.fetch({
			data: {
				_userId: User.getCurrentUser().id
			}
		}).then(
			function(){
				STORE._set({
					favCollection: favColl,
					isLoading: false
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