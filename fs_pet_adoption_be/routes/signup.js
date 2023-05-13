const express = require("express");
const router = express.Router();
const Ajv = require("ajv").default;
const ajv = new Ajv();
const S = require("fluent-json-schema");
const persist = require("../databases/persist");
const { all } = require("./pet");


async function getAllUsers() {
  const items = persist.getAllUsers();
  return items;
}

async function addUser(user) {
  try {
    persist.addUser(user);
    const allUsers = persist.getAllUsers();
    const result = allUsers.filter((u) => (u.id === user.id));
    return result
  } catch (err) {
    throw new Error(err);
  }
}

async function sendUsers(req, res, next) {
  //Send list of the users
  try {
    const allUsers = await getAllUsers();
    res.send(allUsers);
  } catch (error) {
    console.log(error);
    next(error);
  }
}
async function addAUser(req, res, next) {
  //Add a user
  try {
    const validate = ajv.compile(userSchema);
    const valid = validate(req.body) && req.body.isAdmin === false;
    if (!valid) {
      throw new Error("invalid input");
    }
    const allUsers = await getAllUsers();
    const newUser = req.body;
    let alreadyIn = false;

    for (let user of allUsers) {
      if (user.id === newUser.id) {
        alreadyIn = true;
      }
    }

    if (alreadyIn) {
      throw new Error("user already in system");
    }
    const result = await addUser(newUser);
    const date = new Date();
    persist.addLog(newUser.id, "signed up at" + date);
    res.send(result);
  } catch (error) {

    res.status(400);
    res.send(error.message);
  }
}


router.get("/", sendUsers);

router.post("/", addAUser);

const userSchema = S.object()
  .prop("id", S.string().required())
  .prop("password", S.string().required())
  .prop("fName", S.string().required())
  .prop("lName", S.string().required())
  .valueOf();

module.exports = { router, sendUsers, addAUser };
