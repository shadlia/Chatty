const User = require('./../model/userModel'); // Make sure to import your User model
const AppError = require('./../utils/appError'); // Make sure to import your
const catchAsync = require('./../utils/catchAsync');
module.exports.register = async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    // 1- Check if the user is already registered
    let userCheck = await User.findOne({ username });

    if (userCheck) {
      return res.json({
        success: false,
        msg: 'Username already registered',
      });
    }
    let useremailcheck = await User.findOne({ email });
    if (useremailcheck) {
      return res.json({
        success: false,
        msg: 'email already registered',
      });
    }
    // 2- Create a new user
    const user = await User.create({
      username,
      email,
      password,
    });

    // 3- Save the user to the database
    await user.save();

    // Don't send the password in the response
    user.password = undefined;

    // 4- Send a successful response
    res.status(201).json({
      success: true,
      data: {
        user: user,
      },
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};

/* module.exports.register = catchAsync(async (req, res, next) => {
  const { username, password, email } = req.body;

  // 1- Check if the user is already registered
  let userCheck = await User.findOne({ username });

  if (userCheck) {
    return res.json({
      success: false,
      msg: 'Username already registered',
    });
  }
  let useremailcheck = await User.findOne({ email });
  if (useremailcheck) {
   
    return next(new AppError('Email already registered', 409));
  }
  // 2- Create a new user
  const user = await User.create({
    username,
    email,
    password,
  });

  // 3- Save the user to the database
  await user.save();

  // Don't send the password in the response
  user.password = undefined;

  // 4- Send a successful response
  res.status(201).json({
    success: true,
    data: {
      user: user,
    },
  });
}); */
module.exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // 1- Check if the user is already registered
    let user = await User.findOne({ username });

    if (!user) {
      return res.json({
        success: false,
        msg: 'Username doesnt exist',
      });
    }
    if (!(await user.correctPassword(password, user.password))) {
      return res.json({
        success: false,
        msg: 'Wrong Username or Password',
      });
    }
    return res.json({
      success: true,
      data: {
        user: user,
      },
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};
module.exports.setAvatar = async (req, res, next) => {
  try {
    const id = req.params.id;
    const image = req.body.image;

    const user = await User.findById(id);

    if (!user) {
      return res.json({
        success: false,
        msg: 'Please login first',
      });
    }

    user.isAvatarImageSet = true;
    user.avatarImage = image;
    user.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      data: {
        user: user,
        image: image,
      },
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};

module.exports.getAllContacts = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const users = await User.find({ _id: { $ne: userId } }).select([
      'email',
      'username',
      'avatarImage',
      '_id',
    ]);

    res.status(201).json({
      success: true,
      data: {
        users: users,
      },
    });
  } catch (error) {
    next(error);
    res.json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};
