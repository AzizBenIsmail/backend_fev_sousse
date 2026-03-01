const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String },
    description: String,
    price: { type: Number },
    category: String,
    //stock: { type: Number, default: 0 },
    imageUrl: String,
    createdAt: { type: Date, default: Date.now },

    //Many
    owners : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    owner : { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // one to many relationship between products and users
});

module.exports = mongoose.model('Product', productSchema);