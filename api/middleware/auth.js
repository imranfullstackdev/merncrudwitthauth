const jwt = require("jsonwebtoken");
const user = require("../userSchema/userschema");
const Authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("Hello ", token);
    const verifyToken = jwt.verify(token, process.env.SECRECTKEY);
    console.log("theuser is", verifyToken);
    const rootUser = await user.findOne({
        _id: verifyToken._id,
    });
    console.log("the user id is", rootUser);
    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (err) {
    res.status(401).send({ err: "unAutherized User" });
    console.log(err);
  }
};
module.exports = Authenticate;
