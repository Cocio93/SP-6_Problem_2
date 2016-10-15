var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function ($routeProvider) {
    $routeProvider
            .when("/listCars", {
                templateUrl: "views/listCars.html",
                controller: "CarController"
            }).when("/newCar", {
        templateUrl: "views/newCar.html",
        controller: "CarController"

    }).when("/editCar", {
        url: '/editCar/:id',
        templateUrl: "views/editCar.html",
        controller: "EditController"
    }).otherwise({
        redirectTo: "views/listCars.html"
    });

});
    myApp.controller('CarController', ['CarFactory', '$scope', function (CarFactory, $scope) {
        $scope.cars = CarFactory.getCars();
        
        $scope.predicate = 'year';
        $scope.reverse = false;
        
        $scope.deleteCar = function(id) {
            CarFactory.deleteCar(id);
            $scope.cars = CarFactory.getCars();
        };

    }]);

myApp.controller('EditController', ['CarFactory', '$scope', '$routeParams', '$location', function (CarFactory, $scope, $routeParams, $location) {
            $scope.id = $routeParams.id;
            $scope.newcar = CarFactory.getCarById($scope.id);
        $scope.editCar = function (car) {
            car.id = $routeParams.id;
            CarFactory.addEditCar(car);
            $location.path("/allCars");
        };
    }]);