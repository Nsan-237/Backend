const jwt = require("jsonwebtoken");

const checkIfUserIsAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader, "authHeader");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];
  if (!token || token === "null" || token === "undefined") {
    return res.status(401).json({ message: "Unauthorized: Token not provided" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken.user, "decoded token");

    if (!decodedToken || !decodedToken.user) {
      return res.status(401).json({ message: "Malformed token" });
    }
    req.user = decodedToken.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};

module.exports = { checkIfUserIsAuthenticated };