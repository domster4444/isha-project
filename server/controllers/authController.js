const nodemailer = require("nodemailer");

//? Error Handlers
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//? Validators
const { registerValidator } = require("../middlewares/validators/joiValidator");

//?Models
const User = require("../models/userModel");

//? jwt
const { createGeneralJWT, verifyToken } = require("../utils/jwt");

//sendgrid
// const { sendEmail } = require("../utils/sendGrid");

//nodemailer
// const { transporter } = require("../utils/sendEmail");

// interface formData {
//   name: string;
//   email: string;
//   password: string;
// }

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  //*=============================================validate body data using
  //todo: JoiValidator , it will throw auto generated error as response
  const { name, email, password } = req.body;
  //specifically sending selected form data to joi, as joi will response as error if extra fields are provided in req.body

  const formDataForValidation = {
    email: email,
    name: name,
    password: password,
  };
  await registerValidator(formDataForValidation);

  //* ===================================================check if user already exist
  await User.findOne({ email }).exec((err, user) => {
    if (err) {
      //!END OF THIS FUNC
      return next(new ErrorHandler("Server Error, Try Again Later", 500));
    }
    if (user) {
      //!END OF THIS FUNC
      return next(new ErrorHandler("User already exists", 400));
    }
  });

  //*============================================================ If user dont exist,
  const newUser = new User({ name, email, password }); //? Create User Object based on User-Schema
  console.log("saving route has been hit");
  await newUser.save((err, success) => {
    if (err) {
      return next(new ErrorHandler("Error occured while saving user to db", 500));
    }
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: success,
    });
  }); //? Save User to DB
});

exports.verifiedRegisterUser = catchAsyncErrors(async (req, res, next) => {
  //*=============================================validate body data using
  //todo: JoiValidator , it will throw auto generated error as response
  const { name, email, password } = req.body;
  //specifically sending selected form data to joi, as joi will response as error if extra fields are provided in req.body

  const formDataForValidation = {
    email: email,
    name: name,
    password: password,
  };
  await registerValidator(formDataForValidation);

  //* ===================================================check if user already exist
  await User.findOne({ email }).exec((err, user) => {
    if (err) {
      //!END OF THIS FUNC
      return next(new ErrorHandler("Server Error, Try Again Later", 500));
    }
    if (user) {
      //!END OF THIS FUNC
      return next(new ErrorHandler("User already exists", 400));
    }
  });

  //*============================================================ If user dont exist,
  //todo: send verification email with dynamic frontend link with user-data-that-need-to-be-created inside jsonwebtoken
  //todo: in gmail use will receive == localhost:3000/verify-email-for-creating-account/{TokenHavingUserAccountDataToBeCreated}
  //localhost:3000/verify-email-for-creating-account/:id/:token
  //on clicking verify, the client fetch token from url
  //and send to server at server's endpoint /api/create-user-account-after-verifying-jwt/:id  inside header Bearer token to verify
  //the server will verity that token , then fetch user-account-data and create account with that data

  const generatedToken = await createGeneralJWT({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, "1d");

  const activationLink = `${process.env.PROD_CLIENT_URL}/activate-account/${generatedToken}`;

  var from = "donotreplythisback@gmail.com";
  var to = email;
  var subject = "Verification";
  var message = activationLink;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "donotreplythisback@gmail.com",
      pass: "sajjhjleycfzonhx",
    },
  });

  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return next(new ErrorHandler("Error occured while sending email", 500));
    } else {
      console.log("email sent :  " + info.response);
      return res.status(200).json({
        success: true,
        message: "Verification email sent successfully",
      });
    }
  });

  // const emailSentStatus = await sendEmail(email, process.env.EMAIL_FROM, emailContent);
  // console.log(emailSentStatus);
  // if (emailSentStatus) {
  //   return res.status(200).json({
  //     success: true,
  //     message: "Verification email sent successfully",
  //   });
  // } else {
  //   return next(new ErrorHandler("Error occured while sending email", 500));
  // }
});

exports.createAccountForEmailVerifiedUser = catchAsyncErrors(async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  console.log(req.header);
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1]; //? token is in form of Bearer token
    const tokenData = await verifyToken(token, process.env.JWT_ACCOUNT_ACTIVATION);
    console.log(tokenData);

    if (!tokenData) {
      return next(new ErrorHandler("No token provided", 401));
    }

    const { name, email, password } = tokenData.data;
    console.log(name);
    console.log(email);
    console.log(password);

    await User.findOne({ email }).exec((err, user) => {
      if (err) {
        //!END OF THIS FUNC
        return next(new ErrorHandler("Server Error, Try Again Later", 500));
      }
      if (user) {
        //!END OF THIS FUNC
        return next(new ErrorHandler("User already exists", 400));
      }
    });

    const newUser = new User({ name, email, password });
    await newUser.save((err, success) => {
      if (err) {
        return next(new ErrorHandler("Error occured while saving user to db", 500));
      }
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: success,
      });
    });
  } else {
    return next(new ErrorHandler("No token provided", 401));
  }
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  await User.findOne({ email }).exec(async (err, user) => {
    if (err) {
      return next(new ErrorHandler("server error", 400));
    }
    if (!user) {
      return next(new ErrorHandler("user not found", 400));
    }
    //? if model method returns false then execute below block
    if (!user.compareWithEncryptedPassword(password)) {
      return next(new ErrorHandler("password or email is incorrect", 400));
    }

    const { _id, name, email, role } = user;

    const generatedToken = await createGeneralJWT({ _id, name, email, role }, process.env.JWT_SECRET_KEY, "1d");

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        _id,
        name,
        email,
        role,
      },
      token: generatedToken,
    });
  });
});

exports.getUserProfileData = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  console.log("userId =============================================================");
  console.log(id);
  await User.findById(id)
    .select("-salt -hashed_password")
    .exec((error, user) => {
      if (error) {
        return next(new ErrorHandler("server error", 500));
      }
      if (!user) {
        return next(new ErrorHandler("user not found", 400));
      }
      return res.status(200).json({
        success: true,
        message: "User profile data fetched successfully",
        data: user,
      });
    });
});
