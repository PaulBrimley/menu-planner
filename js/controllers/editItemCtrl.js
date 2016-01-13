angular.module('menuApp').controller('editItemCtrl', function ($scope, $firebaseArray, userService, $rootScope, fb, itemService, $stateParams) {

	$scope.userRef = new Firebase(fb);
	$scope.authData = $scope.userRef.getAuth();

	$scope.message = '';

	$scope.addItem = function(name, qty, authData) {
		$scope.recipe.components.push({item: name, qty: qty});
		$scope.newItemName = '';
		$scope.newItemQty = '';
		document.forms[1].elements[0].focus();
	}

	$scope.removeItem = function(item) {
		var itemIndex = $scope.recipe.components.indexOf(item);
		$scope.recipe.components.splice(itemIndex, 1);
	}	

	$scope.loadItem = function(recipeItem, index) {

		$scope.currentItemIndex = index;
		$scope.oldItemName = recipeItem.item;
		$scope.oldItemQty = recipeItem.qty;
	}

	$scope.editItem = function(newItemName, newItemQty, index) {
		$scope.recipe.components[index].item = newItemName;
		$scope.recipe.components[index].qty = newItemQty;
		$scope.oldItemName = '';
		$scope.oldItemQty = '';
	}

	$scope.loadRecipe = function() {
		var id = $stateParams.recipeId;
		$scope.recipe = itemService.loadRecipe(id);
	}
	$scope.loadRecipe();

	$scope.updateRecipe = function(newRecipeObj) {
		if (newRecipeObj.name === undefined) {
			alert('Recipe name must be defined.');
			return;
		} else if (newRecipeObj.components === undefined || newRecipeObj.components.length === 0) {
			alert('Recipe ingredient(s) cannot be blank. Please add items.');
			return;
		} else if (newRecipeObj.instructions === undefined) {
			alert('Recipe instructions cannot be blank.');
			return;
		}
		itemService.editRecipe(newRecipeObj);
		document.forms[0].elements[0].focus();
		$("#myMessage").text('Recipe successfully updated');
		setTimeout(function() {
			$("#myMessage").text('');
		}, 5000);
	}

	$(document).ready(function() {
		document.forms[0].elements[0].focus();
	})
});