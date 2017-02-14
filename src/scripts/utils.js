import User from "./models/userModel"
import STORE from "./store"

const UTILS = {
	checkIfFavorite: function (model) {
		var favColl = STORE._get("favCollection"),
			favModArray = favColl.models

			for(var i = 0; i < favModArray.length; i++) {
				if(favModArray[i].get("listing_id") === model.get("listing_id")) return true
			}
		return false
	},
	checkLoggedIn: function() {
		//email check is required until login user bug is fixed (user with no attributes appears)
		var user = User.getCurrentUser()

		return user !== null && user.attributes.email !== undefined
	},
	cleanText: function(stringToClean) {
		return stringToClean.replace(/&quot;/gi, '\"').replace(/&#39;/gi, '\'')
	},
	pluralizePeople: function(num) {
		return num === 1 ? "person" : "people"
	}
}
export default UTILS 