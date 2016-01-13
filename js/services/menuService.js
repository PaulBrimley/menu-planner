angular.module('menuApp').service('menuService', function (fb, $firebaseArray, $firebaseObject, $firebaseAuth, $state) {
	
	var self = this;
	var auth = $firebaseAuth(new Firebase(fb));
	var authId = auth.$getAuth().auth.uid;

	/*var newMenuArr = $firebaseArray(new Firebase(fb + 'users/' + authId + '/menu'));*/
	
	this.getMenuItems = function(userId) {
		var newMenuArr = $firebaseArray(new Firebase(fb + 'users/' + userId + '/menu'));
		return newMenuArr.$loaded().then(function(response) {
			return response
		})
	}

	this.removeRecipeFromMenu = function(itemLocation) {
		var userAuth = localStorage.getItem('user');
		var userRef = JSON.parse(userAuth);
		var weekNum = Number(itemLocation[0]) + 1;
		weekNum = weekNum.toString();
		var itemLocationRef = $firebaseObject(new Firebase(fb + 'users/' + userRef + '/menu/week' + weekNum + '/' + itemLocation[1]));
		itemLocationRef.$loaded().then(function(){
			itemLocationRef[itemLocation[2]] = '';
			itemLocationRef.$save();
		})
	}

	this.addRecipeToMenu = function(item, itemLocation) {
		var userAuth = localStorage.getItem('user');
		var userRef = JSON.parse(userAuth);
		var weekNum = Number(itemLocation[0]) + 1;
		weekNum = weekNum.toString();
		var itemLocationRef = $firebaseObject(new Firebase(fb + 'users/' + userRef + '/menu/week' + weekNum + '/' + itemLocation[1]));
		itemLocationRef.$loaded().then(function(){
			itemLocationRef[itemLocation[2]] = item;
			itemLocationRef.$save();
		})
	}

})