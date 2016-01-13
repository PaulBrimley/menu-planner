angular.module('menuApp').service('userService', function ($firebaseArray, $firebaseObject, fb, $firebaseAuth, $state,$http) {

	var self = this;
	var auth = $firebaseAuth(new Firebase(fb));
	
	this.getUser = function() {
		var signedIn = auth.$getAuth();
		if (signedIn === null) {
			$state.go('homeLogin');
			return;
		} else {
			var userAuth = localStorage.getItem('user');
			var userRef = JSON.parse(userAuth);
			var newUserObject = $firebaseObject(new Firebase(fb + 'users/' + userRef));
			return newUserObject;
		}	
		
	}

	this.register = function(user) {
		
		return auth.$createUser({email: user.email, password: user.password}).then(function(newUserData) {
			
			var newUserObject = $firebaseObject(new Firebase(fb + 'users/' + newUserData.uid));
			newUserObject.firstName =  user.firstName;
			newUserObject.lastName = user.lastName;
			newUserObject.$save();

			var newMenuObj = $firebaseObject(new Firebase(fb + 'users/' + newUserData.uid + '/menu'));
			newMenuObj.week1 = [
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				}
			];
			newMenuObj.week2 = [
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				}
			];
			newMenuObj.week3 = [
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				}
			];
			newMenuObj.week4 = [
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				},
				{
					breakfast: '',
					lunch: '',
					snack: '',
					dinner: ''
				}
			];
			newMenuObj.$save();

			self.login(user);

			return newUserObject;
		}).catch(function(err) {
			alert(err);
		})
	}

	this.login = function(user) {
		return auth.$authWithPassword({email: user.email, password: user.password}).then(function(authData) {
			var newUserObject = $firebaseObject(new Firebase(fb + 'users/' + authData.uid));
			var userAuth = JSON.stringify(authData.auth.uid);
			localStorage.setItem('user', userAuth);
			$state.go('menuPage');
			return newUserObject
		}).catch(function(err) {
			alert(err);
		})
	}

	this.logout = function() {

		localStorage.removeItem('user');
		$state.go('homeLogin');
		return auth.$unauth();
	}

	auth.$onAuth(function(authData) {
		if (!authData) {
			$state.go('homeLogin');
		}
	});

});