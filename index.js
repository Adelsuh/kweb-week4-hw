const axios = require('axios');
const http = require('http');
const url = require('url');

const hostname='127.0.0.1';
const port=3000;

const server=http.createServer((req, res) => {
    res.statusCode=200;
    res.writeHead(200, {"Content-Type": "text/plain"});
    var query=url.parse(req.url, true).query;
    if (query.repo) var path=query.repo;
    else var path='nodejs/node';
    if (url.parse(req.url, true).pathname != '/') res.end('Page Not Found!');
    else if (Object.keys(query).length>1 ||
        (Object.keys(query).length==1 && Object.keys(query)[0]!='repo'))
            res.end('Wrong Query!');
    else axios.get('https://api.github.com/repos/'+path)
    .then(function(response) {
        res.write('stargazers_count: '+
        response.data.stargazers_count.toString()+'\n');
        res.end('open_issues_count: '+
        response.data.open_issues_count.toString());
    })
    .catch(function(error) {
        res.end('Wrong database!');
    })
});

server.listen(port, console.log("server is working..."));