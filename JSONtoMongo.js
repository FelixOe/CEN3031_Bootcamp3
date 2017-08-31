'use strict';

var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

mongoose.connect(config.db.uri);

fs.readFile('listings.json', 'utf8', function (err, data) {
    if (err) {
        console.log('Error: ' + err);
        throw err;
    }

    var listingData = JSON.parse(data);

    console.log('# of elements: ' + listingData.entries.length);

    for (var i = 0; i < listingData.entries.length; i++) {

        console.log('Code: ' + listingData.entries[i].code);

        var item = new Listing();
        item.set('code', listingData.entries[i].code);
        item.set('name', listingData.entries[i].name);
        if (listingData.entries[i].coordinates) {
            item.set('coordinates.latitude', listingData.entries[i].coordinates.latitude);
            item.set('coordinates.longitude', listingData.entries[i].coordinates.longitude);
        }
        item.set('address', listingData.entries[i].address);

        item.save(function (error) {
            if (error) {
                console.log('Error: ' + error);
                throw error;
            }
            console.log('Save successful: ' + item.code);
        });
    }
    console.log('Finished');
});