angular.module('menuApp').directive('recipeArrayDirective', function() {
	
	return {
		templateUrl: '/js/html/recipeArrayDirectiveTmpl.html',
		restrict: 'E',
		scope: {
			user: '='

		},
	
		controller: function($scope, itemService, $state) {
			var userAuth = localStorage.getItem('user');
			var userRef = JSON.parse(userAuth);

			$scope.retrieveRecipeArray = function(userId) {
				itemService.getMenuItems(userId).then(function(response) {
					$scope.recipeArray = response;
				});
			}

			$scope.removeRecipe = function(recipe) {
				var yesNo = confirm('Are you sure you want to delete this recipe?');
				if (yesNo === true) {
					itemService.removeRecipe(recipe).then(function(response) {
					})
				} else {
					return;
				}
			}

			$scope.loadRecipe = function(recipe) {
				$state.go('editItem',{recipeId: recipe.$id});
			}

			$scope.retrieveRecipeArray(userRef);
			
		}	
	}

})