angular.module('menuApp').controller('menuCtrl', function ($scope, menuService, $firebaseObject, $firebaseArray, fb) {

	var userAuth = localStorage.getItem('user');
	var userRef = JSON.parse(userAuth);
	
	$scope.handleDrop = function(item, bin) {
		
		if (bin === 'trash') {
			var itemLocation = item.split(',');
			menuService.removeRecipeFromMenu(itemLocation);
		} else {
			var itemLocation = bin.split(',');
			menuService.addRecipeToMenu(item, itemLocation);
		}		
	}

	$scope.retrieveMenuArray = function(userId) {
		menuService.getMenuItems(userId).then(function(response) {
			$scope.menuArray = response;
		})
	}

	$scope.retrieveMenuArray(userRef);

});