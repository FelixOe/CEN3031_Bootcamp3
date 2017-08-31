/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
    code: String,
    name: String,
    coordinates: {latitude: Number, longitude: Number},
    address: String,
    created_at: Date,
    updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
listingSchema.pre('save', function (next) {
    this.created_at = Date.now();
    this.updated_at = Date.now();

    var err;

    if (typeof this.code == 'undefined')
        err = new Error('No code supplied!');
    if (typeof this.name == 'undefined')
        err = new Error('No name supplied!');

    if(err)
        next(err);
    else
        next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it available to other parts of your Node application */
module.exports = Listing;
