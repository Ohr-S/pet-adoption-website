const fs = require ('fs');


let rawUserdata = fs.readFileSync("databases/users.json");
let userData = JSON.parse(rawUserdata);

let rawPetdata = fs.readFileSync("databases/pets.json");
let petData = JSON.parse(rawPetdata);

let rawLogdata = fs.readFileSync("databases/logs.json");
let logData = JSON.parse(rawLogdata);


function getAllUsers(){
    return userData;
}

function getAllPets(){
    return petData;
}

function getAllLogs(){
    return logData;
}

async function addLog(userId, action){
    try{
        changed = false;
        const idx = logData.findIndex((user) => user.id === userId);
        if(idx !== -1){
            logData[idx].logActions.push(action);
            changed = true;
        }
        if(changed){
            let newData = JSON.stringify(logData);
            fs.writeFileSync('databases/logs.json', newData);
        }
        return logData;
    } catch(err) {
        throw new Error(err);
    }
}
async function adoptPet(petNum, userId){
    try{
        changed = false;
        const idx = petData.findIndex((pet) => pet.id.toString() === petNum);
        if(petData[idx].ownerId === userId && petData[idx].adoptionStatus === "In Cart"){
            petData[idx].adoptionStatus = "Adopted";
            changed = true;
        }
        if(changed){
            let newData = JSON.stringify(petData);
            fs.writeFileSync('databases/pets.json', newData);
        }
        return petData;
    } catch(err) {
        throw new Error(err);
    }
}

async function savePetToCart(petNum, userId){
    try{
        changed = false;
        const petIdx = petData.findIndex((pet) => pet.id.toString() === petNum);
        const logIdx = logData.findIndex((user) => user.id === userId);
        if(petData[petIdx].ownerId === "" && petData[petIdx].adoptionStatus === "Available"){
            petData[petIdx].adoptionStatus = "In Cart";
            petData[petIdx].ownerId = userId;
            logData[logIdx].cartActions.push("added " + petData[petIdx].name);
            changed = true;
        }
        if(changed){
            let newPetData = JSON.stringify(petData);
            let newLogData = JSON.stringify(logData);
            fs.writeFileSync('databases/pets.json', newPetData);
            fs.writeFileSync('databases/logs.json', newLogData);
        }
        return petData;
    }catch(err) {
        throw new Error(err);
    }
}

async function removePetFromCart(petNum, userId){
    try{
        changed = false;
        const petIdx = petData.findIndex((pet) => pet.id.toString() === petNum);
        const logIdx = logData.findIndex((user) => user.id === userId);
        
        if(petData[petIdx].ownerId === userId && petData[petIdx].adoptionStatus === "In Cart"){
            petData[petIdx].adoptionStatus = "Available";
            petData[petIdx].ownerId = "";
            logData[logIdx].cartActions.push("removed " + petData[petIdx].name);
            changed = true;
        }
        if(changed){
            let newPetData = JSON.stringify(petData);
            let newLogData = JSON.stringify(logData);
            fs.writeFileSync('databases/pets.json', newPetData);
            fs.writeFileSync('databases/logs.json', newLogData);
        }
        return petData;
    }catch(err) {
        throw new Error(err);
    }
}

async function addPet(pet){
    try{
        petData.push(
            {
                "id" : petData.length,
                "breed" : pet.breed,
                "name" : pet.name,
                "height" : parseInt(pet.height),
                "weight" : parseInt(pet.weight),
                "imageUrl" : pet.imageUrl,
                "adoptionStatus" : "Available",
                "ownerId" : ""
            }
        );
        const newData = JSON.stringify(petData);
        fs.writeFileSync('databases/pets.json', newData);
        return newData;
    }catch(err) {
        throw new Error(err);
    }
}

async function removePet(petNum){
    try{
        changed = false;
        const petIdx = petData.findIndex((pet) => pet.id.toString() == petNum);
        
        if(petIdx !== -1){
            petData = petData.filter((pet) => pet.id.toString() !== petNum);
            changed = true;
        }
        if(changed){
            let newPetData = JSON.stringify(petData);
            fs.writeFileSync('databases/pets.json', newPetData);
        }
        return petData;
    }catch(err) {
        throw new Error(err);
    }
}

async function addUser(user){
    try{
        userData.push(
            {
            "id" : user.id,
            "password": user.password,
            "first_name": user.fName,
            "last_name": user.lName,
            "isAdmin" : "false"
            }
        );
        logData.push(
            {
                "id" : user.id,
                "cartActions": [],
                "logActions": []
            }
        )
        let newUserData = JSON.stringify(userData);
        let newLogData = JSON.stringify(logData);
        fs.writeFileSync('databases/users.json', newUserData);
        fs.writeFileSync('databases/logs.json', newLogData);
    }catch(err) {
        throw new Error(err);
    }
}

module.exports = { getAllUsers, getAllPets, getAllLogs, addLog, adoptPet, addPet, removePet, addUser , savePetToCart , removePetFromCart};