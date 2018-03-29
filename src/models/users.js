import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    ownname: { type: String },
    surname: { type: String },
    email: { type:String },
    gender: { type:String,  enum: ['Male', 'Female', 'Other'] }, // added enum
    isAdmin: {type:Boolean}
});

// Virtual for user's full name
UserSchema
    .virtual('name')
    .get(function () {
        return this.surname + ', ' + this.ownname;
    });

// Virtual for user's URL
UserSchema
    .virtual('url')
    .get(function () {
        return '/api/users/' + this._id;
    });

export default mongoose.model('users', UserSchema);
