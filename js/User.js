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
    'user-data': {
        favourite: {
            type: [Number],
            validate: {
                validator: v => v.every(num => num >= 1 && num <= 5),
                message: props => `${props.value} is not valid!`
            }
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