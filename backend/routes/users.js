const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const auth = require('../middleware/auth'); // Import the auth middleware


// GET all users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST add a new user
router.route('/add').post((req, res) => {
    const { EmpId, firstname, lastname, designation, department, sex, username, password } = req.body;

    const newUser = new User({
        EmpId,
        firstname,
        lastname,
        designation,
        department,
        sex,
        username,
        password
    });

    newUser.save()
        .then(() => res.json('New User Added Successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST user login
router.route('/login').post(async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create and send JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET user details by ID
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE user by ID
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// PUT update user details by ID
router.route('/:id').put(auth, (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.EmpId = req.body.EmpId;
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.designation = req.body.designation;
            user.department = req.body.department;
            user.sex = req.body.sex;
            user.username = req.body.username;
            user.password = req.body.password;

            user.save()
                .then(() => res.json('User details updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
