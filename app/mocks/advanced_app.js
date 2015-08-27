var app = angular.module('plunker', ['ngMockE2E']);

app.run(['$httpBackend', 'FoodService', function ($httpBackend, FoodService) {
  $httpBackend.whenGET('/api/1.0/food')
  .respond(FoodService.getInitialData());
  
  for(var i=1; i<4; i+=1){
    $httpBackend.whenGET('/api/1.0/food/' + i)
    .respond(FoodService.getLocalDescription(i));
  }
}]);

app.factory('FoodService', function ($http, $q) {
  var food = [
    { 
      id: 1, 
      name: 'apple',
      description: 'it is red and shiny and is grown locally'
    },
    { 
      id: 2, 
      name: 'banana',
      description: 'desc 2'
    },
    { 
      id: 3, 
      name: 'avocado',
      description: 'desc 3'
    }
  ];
  
  return {
    getFood: getFood,
    getDescription: getDescription,
    getInitialData: getInitialData,
    getLocalDescription: getLocalDescription
  }
  
  function getInitialData () {
    return  food;
  }
  
  function getFood () {
    var deferred = $q.defer();
    $http.get('/api/1.0/food').then(function (response) {
      debugger;
      deferred.resolve(response.data);
    });
    return deferred.promise;
  }
  
  function getDescription (id) {
    var deferred = $q.defer();
    $http.get('/api/1.0/food/' + id).then(function (response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  }
  
  function getLocalDescription(id){
    return food[id-1];
  }
});

app.controller('MainCtrl', function($scope, FoodService) {
  $scope.name = 'World';
  FoodService.getFood().then(function(data){
    debugger;
    $scope.food = data;
  })
  
  $scope.openDescription = function (id) {
    FoodService.getDescription(id).then(function (data) {
      $scope.description = data.description;
    });
  };
});
