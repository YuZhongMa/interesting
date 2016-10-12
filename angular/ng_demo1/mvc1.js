var app=angular.module("moudle", []);
app.controller('helloAngular', ['$scope', function($scope){
	$scope.greeting={
		text:'hello'
	};
}])

console.log('111')