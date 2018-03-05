import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    created: { type:Date, default: Date.now }, // diff new field
    description: { type: String, required: true },
    category: { type: String }, // can be array of categories
    color: { type: String },
    rating: { type: Number, min: 0, max: 5 },
    img: [String],
    accessible: { type: Boolean, default: true },
    preset: { type: String },
    producer: { type: String },
    memory: { type: String },
    capacity: { type: Number }
});

export default mongoose.model('products', schema);
