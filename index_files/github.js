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
            var hasSite = false;
            try {
				//Dirty but effective ;-)
                $.getJSON('http://sourcesense.github.com/' + this.name + '/index.html?callback=?');
                hasSite = true;
            } catch(err) {
                hasSite = false;
            }
            if (hasSite) {
                list.append('<li><a href="http://sourcesense.github.com/' + this.name + '">' + this.name + '</a></li>');
            } else {
                list.append('<li><a href="' + this.url + '">' + this.name + '</a></li>');
            }
        });
    });

    function sortByNumberOfWatchers(repos) {
        repos.sort(function(a, b) {
            return b.watchers - a.watchers;
        });
    }
};