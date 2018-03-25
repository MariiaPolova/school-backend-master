import User from '../models/users';
import HttpStatus from 'http-status-codes';
import { controller, get, post, put, del } from 'koa-dec-router';
import BaseCtrl from './Base';
import * as _ from "lodash";

async function searchMdw(ctx, next){
    await next()
    {
        const filt = await User.find()
            .find(ctx.request.query);
        ctx.ok(filt);
    }
}

@controller('/users')
export default class UserCtrl extends BaseCtrl {

    @get('/param', searchMdw)
    async getItemByParams(ctx) {
        try {
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @get('/:_id', {priority: -1})
    async getItemById(ctx) {
        console.log('id');
        try {
            const items = await User.findById(ctx.params._id);
            ctx.ok(items);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @get('', {priority: -2})
    async getList(ctx) {
        try {
            console.log('all');
            const items = await User.find().lean();

            ctx.ok(items);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @post('')
    async createItem(ctx) {
        try {
            const result = await User.create(ctx.request.body);
            ctx.body = {message: 'Object created!', data: result}

        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }


    @put('/:_id')
    async updateItem(ctx) {
        try{
            const result = await User.findByIdAndUpdate(ctx.params._id, {$set: ctx.request.body});
            console.log(ctx.ok(result));
            ctx.ok(result);
        } catch (err){
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @del('/:_id')
    async deleteItem(ctx) {
        try{
            const result = await User.findOneAndRemove({_id: ctx.params._id});
            ctx.ok(result);
            ctx.body = {message: 'success!'}
        } catch (err){
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }

    }
}
