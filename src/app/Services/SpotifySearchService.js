angular.module('App').service('SpotifySearchService', ['$http', 'rx', function ($http, rx) {
    var self = this;
    self.onSearchResults = new rx.Subject();
    self.search = function (q) {
        var url = 'https://api.spotify.com/v1/search?type=track&limit=8&q=' + encodeURIComponent(q);
        $http.get(url).then(function (result) {
            if (result.status !== 200) {
                return;
            }
            var data = self.transformResults(result.data.tracks.items);
            self.onSearchResults.onNext(data);
        });
    };
    self.transformResults = function (data){
        return _.map(data, function (song){
            return {
                name: song.name,
                album: song.album.name,
                artist: song.artists[0].name,
                image: song.album.images.length && song.album.images[0].url
            }
        })
    };
    return {search: self.search, onSearchResults: self.onSearchResults};
}]);
