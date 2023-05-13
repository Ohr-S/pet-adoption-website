import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import AppContext from "../context/AppContext";
import axios from "axios";

function PetDash() {
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const [pets, setPets] = useState();

  useEffect(() => {
    getAllPets();
  }, []);

  async function handleRemove(petId) {
    try {
      axios
      .delete(`http://localhost:4000/pet/${petId}`, {
        headers: {
          Authorization: "Bearer " + user.token,
          id: user.id,
        },
      })
      .then((response) => {
        setPets(response.data);
      });
    } catch (error) {}
  }

  const getAllPets = async () => {
    axios
      .get(`http://localhost:4000/pet/allAdmin`, {
        headers: {
          Authorization: "Bearer " + user.token,
          id: user.id,
        },
      })
      .then((response) => {
        setPets(response.data);
      });
  };

  return (
    <div className="list">
      {pets && (
        <>
          {pets.map((petItem) => {
            return (
              <>
                <div key={petItem.UID} className="petItem">
                  <div className="petItemMeta">
                    <img className="petImage" src={`${petItem.imageUrl}`} alt="pet Img"/>

                    <div className="petItemInfo">
                      <div>
                        <h1>
                          {petItem.name.charAt(0).toUpperCase() +
                            petItem.name.slice(1)}
                        </h1>
                      </div>
                      <div>{petItem.breed}</div>
                      <div>{petItem.adoptionStatus}</div>
                      <div>{petItem.ownerId}</div>
                      <div className="petItemButtons">
                      <button
                            className="btn btn-secondary mb-1"
                            onClick={async () => {
                              handleRemove(petItem.id, user);
                            }}
                          >
                            Remove Pet
                          </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </>
      )}
    </div>
  );
}

export default PetDash;
