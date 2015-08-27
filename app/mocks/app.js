var app = angular.module('plunker', ['ngMockE2E']);

app.run(['$httpBackend', function ($httpBackend) {
  $httpBackend.whenGET('/api/1.0/food')
  .respond(
    [
      { 
        id: 1, 
        name: 'apple'
      },
      { 
        id: 2, 
        name: 'banana'
      },
      { 
        id: 3, 
        name: 'avocado'
      }
    ]
  );
  
  $httpBackend.whenGET('/api/1.0/food/1')
  .respond(
      { 
        id: 1, 
        name: 'apple',
        description: 'it is red and shiny and is grown locally'
      }
  );
  
}]);

app.factory('FoodService', function ($http) {
  return {
    getFood: getFood,
    getDescription: getDescription
  }
  
  function getFood () {
    return $http.get('/api/1.0/food');
  }
  
  function getDescription (id) {
    return $http.get('/api/1.0/food/' + id);
  }
});

app.controller('MainCtrl', function($scope, FoodService) {
  $scope.name = 'World';
  FoodService.getFood().then(function (response) {
    $scope.food = response.data;
  });
  
  $scope.openDescription = function (id) {
    FoodService.getDescription(id).then(function (response) {
      $scope.description = response.data.description;
    });
  };
});
