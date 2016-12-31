angular.module("App").controller("SearchController", ['$scope', 'listService', 'SpotifySearchService', function ($scope, listService, spotifySearchService) {
    var self = this;
    self.Search = function () {
        spotifySearchService.search($scope.q)
    };
    $scope.Search = _.debounce(self.Search, 250);
    self.ResultSubscription = spotifySearchService.onSearchResults.subscribe(function (results){
       $scope.results = results;
    });
    $scope.SelectSong = function (song){
      $scope.selected.item.song = song;
      listService.saveList($scope.selected.list);
    };
    $scope.$on('$destroy', function () {
        self.ResultSubscription && self.ResultSubscription.dispose();
    });

}]);

