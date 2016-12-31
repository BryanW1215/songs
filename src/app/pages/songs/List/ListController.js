angular.module("App").controller("ListController", ['$scope', 'listService', 'exportService', function ($scope, listService, exportService) {
    var self = this;
    $scope.EditListTitle = function () {
        $scope.isEditingTitle = true;
    };
    $scope.CommitListTitle = function () {
        $scope.isEditingTitle = false;
        listService.saveList($scope.selected.list);
    };
    $scope.Export = function () {
        exportService.export($scope.selected.list);
    }
}]);
