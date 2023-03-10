const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");

var isUserLoggedInProd = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      //@ts-ignore
      req.user = await userModel.findById(_id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid Token,Unauthorized access is prohibited",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "You are not logged in, please login first",
    });
  }
};

module.exports = isUserLoggedInProd;
