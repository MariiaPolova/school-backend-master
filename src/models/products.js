import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, enum: ['Desktops', 'Laptops', 'Tablets', 'Phones'] },
        price: { type: Number },
        color: { type: String, enum: ['Silver', 'Gold', 'Rose', 'Black'] },
        rating_value: { type: Number, default: 0 },
        rating_votes: { type: Number, default: 0 },
        img: [String],
        amount: { type: Number, default: 0 },
        filters_memory: {type: String},
        filters_ram: {type: String},
        filters_producer: {type: String}
});

export default mongoose.model('products', schema);
