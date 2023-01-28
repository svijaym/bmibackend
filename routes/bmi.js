const express = require("express");
const app = express();
const router = express.Router();
const bmi_model = require("../models/bmi_Schema");

router.get("/bmi", async (req, res) => {
  let data = await bmi_model.find();
  console.log(data);
  res.send(data);
});

router.post("/register", async (req, res) => {
  let { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.send({ message: "please fill all fields" });
  }

  try {
    let new_user = new bmi_model({
      name: name,
      email: email,
      password: password,
    });
    await new_user.save();
    res
      .status(201)
      .send({
        message: "Registered Succesfully",
        data: { name: name, email: email, password: password },
      });
  } catch (e) {
    res.status(401).send({ message: "user not created,try again" });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.send({ message: "please fill all fields" });
  }
  try {
    let user = await bmi_model.findOne({ email: email });
    console.log(user);
    if (user.email == email && user.password == password) {
      return res.send({ message: "user verified", data: user });
    } else {
      return res.send({ message: "User data not matched" });
    }
  } catch (e) {
    console.log(e);
    res.send({ message: "invalid user" });
  }
});

router.post("/bmi", async (req, res) => {
  let { email, weight, height } = req.body;
  console.log(weight, height, email);
  let bmi = +(weight) / (+(height) * 0.3048) ** 2;
  console.log(bmi);

  try {
    let user = await bmi_model.updateOne(
      { email: email },
      { $push: { bmi_history: bmi } }
    );
    res.status(201).send({ message: "bmi added successfully", bmi: bmi });
  } catch (e) {
    res.send({ message: "user not found" });
  }
});

router.get("/getCalculation", async (req, res) => {
  let { email } = req.body;
  try {
    let data = await bmi_model.findOne({ email: email });
    res.status(200).send({ message: "found user", data: data });
  } catch (e) {
    res.send({ message: "user not found" });
  }
});

module.exports = router;
