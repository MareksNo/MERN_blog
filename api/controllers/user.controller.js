import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({ message: "API is working!" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to modify this user's data")
    );
  }

  if (req.body.password) {
    if (req.body.password < 6) {
      return next(
        errorHandler(400, "Your password must contain at least 6 chracters")
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    console.log("username received");
    if (req.body.username < 5 || req.body.username > 20) {
      return next(
        errorHandler(
          400,
          "Your username must be between 5 and 20 chracters long"
        )
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Your username must not contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(
        errorHandler(
          400,
          "Your username must not contain upper case characters"
        )
      );
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Your username may only contain letters and numbers")
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to delete this account")
    );
  }
  await User.findByIdAndDelete(req.params.userId);
  res.status(200).json("User has been deleted");
  try {
  } catch (error) {
    next(error);
  }
};
