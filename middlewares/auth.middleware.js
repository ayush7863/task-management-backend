const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, "sagar");
    if (decoded) {     
      req.body.createdBy = decoded.userID;      
      next();
    } else {
      res.status(401).send({ msg: "Please Login First!" });
    }
  } else {
    res.status(402).send({ msg: "Please Login First!" });
  }
};

module.exports = {
  auth,
};
