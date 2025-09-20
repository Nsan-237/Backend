const jwt = require("jsonwebtoken");

const checkIfUserIsAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader, "authHeader");
  if (!authHeader) {
    return res.status(401).json({ message: "Token Misssing" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decodedToken = jwt.verify(token, process.env.SECRET);
  console.log(decodedToken.user, "decoded token");

  if (!decodedToken) {
    return res.status(401).json({ message: "Malformed token " });
  }
  req.user = decodedToken.user;
  next();
};
module.exports = { checkIfUserIsAuthenticated };
