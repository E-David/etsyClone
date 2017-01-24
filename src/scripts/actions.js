import STORE from "./store"
import {EtsyCollection,EtsyModel,FavModel,FavCollection} from "./models/dataModels"
import User from "./models/userModel"

const ACTIONS = {
	addFavorite: function(model) {
		var favModel = new FavModel(model.attributes)

		favModel.set ({
			user_id: User.getCurrentUser()._id
		})
		//FIX ERROR HERE, UNDEFINED ID
		console.log(favModel)
		favModel.save()
				.fail((err)=> alert(`Unable to add favorite. See error: ${err}`))
	},
	deleteFavorite: function(model) {
		model.destroy()
			.fail((err)=>alert(`Failed to remove favorite see error: ${err}`))
		STORE._emitChange()
	},

	fetchFavorites: function() {
		var favColl = new FavCollection()

		favColl.fetch({
			data: {
				user_id: User.getCurrentUser()._id
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
	fetchListingDetails: function(listingId) {
		var model = new EtsyModel
		model["_listingId"] = listingId
		model.fetch({
			dataType: 'jsonp',
			data: {
			   	"api_key": model._apiKey,
			    "includes": "MainImage,Shop"
		    }
		}).then(function(){
			console.log(model)
			STORE._set({
				etsyModel: model
			})
		})
	},
	fetchListings: function(query) {
		var coll = STORE._get('etsyCollection')
		coll.fetch({
			dataType: 'jsonp',
			data: {
			   	"api_key": coll._apiKey,
			    "includes": "MainImage,Shop",
			    "tags": query
		    }
		}).then(function(){
			STORE._set({
				etsyCollection: coll
			})
		})
	},
	loginUser: function(email,password) {
		User.login(email,password)
			.then(
				function(resp){
					STORE._set("isLoggedIn", true)
					location.hash = "home"
				},
				function(err){
					alert(`An error occurred while logging in. See error: ${err}`)
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
					alert(`An error occurred while logging out. See error: ${err}`)
				}
			)
	},
	registerUser: function(userInputObj) {
		User.register(userInputObj)
			.then(
				function(){
					toastr.success(`${userInputObj.email} has successfully registered`)
				},
				function(err){
					alert(`An error occured while registering. See error: ${err}`)
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