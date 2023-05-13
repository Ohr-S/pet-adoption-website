const express = require("express");
const router = express.Router();
const Ajv = require("ajv").default;
const ajv = new Ajv();
const S = require("fluent-json-schema");
const { authenticationMid } = require("../middleware/authentication");
const { authAdminMid } = require("../middleware/authenticateAdmin");
const persist = require("../databases/persist");

async function getAllPets() {
  const items = persist.getAllPets();
  return items;
}

async function removePet(petNum) {
  try {

    const pets = persist.removePet(petNum);

    return pets;
  } catch (err) {
    throw new Error(err);
  }
}

async function adoptPet(petNum, userId) {
  try {
    const pets = await persist.adoptPet(petNum, userId);
    let filteredPets = pets.filter((pet) => (pet.adoptionStatus === "Available" || (pet.adoptionStatus === "In Cart" && pet.ownerId == userId)));
    return (filteredPets);
  } catch (err) {
    throw new Error(err);
  }
}

async function addPet(pet) {
  try {
    persist.addPet(pet);
  } catch (err) {
    throw new Error(err);
  }
}
async function search(req, res, nextStep) {
  try {
    const pets = await getAllPets();
    const userId = req.query.id;
    let filteredPets = pets.filter((pet) => pet.name.toLowerCase().includes(req.query.searchQuery.toLowerCase())
      && (pet.adoptionStatus === "Available" || (pet.adoptionStatus === "In Cart" && pet.ownerId === userId)));

    res.send(filteredPets);
  } catch (error) {
    nextStep(error);
  }
}
async function all(req, res, nextStep) {
  try {
    const pets = await getAllPets();
    const userId = req.query.id;
    let filteredPets = pets.filter((pet) => (pet.adoptionStatus === "Available" || (pet.adoptionStatus === "In Cart" && pet.ownerId == userId)));
    res.send(filteredPets);
  } catch (error) {
    nextStep(error);
  }
}
async function allAdmin(req, res, nextStep) {
  try {
    const pets = await getAllPets();
    res.send(pets);
  } catch (error) {
    nextStep(error);
  }
}
async function deletePet(req, res, nextStep) {
  try {
    const petId = req.params.id;
    const pets = await removePet(petId);
    res.send(pets);
  } catch (error) {
    nextStep(error);
  }
}
async function postPet(req, res, nextStep) {
  try {
    const validate = ajv.compile(petSchema);
    const valid = validate(req.body);
    if (!valid) {
      throw new Error("invalid input");
    }
    const newPet = req.body;


    await addPet(newPet);
    res.send("success");
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
}

async function getPetById(req, res, nextStep) {
  try {
    const petId = req.params.id;
    const allPets = persist.getAllPets();
    const chosenPet = allPets.filter((pet) => pet.id === petId);
    res.send(chosenPet);
  } catch (error) {
    nextStep(error);
  }
}
async function getPetByIdUser(req, res, nextStep) {
  try {
    const userId = req.params.id;
    const allPets = persist.getAllPets();
    const userPets = allPets.filter((pet) => pet.ownerId === userId && pet.adoptionStatus === "Adopted");
    res.send(userPets);
  } catch (error) {
    nextStep(error);
  }
}
async function adoptPetById(req, res, nextStep) {
  try {
    const petId = req.params.id;
    const userId = req.headers.id;
    const adoption = await adoptPet(petId, userId);
    let filteredPets = adoption.filter((pet) => (pet.adoptionStatus === "Available" || (pet.adoptionStatus === "In Cart" && pet.ownerId == userId)));
    res.send(filteredPets);
  } catch (error) {
    nextStep(error);
  }
}
async function savePetCart(req, res, nextStep) {
  try {
    const petId = req.params.id;
    const userId = req.headers.id;
    try {
      const result = await persist.savePetToCart(petId, userId);
      const filtered = result.filter((pet) => (pet.adoptionStatus === "Available" || (pet.adoptionStatus === "In Cart" && pet.ownerId === userId)));
      res.send(filtered);
    } catch (error) {
      throw new Error(error);
    }
  } catch (error) {
    nextStep(error);
  }
}
async function removePetCart(req, res, nextStep) {
  try {
    const petId = req.params.id;
    const userId = req.headers.id;
    try {
      const result = await persist.removePetFromCart(petId, userId);
      const filtered = result.filter((pet) => (pet.adoptionStatus === "Available" || (pet.adoptionStatus === "In Cart" && pet.ownerId === userId)));
      res.send(filtered);
    } catch (error) {
      throw new Error(error);
    }
  } catch (error) {
    nextStep(error);
  }
}

// Main Search
router.get("/", search);

// Get all pets for adoption
router.get("/all", all);


// Get all pets (admin)
router.get("/allAdmin", authAdminMid(), allAdmin);

router.delete("/:id", authAdminMid(), deletePet);

//Add a pet
router.post("/", authAdminMid(), postPet);


// Get pet by ID
router.get("/:id", getPetById);

// Get all pets of specific user by user ID
router.get("/user/:id", authenticationMid(), getPetByIdUser);

// Adopt pet
router.post("/:id/adopt", authenticationMid(), adoptPetById);


// Save pet to Cart
router.post("/:id/save", authenticationMid(), savePetCart);

// Remove pet from Cart
router.delete("/:id/save", authenticationMid(), removePetCart);

const petSchema = S.object()
  .prop("name", S.string().required())
  .prop("breed", S.string().required())
  .prop("height", S.string().required())
  .prop("weight", S.string().required())
  .prop("imageUrl", S.string().required())
  .valueOf();

module.exports = {
  router, search, all, allAdmin,
  deletePet, postPet, getPetById, getPetByIdUser, adoptPetById,
  savePetCart, removePetCart
};

