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

function blogCreate($http, data) {
	return $http.post('api/blogs/', data);
}

function blogUpdateOne($http, _id, data) {
	return $http.put('/api/blogs/' + _id, data);
}

function blogDeleteOne($http, _id) {
	return $http.delete('/api/blogs/' + _id);
}

/** Controllers **/
app.controller('HomeController', function HomeController() {
	var vm = this;
	vm.pageHeader = {
		title: "My Blog Site"
	};
	vm.message = "Welcome to my site!";
});

app.controller('ListController', function ListController($http) {
	var vm = this;
	vm.pageHeader = {
		title : 'Blog List'
	};

	blogGetAll($http)
		.success(function(data) {
			vm.blogs = data;
			vm.message = "Blog data found!";
		})
		.error(function (e) {
			vm.message = "Could not get list of blogs.";
		});
});

app.controller('AddController', ['$http', '$routeParams', '$state', function AddController($http, $routeParams, $state) {
	var vm = this;
	vm.blog = {};
	vm.pageHeader = {
		title: 'Blog Add'
	};

	vm.submit = function() {
		var data = vm.blog;
		data.blogTitle = userForm.blogTitle.value;
		data.blogText = userForm.blogText.value;

		blogCreate($http, data)
			.success(function(data) {
				vm.message = "Blog Created!";
				$state.go('blogList');
			})
			.error(function(e) {
				vm.message = "Could not create blog.";
			});
	}
}]);

app.controller('EditController', [ '$http', '$routeParams', '$state', function EditController($http, $routeParams, $state) {
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
		data.blogText =userForm.blogText.value;

		blogUpdateOne($http, vm._id, data)
			.success(function(data) {
				vm.message = "Blog data updated!";
				$state.go('blogList');
			})
			.error(function(e) {
				vm.message = "Could not update blog."
			});
	}
}]);

app.controller('DeleteController',['$http','$routeParams','$state',function DeleteController($http,$routeParams,$state) {
	var vm = this;
	vm.blog = {};
	vm._id = $routeParams._id;
	vm.pageHeader = {
		title:'Blog Delete'
	};

	blogGetOne($http,vm._id)
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

		blogDeleteOne($http, vm._id)
	                .success(function(data) {
				vm.message = "Blog data updated!";
				$state.go('blogList');
			})
			.error(function(e){
				vm.message = "Could not delete blog."
			});
	}

	vm.cancel = function() {
		$state.go('blogList');
	}
}]);
