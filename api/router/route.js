const express = require("express");
const router = express.Router();
const user = require("../userSchema/userschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const autherization = require("../middleware/auth");

// for posting the data
router.post("/register", async (req, res) => {
  const { name, email, password, Cpassword, phone } = req.body;
  if ((!name, !email, !password, !Cpassword, !phone)) {
    return res.status(400).send({ err: "please fill all the data" });
  } else {
    if (password != Cpassword) {
      res.status(400).send({ err: "passwr dont match" });
    }

    const prevUser = await user.findOne({ email });
    if (prevUser) {
      console.log(prevUser);
      return res.status(400).send({ err: "user already exist" });
    } else {
      const addUser = new user({ name, email, password, Cpassword, phone });
      addUser.save();
      res.send({ sus: "user added sucessfully" });
    }
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      res.status(400).send({ err: "please filll all the data" });
    } else {
      const loginUser = await user.findOne({ email });
      console.log("the loginuser",loginUser._id);
      if (!loginUser) {
        return res.status(400).send({ err: "no user found" });
      } else {
        const verifyPassword = await bcrypt.compare(
          password,
          loginUser.password
        );
        if (verifyPassword) {
          const token = jwt.sign(
            { _id: loginUser._id },
            process.env.SECRECTKEY
          );
          // console.log("token", token);
          res.send({ token: token });
          // console.log(loginUser);
        } else {
          return res.status(400).send({ err: "invalid credential" });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// get all data
router.get("/getall", async (req, res) => {
  const alldata = await user.find();
  res.send(alldata);
  // console.log(alldata);
});

// update the data
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const updatedata = await user.findByIdAndUpdate(id, req.body, {
    new: true,
    validators: true,
    upsert: true,
  });
  res.send({ updatedata });
  console.log("updated sucessfully");
});

//delete the data
router.delete("/dlt/:id", async (req, res) => {
  const { id } = req.params;
  const deleteuser = await user.findByIdAndDelete(id);
  console.log(deleteuser);
  console.log("deleted sucessfully");
  res.send({ deleteuser });
});
router.get("/view", autherization, async (req, res) => {
  // res.send(...verifyUser,{});
  console.log("welcom to View");
  res.send({userdetails:req.rootUser})
});

module.exports = router;
