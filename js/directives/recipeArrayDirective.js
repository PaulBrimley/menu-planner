angular.module('menuApp').directive('recipeArrayDirective', function() {
	
	return {
		templateUrl: '/js/html/recipeArrayDirectiveTmpl.html',
		restrict: 'E',
		scope: {
			user: '='

		},
	
		controller: function($scope, itemService, $state) {
			$scope.retrieveRecipeArray = function() {
				itemService.getMenuItems().then(function(response) {
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

			var drag = function(event, index) {
				event.dataTransfer.setData('text', event.target.id);
			}

			var drop = function() {
				console.log('hello');
			}

			$scope.allowDrop = function() {
				console.log('there');
			}

			$scope.retrieveRecipeArray();
			
		}	
	}

})