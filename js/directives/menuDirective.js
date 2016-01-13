angular.module('menuApp').directive('menuDirective', function() {

	return {
		templateUrl: '/js/html/menuDirectiveTmpl.html',
		restrict: 'E',
		link: function(scope, elem, attrs) {
			
		},
		controller: 'menuCtrl'
	}
})