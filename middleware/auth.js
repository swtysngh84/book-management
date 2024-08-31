const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const httpStatus = require("http-status");

const User = mongoose.model("user");

const responseMessage = require("../label/response");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        responseMessage: responseMessage.TokenNotPassed,
        isLogout: true,
      });
    }
    const verifyUser = jwt.verify(token, process.env.USER_SECRET_KEY);
    if (!verifyUser) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        responseMessage: responseMessage.UnAuthorized,
        isLogout: true,
      });
    }
    const user = await User.findOne({
      _id: verifyUser._id,
      deletedAt: null,
    });
    if (user) {
      user.set("password", undefined, { strict: false });
      req.user = user;
      return next();
    }

    return res.status(httpStatus.UNAUTHORIZED).json({
      responseMessage: responseMessage.UnAuthorized,
      isLogout: true,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ data: null, responseMessage: err.message, isLogout: 1 });
  }
};
