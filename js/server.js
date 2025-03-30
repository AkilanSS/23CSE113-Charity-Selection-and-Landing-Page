const path = require('path'); // Add this line
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Modify this line
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
console.log(process.env.MONGO_URI);


console.log("Mongo URI from env:", process.env.MONGO_URI); //add this line
console.log("Attempting to connect to:", process.env.MONGO_URI); //add this line


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('connected')).catch(err => console.log(err));


//const UserSchema = 
const User = mongoose.model("user", new mongoose.Schema({
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
        profile: {
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
}))

app.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, contactNo, country, cityState, postalCode, organization, industry, profession } = req.body;

        var imgToDisplay = "../assets/images/prof_placeholder.png"

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'Email already in use' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            contactNo,
            country,
            cityState,
            postalCode,
            organization,
            industry,
            profession,
            userdata: {
                profile: {
                    displayname: `${firstName} ${lastName}`,
                    userdesc: "",
                    imgpath: imgToDisplay
                },
                favourite: [],
                receipts: []
            }
        });

        await newUser.save();
        res.status(201).json({ msg: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.post('/login', async (req, res) => {
    console.log('Login request received:', req.body);

    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            console.log('Missing email or password');
            return res.status(400).json({ msg: 'Email and password are required' });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check password
        const comparepass = bcrypt.hash(password, 10)
        if (comparepass == user.password) {
            console.log('Password mismatch for user:', email);
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Prepare user response (exclude sensitive information)
        const userResponse = {
            _id: user._id,
        };

        // Ensure a proper JSON response
        console.log('Sending login response');
        res.json({ token, user: userResponse });
    } catch (err) {
        console.error('Login server error:', err);
        // Ensure error response is in JSON format
        res.status(500).json({
            error: 'Server error during login',
            details: err.message
        });
    }
});

app.put('/addcart', async (req, res) => {

    try {
        const recieptList = req.body

        const update = await User.findByIdAndUpdate(
            recieptList.userDetail._id,
            { $push: { 'userdata.receipts': recieptList.rList } },
            { new: true }
        );

        console.log("Successfully updated")

        res.status(201).json({ msg: "Added reciept to the user" })

    } catch (error) {
        console.log(error)
    }
})

app.post('/profileRetrieve', async (req, res) => {
    try{
        const data = await User.findById(req.body)
        res.status(200).json(data)
    }catch(error){
        console.log(error)
    }
})

app.put('/changeInfo', async (req, res) => {
    try{
        var newData = req.body
        const peak = await User.findByIdAndUpdate(newData.id,
            {
                "firstName" : newData.firstName,
                "lastName" : newData.lastName,
                "email" : newData.email,
                "contactNo": newData.contactNo,
                "country" : newData.country,
                "cityState": newData.cityState,
                "postalCode" : newData.postalCode,
                "organization" : newData.organization,
                "industry" : newData.industry,
                "profession" : newData.profession,
                "userdata.profile.displayname": newData.userdata.profile.displayname,
                "userdata.profile.userdesc": newData.userdata.profile.desc
            }, {new: true}
        )
        console.log("Succsessfully updated")
        res.status(201).json({msg: "Profile Updated Successfully"})

    }catch(error){
        console.log(error)
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

function addCommaToNum(number) {
    const formatter = new Intl.NumberFormat('en-IN')
    const formattedNumber = formatter.format(number)
    return formattedNumber
}

function remCommaFromNum(number) {
    return parseFloat(number?.replace(/[^\d.]/g, '') || 0)
}