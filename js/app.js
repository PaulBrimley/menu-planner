var app = angular.module('menuApp', ['ui.router', 'firebase', 'dragDrop']);

app.constant('fb', 'https://menu-planner.firebaseio.com/');

app.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('homeLogin', {
			url: '/homeLogin',
			templateUrl: '/js/html/login.html'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: '/js/html/signup.html',
		})
		.state('menuPage', {
			url: '/menu',
			controller: 'menuCtrl',
			templateUrl: '/js/html/menu.html', 
			resolve: {
				userCheck: function() {
					var userAuth = localStorage.getItem('user');
					var userRef = JSON.parse(userAuth);
					if (userRef === null) {
						$state.go('homeLogin');	
					}
				}
			}
		})
		.state('addItem', {
			url: '/addItemPage',
			controller: 'itemCtrl',
			templateUrl: '/js/html/addItem.html',
			resolve: {
				userCheck: function() {
					var userAuth = localStorage.getItem('user');
					var userRef = JSON.parse(userAuth);
					if (userRef === null) {
						$state.go('homeLogin');	
					}
				}
			}
		})
		.state('editItem', {
			url: '/editItemPage/:recipeId',
			controller: 'editItemCtrl',
			templateUrl: '/js/html/editItem.html',
			resolve: {
				userCheck: function() {
					var userAuth = localStorage.getItem('user');
					var userRef = JSON.parse(userAuth);
					if (userRef === null) {
						$state.go('homeLogin');	
					}
				}
			}
		})
		.state('recipePage', {
			url: '/recipe',
			controller: 'recipeCtrl',
			templateUrl: '/js/html/recipe.html',
			resolve: {
				userCheck: function() {
					var userAuth = localStorage.getItem('user');
					var userRef = JSON.parse(userAuth);
					if (userRef === null) {
						$state.go('homeLogin');	
					}
				}
			}
		})
		.state('shoppingListPage', {
			url: '/shoppingList',
			controller: 'soppingCtrl',
			templateUrl: '/js/html/shopping.html',
			resolve: {
				userCheck: function() {
					var userAuth = localStorage.getItem('user');
					var userRef = JSON.parse(userAuth);
					if (userRef === null) {
						$state.go('homeLogin');	
					}
				}
			}

		});

	$urlRouterProvider.otherwise('homeLogin');


});