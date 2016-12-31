angular.module('App').service('exportService', ['utilityService', function ($util) {
    var self = this;
    self.export = function (playlist) {
        playlist = $util.clone(playlist);
        playlist.songs = [];
        _.each(playlist.items, function (item) {
            if(!item.song){return;}
            delete item.song.$$hashKey;
            item.song && playlist.songs.push(item.song);
        });
        delete playlist.items;
        self.SendDownload('playlist.json', JSON.stringify(playlist));

    };
    self.SendDownload = function (filename, data) {
        var mime = "data:text/plain;charset=utf-8,";
        var data = mime + data;
        var encodedUri = encodeURI(data);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        setTimeout(function () {
            document.body.removeChild(link);
        }, 0)
    };
    return {export: self.export};
}]);

