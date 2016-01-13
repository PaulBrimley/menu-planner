angular.module('menuApp').directive('recipe', function(itemService) {

	return {
		templateUrl: '/js/html/recipeDirectiveTmpl.html',
		restrict: 'E',
		scope:{},
		link: function(scope, elem, attrs) {
			scope.overlaySwitcher = false;

			itemService.getSingleRecipe(attrs.id).then(function(response) {
				scope.recipe = response;
				scope.instructions = response.instructions.split('.')
			});

			scope.opener = function() {
				scope.overlaySwitcher = !scope.overlaySwitcher;
			}

			scope.closer = function() {
				scope.overlaySwitcher = !scope.overlaySwitcher;
			}
			
		},
		controller: function($scope) {
			/*$scope.overlaySwitcher = false;

			$scope.opener = function() {

			}

			$scope.closer = function () {
				$scope.overlaySwitcher = !$scope.overlaySwitcher;
				console.log($scope.overlaySwitcher);
			};*/

		}
	}


})