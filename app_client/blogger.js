var app = angular.module('blogger', ['ngRoute', 'ui.router']);

/** Router Provider **/
app. config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'HomeController',
			controllerAs: 'vm'
		})
	
		.when('/blogList', {
			templateUrl: 'pages/blogList.html',
			controller: 'ListController',
			controllerAs: 'vm'
		})

		.when('/blogAdd', {
			templateUrl:'pages/blogAdd.html',
			controller:'AddController',
			controllerAs:'vm'
		})

		.when('/blogEdit/:_id', {
			templateUrl:'pages/blogEdit.html',
			controller:'EditController',
			controllerAs:'vm'
		})

		.when('/blogDelete/:_id', {
			templateUrl:'pages/blogDelete.html',
			controller:'DeleteController',
			controllerAs:'vm'
		})

		.when('/register', {
			templateUrl: 'common/auth/register.view.html',
			controller: 'RegisterController',
			controllerAs: 'vm'
		})

		.when('/login', {
			templateUrl: 'common/auth/login.view.html',
			controller: 'LoginController',
			controllerAs: 'vm'
		})
		
		.otherwise({redirectTo: '/'});
});

/** State Provider **/
app.config(function($stateProvider) {
	$stateProvider
		.state('blogList', {
			url: '/blogList',
			templateUrl: 'pages/blogList.html',
			controller : 'ListController'
		});
});

/** REST API functions **/
function blogGetAll($http) {
	return $http.get('/api/blogs/');
}

function blogGetOne($http, _id) {
	return $http.get('/api/blogs/' + _id);
}

function blogCreate($http, authentication, data) {
	return $http.post('api/blogs/', data, { headers: { Authorization: 'Bearer ' + authentication.getToken() }});
}

function blogUpdateOne($http, authentication, _id, data) {
	return $http.put('/api/blogs/' + _id, data, { headers: { Authorization: 'Bearer ' + authentication.getToken() }});
}

function blogDeleteOne($http, authentication, _id) {
	return $http.delete('/api/blogs/' + _id, { headers: {Authorization: 'Bearer ' + authentication.getToken() }});
}

/** Controllers **/
app.controller('HomeController', function HomeController() {
	var vm = this;
	vm.pageHeader = {
		title: "My Blog Site"
	};
	vm.message = "Welcome to my site!";
});

app.controller('ListController',['$http','authentication', function ListController($http, authentication) {
	var vm = this;
	vm.pageHeader = {
		title : 'Blog List'
	};

	vm.isLoggedIn = function() {
		return authentication.isLoggedIn();
	};

	blogGetAll($http)
		.success(function(data) {
			vm.blogs = data;
			vm.message = "Blog data found!";
		})
		.error(function (e) {
			vm.message = "Could not get list of blogs.";
		});
}]);

app.controller('AddController', ['$http', '$routeParams', '$state','authentication', function AddController($http, $routeParams, $state, authentication) {
	var vm = this;
	vm.blog = {};
	vm.pageHeader = {
		title: 'Blog Add'
	};

	vm.submit = function() {
		var data = vm.blog;
		data.blogTitle = userForm.blogTitle.value;
		data.blogText = userForm.blogText.value;

		blogCreate($http, authentication, data)
			.success(function(data) {
				vm.message = "Blog Created!";
				$state.go('blogList');
			})
			.error(function(e) {
				vm.message = "Could not create blog.";
			});
	};
}]);

app.controller('EditController', [ '$http', '$routeParams', '$state', 'authentication', function EditController($http, $routeParams, $state, authentication) {
	var vm = this;
	vm.blog = {};
	vm._id = $routeParams._id;
	vm.pageHeader = {
		title: 'Blog Edit'
	};

	blogGetOne($http, vm._id)
		.success(function(data) {
			vm.blog = data;
			vm.message = "Blog data found!";
		})
		.error(function(e) {
			vm.message = "Could not get blog data given id of " + vm._id;
		});

	vm.submit = function() {
		var data = vm.blog;
		data.blogTitle = userForm.blogTitle.value;
		data.blogText = userForm.blogText.value;

		blogUpdateOne($http, authentication, vm._id, data)
			.success(function(data) {
				vm.message = "Blog data updated!";
				$state.go('blogList');
			})
			.error(function(e) {
				vm.message = "Could not update blog."
			});
	};
}]);

app.controller('DeleteController',['$http','$routeParams','$state', 'authentication', function DeleteController($http, $routeParams, $state, authentication) {
	var vm = this;
	vm.blog = {};
	vm._id = $routeParams._id;
	vm.pageHeader = {
		title:'Blog Delete'
	};

	blogGetOne($http, vm._id)
		.success(function(data) {
			vm.blog = data;
			vm.message = "Blog data found!";
		})
		.error(function(e) {
			vm.message = "Could not get blog data given id of " + vm._id;
		});

	vm.submit = function() {
		var data = vm.blog;
		data.blogTitle = userForm.blogTitle.value;
		data.blogText = userForm.blogText.value;

		blogDeleteOne($http, authentication, vm._id)
	                .success(function(data) {
				vm.message = "Blog data updated!";
				$state.go('blogList');
			})
			.error(function(e){
				vm.message = "Could not delete blog."
			});
	};

	vm.cancel = function() {
		$state.go('blogList');
	};
}]);
