'use strict';

module.exports = function(router) {

    router.get('/', function(req, res) {
        res.sendFile('index.html');
    });

};
