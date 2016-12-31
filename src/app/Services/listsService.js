angular.module('App').service("listsService", ['utilityService', 'localStorageService', 'rx', function ($utility, $storage, rx) {
    var self = this;
    self.onUpdate = new rx.Subject();
    self.get = function () {
        return $storage.get("ListIndex") || [];
    };
    self.set = function (listIndex) {
        $storage.set("ListIndex", listIndex);
    };
    self.addList = function (List) {
        var listIndex = self.get();
        listIndex.push({id: List.id, name: List.name});
        self.set(listIndex);
        self.onUpdate.onNext(listIndex);
    };
    self.updateList = function (List) {
        var listIndex = self.get();
        var storedList = _.find(listIndex, {id: List.id});
        storedList.name = List.name;
        self.set(listIndex);
        self.onUpdate.onNext(listIndex);
    };
    self.removeList = function (listId) {
        var listIndex = self.get();
        _.remove(listIndex, {id: listId});
        self.set(listIndex);
        $storage.remove(listId);
        self.onUpdate.onNext(listIndex);
    };
    return self;
}]);