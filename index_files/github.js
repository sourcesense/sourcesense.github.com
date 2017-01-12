/**
  * Maurizio Pillitu - m.pillitu@sourcesense.com
  * Amsterdam, 13/01/2011
  * 
  * This script has been copied by Andrew Davey - http://aboutcode.net/2010/11/11/list-github-projects-using-javascript.html
  * From line 23 to 35 I've introduced a additional check to see if any site has been published for that specific project; 
  * the way it checks is by verifiyng the presence of an image (dirty, but effective); tried $ajax, $get, $getJSON $jsonp, 
  * but none of them worked out
**/
jQuery.githubUser = function(username, callback) {
    jQuery.getJSON("https://api.github.com/users/" + username + "/repos?callback=?", callback);
}

jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for repositories...</span>");
    var target = this;
    $.githubUser(username,
    function(data) {
        var repos = data.data;
        sortByNumberOfWatchers(repos);
        var list = $('<ul/>');
        target.empty().append(list);
        $(repos).each(function() {
            if (this.name != "sourcesense.github.com") {
                var name = this.name;
                var url = this.url;
                var x = new Image();
                x.onload = function() {
                    list.append('<li><a href="http://sourcesense.github.com/' + name + '">' + name + '</a></li>');
                }; 
                x.onerror = function() {
                    list.append('<li><a href="http://github.com/' + username + '/' + name + '">' + name + '</a></li>');
                };
                x.src = "http://sourcesense.github.com/" + name + "/images/logos/maven-feather.png";
            }
        });
    });

    function sortByNumberOfWatchers(repos) {
        repos.sort(function(a, b) {
            return b.watchers - a.watchers;
        });
    }

};
