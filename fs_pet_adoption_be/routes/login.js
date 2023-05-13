const express = require("express");
const router = express.Router();
const Ajv = require("ajv").default;
const ajv = new Ajv();
const S = require("fluent-json-schema");
const jwt = require("jsonwebtoken");
const persist = require("../databases/persist");
require("dotenv").config();


async function getAllUsers() {
  const items = persist.getAllUsers();
  return items;
}





const logSchema = S.object()
  .prop("id", S.string().required())
  .prop("password", S.string().required())
  .valueOf();

async function logout(req, res, next) {
  const userId = req.params.id;
  const date = new Date();
  persist.addLog(userId, "logged out at " + date);
  res
    .status(200)
    .json({ success: true, message: 'User logged out successfully' })
}

async function login(req, res, next) {
  try {
    const validate = ajv.compile(logSchema);
    const valid = validate(req.body);
    if (!valid) {
      throw new Error("invalid input");
    }
    const allUsers = await getAllUsers();
    const userToLog = req.body;
    let userExists = false;
    let fullUser;

    for (let user of allUsers) {
      if (user.id === userToLog.id) {
        userExists = true;
        fullUser = user;
      }
    }


    if (!userExists) {
      throw new Error("Invalid Email or Password");
    }

    const correctPass = fullUser.password === userToLog.password;
    if (fullUser.isAdmin === "false") {
      fullUser.isAdmin = false;
    }
    if (correctPass) {
      const token = jwt.sign(
        {
          data: fullUser.id,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        token: token,
        id: fullUser.id,
        isAdmin: fullUser.isAdmin,
        first_name: fullUser.first_name,
        last_name: fullUser.last_name,
        savedPets: fullUser.savedPets,
      });
      const date = new Date();
      persist.addLog(fullUser.id, "logged in at " + date);
    } else if (!correctPass) {
      throw new Error("Incorrect Password");
    }
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
}

router.get("/:id", logout);

router.post("/", login);

module.exports = { router, login, logout };
