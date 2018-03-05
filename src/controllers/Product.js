import Product from '../models/products';
import HttpStatus from 'http-status-codes';
import { controller, get, post, put, del } from 'koa-dec-router';
import BaseCtrl from './Base';


async function searchMdw(ctx, next){
    await next()
    {
        console.log(ctx.request.query);
        // const filt = await _.filter Product, ctx.request.query);
        const filt = await Product.find()
            .find(ctx.request.query);
        ctx.ok(filt);
    }
}

@controller('/products')
export default class ProductCtrl extends BaseCtrl {

    @get('/param', searchMdw)
    async getItemByParams(ctx) {
        try {
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @get('/:_id', {priority: -1})
    async getItemById(ctx) {
        try {
            const items = await Product.findById(ctx.params._id);
            ctx.ok(items);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @get('', {priority: -2})
    async getList(ctx) {
        try {
            const items = await Product.find().lean();

            ctx.ok(items);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @post('')
    async createItem(ctx) {
        try {
            const result = await Product.create(ctx.request.body);
            ctx.body = {message: 'Object created!', data: result}

        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }


    @put('/:_id')
    async updateItem(ctx) {
        try{
            const result = await Product.findByIdAndUpdate(ctx.params._id, {$set: ctx.request.body});
            console.log(ctx.ok(result));
            ctx.ok(result);
        } catch (err){
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @del('/:_id')
    async deleteItem(ctx) {
        try{
            const result = await Product.findOneAndRemove({_id: ctx.params._id});
            ctx.ok(result);
            ctx.body = {message: 'success!'}
        } catch (err){
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }

    }
}
