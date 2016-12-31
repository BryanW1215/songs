angular.module('App').controller("ListsController", ['$scope', 'listsService', 'listService', function ($scope, listsService, listService) {
    var self = this;
    $scope.lists = listsService.get();
    $scope.CreateList = function () {
        var id = listService.createList();
        location.hash = '#!/list/' + id;
    };
    $scope.SelectList = function (list) {
        location.hash = '#!/list/' + list.id;
    };
    $scope.RemoveList = function (list) {
        listsService.removeList(list.id);
        if (location.hash === '#!/list/' + list.id) {
            location.hash = '#!/'
        }
    };
    self.UpdateSubscription = listsService.onUpdate.subscribe(function (listIndex) {
        $scope.lists = listIndex;
    });
    $scope.$on('$destroy', function () {
        self.UpdateSubscription  && self.UpdateSubscription.dispose()
    });
}]);