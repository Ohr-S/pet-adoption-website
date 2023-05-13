const express = require("express");
const router = express.Router();
const persist = require("../databases/persist");
const { authenticationMid } = require("../middleware/authentication");
const { authAdminMid } = require("../middleware/authenticateAdmin");


async function getAllUsers(){
  const items = persist.getAllUsers();
  return items;
}

async function getAllLogs(){
  const items = persist.getAllLogs();
  return items;
}

async function getUsers(req,res,next) {
  try {
    const allUsers = await getAllUsers();
    res.send(allUsers);
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
}
async function getCart(req,res,next) {
  try{
    const userId = req.params.id;
    const allPets = await persist.getAllPets();
  
    const cart = allPets.filter((pet) => pet.ownerId === userId && pet.adoptionStatus === "In Cart");
    res.send(cart);

  }
  catch (error) {
    res.status(400);
    res.send(error.message);
  }
}
async function getLogs(req,res,next) {
  try{
    const allLogs = await getAllLogs();
    res.send(allLogs);

  }
  catch (error) {
    res.status(400);
    res.send(error.message);
  }
}

// Get all users
router.get("/", authAdminMid() ,getUsers);


//Get cart for user
router.get("/getCart/:id", authenticationMid(), getCart);

//Get logs for user
router.get("/log", authAdminMid() ,getLogs);

module.exports = {router,getUsers,getCart,getLogs};

