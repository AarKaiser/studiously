const util = require('util');
const User = require('../models/User');
const catchAsync = require('../utils/catch-async');

const jwt = require('jsonwebtoken');

// SIGN JWT TOKEN
const signToken = (id, expireTime) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expireTime,
  });

  return token;
};

// AUTHENTICATION RESPONSE
const sendAuthResponse = async (user, statusCode, res) => {
  const token = signToken(user._id, process.env.JWT_EXPIRES_IN);

  // Remove user's password before sending the response
  user.password = undefined;
  user.createdAt = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      data: user,
    },
  });
};

// REGISTER NEW USER
exports.signup = catchAsync(async (req, res, next) => {
  let fields = req.body;

  // Create user
  const newUser = await User.create(fields);

  // Add userprofile to newUser response data
  newUser.profile = profile;

  // Authenticate the user after sign up
  sendAuthResponse(newUser, 201, res);
});

// LOGIN USER
exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(
      new AppError('Please provide both Username and Password!', 400)
    );
  }

  const query = { email: username, password };

  // Find using the email and also including the password in the query
  const user = await User.findOne(query)
    .populate('profile')
    .select('+password');

  // Check if the user exist, if it does also check if the password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(
      new Error(
        'Wrong Email or Password! Please try again with the correct credentials'
      )
    );
  }
  // send token and response
  sendAuthResponse(user, 200, res);
});

// PROTECT ENDPOINT
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token and check if it's there
  const authHeader = req.headers.authorization;
  let token;

  // Check if auth token exist and if it starts with bearer
  if (authHeader && authHeader.startsWith('Bearer')) {
    // split and take the token only
    token = authHeader.split(' ')[1];
  }

  // Check if the token exist
  if (!token) {
    return next(new Error('Please login to access this route'));
  }

  // 2) Validate token
  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new Error('The user belonging to this token does NOT exist anymore!')
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new Error('User hand changed password! Please login again!'));
  }

  next();
});
