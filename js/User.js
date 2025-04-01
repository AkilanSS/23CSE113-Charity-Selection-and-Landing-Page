import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    contactNo: String,
    country: String,
    cityState: String,
    postalCode: String,
    organization: String,
    industry: String,
    profession: String,
    userdata: {
        profile:{
            displayname: String,
            userdesc: String,
            imgpath: String
        },
        favourite: {
            type: [Number],
        },
        receipts: [{
            id: Number,
            desc: String,
            'donation-id': String,
            date: Date,
            'contr-money': Number
        }]
    }
});

export default model('User', UserSchema);