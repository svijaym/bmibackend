const { Schema, model } = require("mongoose");

const bmi_schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, requied: true },
    bmi_history: [],
    height: { type: Number },
    weight: { type: Number },
  },
  {
    strict: false,
  },
  {
    versionKey: false,
  }
);

const bmi_model = model("bmi", bmi_schema);
module.exports = bmi_model;
