const asyncHandler = require('../middleware/asyncHandler');
const userService = require('../services/userService');

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
});

// Auth user & get token
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    res.status(200).json(user);
});

module.exports = {
    registerUser,
    loginUser,
};