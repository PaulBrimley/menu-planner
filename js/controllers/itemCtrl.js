angular.module('menuApp').controller('itemCtrl', function ($scope, $firebaseArray, userService, $rootScope, fb, itemService, $stateParams) {

	$scope.userRef = new Firebase(fb);
	$scope.authData = $scope.userRef.getAuth();

	$scope.newRecipe = {};
	$scope.newRecipe.components = [];
	$scope.message = '';

	$scope.createNewRecipe = function(newRecipe) {
		$scope.newRecipe.name = newRecipe;
		$scope.newRecipeName = '';
		$scope.message = 'Recipe Created';
		document.forms[1].elements[0].focus();
		setTimeout(function() {
			$("#myMessage").text('');
		}, 5000);
	}

	$scope.addItem = function(name, qty, authData) {
		$scope.newRecipe.components.push({item: name, qty: qty});
		$scope.newItemName = '';
		$scope.newItemQty = '';
		document.forms[1].elements[0].focus();
	}

	$scope.removeItem = function(item) {
		var itemIndex = $scope.newRecipe.components.indexOf(item);
		$scope.newRecipe.components.splice(itemIndex, 1);
	}	

	$scope.loadItem = function(recipeItem, index) {
		$scope.currentItemIndex = index;
		$scope.oldItemName = recipeItem.item;
		$scope.oldItemQty = recipeItem.qty;
	}

	$scope.editItem = function(newItemName, newItemQty, index) {
		$scope.newRecipe.components[index].item = newItemName;
		$scope.newRecipe.components[index].qty = newItemQty;
		$scope.oldItemName = '';
		$scope.oldItemQty = '';
	}

	$scope.loadRecipe = function() {
		var id = $stateParams.recipeId;
		$scope.recipe = itemService.loadRecipe(id);
	}
	$scope.loadRecipe();

	$scope.editRecipe = function() {
		itemService.editRecipe($stateParams.recipeId);
		
	}

	$scope.submitRecipe = function(newRecipeObj) {
		if (newRecipeObj.name === undefined) {
			alert('Recipe name must be defined');
			return;
		} else if (newRecipeObj.components === undefined || newRecipeObj.components.length === 0) {
			alert('Recipe ingredient(s) cannot be blank. Please add items.');
			return;
		} else if (newRecipeObj.instructions === undefined) {
			alert('Recipe instructions cannot be blank');
			return;
		}
		itemService.submitRecipe(newRecipeObj, $scope.authData.uid);
		$scope.newRecipe.instructions = '';
		for (var i = $scope.newRecipe.components.length - 1; i >= 0; i--) {
			$scope.newRecipe.components.splice(i, 1);
		}

		document.forms[0].elements[0].focus();
		$("#myMessage").text('Recipe successfully added');
		setTimeout(function() {
			$("#myMessage").text('');
			
		}, 5000);
	}

	$(document).ready(function() {
		document.forms[0].elements[0].focus();
	})
});