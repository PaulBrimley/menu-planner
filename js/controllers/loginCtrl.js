angular.module('menuApp').controller('loginCtrl', function ($scope, $firebaseArray, $firebaseObject, userService, $rootScope, $state) {

	var userAuth = localStorage.getItem('user');
	var userRef = JSON.parse(userAuth);
	if (userRef === null) {
		$scope.hider = true; //set to true when ready for auth;	
	}

	var header = $('.background');

	var backgrounds = new Array(
	    'url(images/artichoke_background.jpg)',
	    'url(images/fishy_background.jpg)',
		'url(images/kabob_background.jpg)',
		'url(images/mandaring_background.jpg)',
		'url(images/waffles_background.jpg)',
		'url(images/chinese_background.jpg)',
		'url(images/ribs_background.jpg)'
	);

	var current = 0;

	function nextBackground() {
	    current++;
	    current = current % backgrounds.length;

	    header.css('background-image', backgrounds[current]);

	}
	setInterval(nextBackground, 10000);

	header.css('background-image', backgrounds[0]);

	/*console.log($state['current'])
	
	if($state.current !== 'menuPage') {
		$scope.homeHider = false;
	} else {
		$scope.homeHider = true;
	}*/

	$scope.login = function(user) {
		if (user === undefined) {
			return;
		}
		userService.login(user).then(function(userObj){
			if (userObj === undefined) {
				$state.go('homeLogin');
			} else {
				$scope.user = userObj;
				$scope.hider = false;
			}
			
		});
	}

	$scope.logout = function() {
		userService.logout();
		$scope.hider = true;
	}

	$scope.register = function(newUser) {
		if (newUser === undefined) {
			return;
		}
		userService.register(newUser).then(function(userObj) {
			if (userObj === undefined) {
				$state.go('signup');
			} else {
				$scope.user = userObj;
				$scope.hider = false;
			}
		});
	}

	$scope.user = userService.getUser();

});