import STORE from "./store"
import {EtsyCollection,EtsyModel,FavModel,FavCollection} from "./models/dataModels"

const ACTIONS = {
	addFavorite: function(model) {
		var favModel = new FavModel(model.attributes)
		favModel.save()
				.done(()=>console.log("save complete",STORE._get("favCollection")))
				.fail(()=>console.log("save failed"))
	},
	deleteFavorite: function(model) {
		model.destroy()
			.done(()=>alert(model.get('listing_id') + ' successfully deleted'))
			.fail(()=>alert(model.get('listing_id') + " failed to delete"))
		STORE._emitChange()
	},

	fetchFavorites: function() {
		var favColl = new FavCollection()
		// we need to tell this collection to fetch data
		favColl.fetch().then(
			function(){
				STORE._set({
					favCollection: favColl
				})
			},
			function(err) {
				alert('problem retrieving fave data')
				console.log(err)
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
					alert(`Logged in as ${email}`)
					location.hash = "home"
				},
				function(err){
					console.log(err)
					alert("An error occurred while logging in")
				}
			)
	},
	logoutUser: function() {
		User.logout()
			.then(
				function(){
					alert("You have successfully logged out")
					location.hash = "home"
					STORE._emitChange()
				},
				function(){
					alert("An error occurred while logging out")
				}
			)
	},
	registerUser: function(userInputObj) {
		User.register(userInputObj)
			.then(
				function(){
					alert(`${userInputObj.email} has successfully registered`)
				},
				function(err){
					console.log(err)
					alert("An error occured while registering")
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
	},
	validate: function(event) {
		var password = STORE._get("password"),
			confirmPassword = STORE._get("confirmPassword")

		if(password !== confirmPassword) {
			event.target.confirmPassword.setCustomValidity("Passwords don't match")
			return false
		} else {
			event.target.confirmPassword.setCustomValidity("")
			return true
		}
	}
}

export default ACTIONS