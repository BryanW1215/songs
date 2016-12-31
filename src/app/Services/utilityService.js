App.service('utilityService', function () {
    self.newGuid = function (dashes) {
        dashes = dashes || false;
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        var guid = [s4() + s4(), s4(), s4(), s4(), s4() + s4() + s4()];
        if (dashes) {
            return guid.join('-');
        }
        return guid.join('');
    };
    self.clone = function (data) {
        return JSON.parse(JSON.stringify(data));
    };
    return self;
});
