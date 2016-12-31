angular.module('App').service("listService", ['rx', 'utilityService', 'localStorageService', 'listsService', function (rx, $utility, $storage, listService) {
    var self = this;
    self.onUpdate = new rx.Subject();
    self.getList = function (listId) {
        return $storage.get(listId);
    };
    self.createList = function () {
        var newList = {id: $utility.newGuid(), name: 'New List', items: []};
        for (var x = 0; x < 10; x++) {
            var i = x;
            newList.items.push({position: i + 1});
        }
        listService.addList({id: newList.id, name: newList.name});
        $storage.set(newList.id, newList);
        return newList.id;
    };
    self.saveList = function (list) {
        listService.updateList(list);
        $storage.set(list.id, list);
        self.onUpdate.onNext(list);
    };
    self.getList = function (listId) {
        return $storage.get(listId);
    };
    self.getDebouncedSaveMethodFor = function (list) {
        return _.debounce(function () {
            self.saveList(list);
        }, 1000)
    };
    return self;
}]);
