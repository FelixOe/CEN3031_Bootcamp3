/* Fill out these functions using Mongoose queries*/
var mongoose = require('mongoose'),
    Listing = require('./ListingSchema.js'),
    config = require('./config');

mongoose.connect(config.db.uri);

var findLibraryWest = function () {
    Listing.findOne({"name": "Library West"}, "", function (err, listing) {
        if (err)
            throw err;

        console.log(listing);
    });
};
var removeCable = function () {
    Listing.findOne({"code": "CABL"}, "", function (err, listing) {
        if (err)
            throw err;

        if (listing != null) {
            console.log(listing);
            listing.remove();
        }
        else
            console.log('CABL already deleted');

    });
};
var updatePhelpsLab = function () {
    Listing.findOne({"name": "Phelps Laboratory"}, "", function (err, listing) {
        if (err)
            throw err;

        listing.address = 'Phelps Lab, Gainesville, FL 32611, United States';
        listing.save(function (err) {
            if (err) {
                console.log('Error: ' + err);
                throw err;
            }
        });

        console.log(listing);
    });
};
var retrieveAllListings = function () {
    Listing.find({}, "", function (err, listings) {
        if (err)
            throw err;

        for(var i = 0; i < listings.length; i++)
            console.log(listings[i]);
    });
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
