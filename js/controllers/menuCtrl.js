angular.module('menuApp').controller('menuCtrl', function ($scope, menuService, $firebaseObject, $firebaseArray, fb) {

	$scope.drag = function(event, index) {
		event.dataTransfer.setData('text', event.target.id);
	}
	
	$scope.handleDrop = function(item, bin) {
		
		if (bin === 'trash') {
			var itemLocation = item.split(',');
			menuService.removeRecipeFromMenu(itemLocation);
		} else {
			var itemLocation = bin.split(',');
			menuService.addRecipeToMenu(item, itemLocation);
		}		
	}

	$scope.retrieveMenuArray = function() {
		menuService.getMenuItems().then(function(response) {
			$scope.menuArray = response;
			
		})
	}

	$scope.retrieveMenuArray();

});