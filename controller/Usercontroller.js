import { trychamiddleware } from "../middileware/trycatchmiddleware.js";
import dotenv from "dotenv";
import Test from "../model/TestSchema.js";
import { joiTestSchema } from "../model/ValidationSchema.js";

dotenv.config();

export const AddTest = async (req, res, next) => {
  const { value, error } = joiTestSchema.validate(req.body);
  console.log(value);
  if (error) {
    return next(trychamiddleware(400, "validaton error"));
  }
  try {
    const newtest = await Test.create({
      ...value,
    });
    res.status(200).json({
      status: "success",
      message: "data created successfully",
      data: newtest,
    });
  } catch (err) {
    next(err);
  }
};
export const Gettest = async (req, res, next) => {
  try {
    const newtest = await Test.find();
    if (newtest) {
      res.status(200).json({
        status: "success",
        message: "get all testd",
        data: newtest,
      });
    }
  } catch (err) {
    next();
  }
};
export const Updatetest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { value, error } = joiTestSchema.validate(req.body);

    if (error) {
      return next(trychamiddleware(400, "Validation error"));
    }

    const updatedTest = await Test.findByIdAndUpdate(
      id,
      { $set: value },
      { new: true }
    );

    if (!updatedTest) {
      return next(trychamiddleware(404, "Test not found"));
    }

    res.status(200).json({
      status: "success",
      message: "Test updated successfully",
      data: updatedTest,
    });
  } catch (err) {
    next(err);
  }
};
export const Deletetest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTest = await Test.findByIdAndDelete(id);

    if (!deletedTest) {
      return next(trychamiddleware(404, "Test not found"));
    }

    res.status(200).json({
      status: "success",
      message: "Test deleted successfully",
      data: deletedTest,
    });
  } catch (err) {
    next(err);
  }
};
