angular.module('menuApp').service('itemService', function ($firebaseArray, $firebaseObject, fb, $firebaseAuth) {
	
	var self = this;
	var auth = $firebaseAuth(new Firebase(fb));
	var userAuth = localStorage.getItem('user');
	var userRef = JSON.parse(userAuth);

	/*if (userRef === null) {
		$state.go('homeLogin');
	} else {
		var authId = auth.$getAuth().auth.uid;
	}*/
	
	var newRecipeArr = $firebaseArray(new Firebase(fb + 'users/' + userRef + '/recipes'));

	
	this.getMenuItems = function(userId) {
		var newRecipeArr = $firebaseArray(new Firebase(fb + 'users/' + userId + '/recipes'));
		return newRecipeArr.$loaded().then(function(response) {
			return response;
		});
	}

	this.getSingleRecipe = function(recipeId) {
		var singleRecipe = $firebaseObject(new Firebase(fb + 'users/' + userRef + '/recipes/' + recipeId));
		return singleRecipe.$loaded().then(function(response) {
			/*console.log(response.name);*/
			return response;
		})
	}

	this.submitRecipe = function(newRecipe) {
		newRecipeArr.$add(newRecipe).then(function(response) {
			return response;
		});
	}

	this.removeRecipe = function(recipe) {
		return newRecipeArr.$remove(recipe).then(function(response) {
			self.getMenuItems();
			return response;
		});
	}

	this.editRecipe = function(recipe) {
		var newRecipeObj = $firebaseObject(new Firebase(fb + 'users/' + userRef + '/recipes/' + recipe.$id));
		newRecipeObj.name = recipe.name;
		newRecipeObj.instructions = recipe.instructions;
		newRecipeObj.components = recipe.components;
		newRecipeObj.$save();
		console.log(newRecipeObj);
		return newRecipeObj;
	}

	this.loadRecipe = function(id) {
		var newRecipeObj = $firebaseObject(new Firebase(fb + 'users/' + userRef + '/recipes/' + id));
		return newRecipeObj;
	}
});