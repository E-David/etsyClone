import User from "./models/userModel"

const UTILS = {
	checkLoggedIn: function() {
		//email check is required until login user bug is fixed (user with no attributes appears)
		var user = User.getCurrentUser()

		return user !== null && user.attributes.email !== undefined
	}
}
export default UTILS 