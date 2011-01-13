jQuery.githubUser = function(username, callback) {
    jQuery.getJSON("http://github.com/api/v1/json/" + username + "?callback=?", callback);
}

jQuery.githubBranches = function(username, repo, callback) {
    jQuery.getJSON("http://github.com/api/v2/json/" + username + "/" + repo + "/branches?callback=?", callback);
}

jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for repositories...</span>");
    var target = this;
    $.githubUser(username,
    function(data) {
        var repos = data.user.repositories;
        sortByNumberOfWatchers(repos);
        var list = $('<ul/>');
        target.empty().append(list);
        $(repos).each(function() {
            var name = this.name;
            var url = this.url;
            var x = new Image();
            x.onload = function() {
                list.append('<li><a href="http://sourcesense.github.com/' + name + '">' + name + '</a></li>');
            }; 
            x.onerror = function() {
                list.append('<li><a href="' + url + '">' + name + '</a></li>');
            };
            x.src = "http://sourcesense.github.com/" + name + "/images/logos/maven-feather.png";
        });
    });

    function sortByNumberOfWatchers(repos) {
        repos.sort(function(a, b) {
            return b.watchers - a.watchers;
        });
    }

};