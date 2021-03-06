/* global -Promise */
'use strict';

var _ = require('lodash'),
    Promise = require('bluebird'),
    promisedGet = require('../lib/promisedGet');

var getMarketData = function(url, rejection) {
    return promisedGet(url)
    .then(function(response) {
        if (response.results[0] && response.results[0].id === 'Error') {
            return Promise.reject(rejection);
        } else {
            return {
                results: _.map(response.results, function(result) {
                    result.distance = result.marketname.split(' ', 1)[0].trim();
                    result.marketname = result.marketname.replace(result.distance, '').trim();
                    return result;
                })
            };
        }
    })
    .catch(function(err) {
        return Promise.reject(rejection);
    });
};

module.exports = {

    getMarketsByLatLong: function(lat, lon) {
        var rejection = 'Invalid Latitude or Longitude';
        var url = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=' + lat + '&lng=' + lon;

        return getMarketData(url, rejection);
    },

    getMarketsByZipcode: function(zipcode) {
        var rejection = 'Invalid Zipcode';
        var url = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=' + zipcode;

        return getMarketData(url, rejection);
    }

};
