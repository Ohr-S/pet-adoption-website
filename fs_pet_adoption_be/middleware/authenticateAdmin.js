const jwt = require("jsonwebtoken");
const { getAllUsers } = require("../databases/persist");
require("dotenv").config();


module.exports.authAdminMid = () => {
  return (req, res, next) => {
    try {
      const authheader = req.headers.authorization;
      const token = authheader && authheader.split(" ")[1];

      if (token == null) {
        return res.status(401);
      }

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
        if (err) return res.status(403);
        const allUsers = getAllUsers();
        const user = allUsers.filter((user) => user.id === req.headers.id);
        if (user.isAdmin === false || user.isAdmin === "false") {
          return res.status(403);
        }
        next();
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
};
