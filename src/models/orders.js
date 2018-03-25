import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    id: { type: Number, required: true },
    created: { type:Date, default: Date.now },
    customer_id: { type: String, required: true },
    customer_name: { type: String, required: true },
    products: [{ product_id: String, product_title: String, product_price: Number, quantity: Number }],
    status: {type: String, required: true, enum: ['Open', 'Processed', 'Failed', 'Cancelled'], default: 'Open'}
});

export default mongoose.model('orders', schema);