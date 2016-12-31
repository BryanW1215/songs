App.service('localStorageService', [function () {
    self.get = function (value) {
        if(!localStorage[value]){
            return;
        }
        return JSON.parse(localStorage[value]);
    };
    self.set = function (key, value) {
        localStorage[key] = JSON.stringify(value);
    };
    self.remove = function (key) {
        localStorage.removeItem(key);
    };
    return self;
}]);
