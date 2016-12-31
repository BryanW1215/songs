angular.module('App').controller('SongsController', ['$scope', '$routeParams', 'listService', function ($scope, $params, listService) {
    var self = this;
    self.views = {none: '', song: '/songs/Song/Song.html', search: '/songs/Search/Search.html'};
    self.subscriptions = [];
    $scope.selected = {};
    self.load = function () {
        $scope.selected = {};
        if (!$params.id) {
            return;
        }
        $scope.selected.list = listService.getList($params.id);
    };
    $scope.GetSongPanelViewTemplate = function () {
      if(!$scope.selected.item){
          return self.views.none;
      }
      if($scope.selected.item.song){
          return self.views.song;
      }
      return self.views.search;
    };
    self.load();
}]);
