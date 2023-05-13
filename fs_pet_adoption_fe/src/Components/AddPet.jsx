import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import dogBreeds from "../Databases/DogBreeds";
import axios from "axios";

function AddPet() {
  const [animalTempForm, setAnimalTempForm] = useState({});
  const [finalForm, setFinalForm] = useState();
  const [isFormIncomplete, setIsFormIncomplete] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const appContext = useContext(AppContext);
  const user = appContext.user;



  const handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setAnimalTempForm({
      ...animalTempForm,
      [name]: value,
    });
  };

  const addNewPet = async () => {
    const res = await axios.post(`http://localhost:4000/pet`, finalForm, {
      headers: {
        Authorization: "Bearer " + user.token,
        id: user.id,
      },
    });
    if (res.data && res.data === "success") {
      setErrorMessage("Pet Added Successfully!");
      setIsFormIncomplete(true);
    } else {
      setIsFormIncomplete(true);
      setErrorMessage(res.errMessage);
    }
  };

  useEffect(() => {
    if (
      animalTempForm.breed &&
      animalTempForm.breed !== "Breed" &&
      animalTempForm.height &&
      animalTempForm.weight &&
      animalTempForm.name &&
      animalTempForm.imageUrl
    ) {
      setIsFormIncomplete(false);
    } else {
      setIsFormIncomplete(true);
    }
  }, [animalTempForm]);

  useEffect(() => {
    if (finalForm) {
      addNewPet();
    }
  }, [finalForm]);

  const handleSubmit = () => {
    setFinalForm(animalTempForm);
  };

  return (
    <>
      <div>
        <h2>Add New Pet!</h2>
      </div>
      <div className="addPetContainer">
        <div>
          <select
            name="breed"
            value={animalTempForm.breed}
            onChange={handleChangeInput}
            className="customInput"
          >
            <option selected="" class="custom-select">
              Breed
            </option>
              <>
                {dogBreeds.map((breed) => {
                  return <option value={breed.name}>{breed.name}</option>;
                })}
              </>
          </select>
        </div>
        <div>
          <input
            type="number"
            className="numInput"
            placeholder="Height In CM"
            name="height"
            value={animalTempForm.height}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <input
            type="number"
            className="numInput"
            placeholder="Weight In Kg"
            name="weight"
            value={animalTempForm.weight}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <input
            type="text"
            className="customInput"
            placeholder="Name"
            name="name"
            value={animalTempForm.name}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <input
            type="text"
            className="customInput"
            placeholder="Image URL"
            name="imageUrl"
            value={animalTempForm.imageUrl}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <button
            disabled={isFormIncomplete}
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="errorMessage">{errorMessage}</div>
    </>
  );
}

export default AddPet;
