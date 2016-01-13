angular.module('menuApp').directive('recipe', function(itemService) {

	return {
		template: '<span>{{recipe.name}}</span>',
		restrict: 'E',
		scope:{},
		link: function(scope, elem, attrs) {
			itemService.getSingleRecipe(attrs.id).then(function(response) {
				scope.recipe = response;
			})
		}
	}


})