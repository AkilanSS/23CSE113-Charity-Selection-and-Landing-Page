require('dotenv').config();
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
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('connected')).catch(err => console.log(err));


//const UserSchema = 

const User = mongoose.model('User', new mongoose.Schema({
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
    profession: String
}));


app.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, contactNo, country, cityState, postalCode, organization, industry, profession } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'Email already in use' });
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword, contactNo, country, cityState, postalCode, organization, industry, profession });
        
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
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
