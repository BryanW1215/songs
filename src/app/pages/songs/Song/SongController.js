angular.module("App").controller("SongController", ['$scope', 'listService', function ($scope, listService) {
    var self = this;

    $scope.SaveModel = listService.getDebouncedSaveMethodFor($scope.selected.list);

    $scope.ChangeSelection = function () {
        delete $scope.selected.item.song;
        listService.saveList($scope.selected.list)
    }
}]);
