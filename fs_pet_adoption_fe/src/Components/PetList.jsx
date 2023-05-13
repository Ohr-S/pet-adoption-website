import React, { useContext} from "react";
import "../App.css";
import AppContext from "../context/AppContext";
import savePet from "../lib/savePet";
import deleteSavedPet from "../lib/deletSavedPet";


function PetList() {
  const appContext = useContext(AppContext);
  const petList = appContext.petList;
  const setPetList = appContext.setPetList;
  const user = appContext.user;



  async function handleSave(petId, user) {
    try {
      const result = await savePet(petId, user);
      if (!result.error) {
        setPetList(result);
      }
    } catch (error) {}
  }
  async function handleDelete(petId, user) {
    try {
      const result = await deleteSavedPet(petId, user);
      if (!result.error) {
        setPetList(result);
      }
    } catch (error) {}
  }


  return (
    <div className="list">
      {petList && (
        <>
          {petList.map((petItem) => {
            return (
              <div key={petItem.UID} className="petItem">
                <div className="petItemMeta">
                  <img className="petImage" src={`${petItem.imageUrl}`} alt="pet Img" />

                  <div className="petItemInfo">
                    <div>
                      <h1>
                        {petItem.name.charAt(0).toUpperCase() +
                          petItem.name.slice(1)}
                      </h1>
                    </div>
                    <div>{petItem.breed}</div>
                    <div>{petItem.adoptionStatus}</div>
                    <div className="petItemButtons">
                      {user &&
                        user.savedPets &&
                        user.savedPets.includes(petItem.seqNumber) && (
                          <span
                            className="fa fa-star checked"
                            onClick={async () => {
                              handleDelete(petItem.seqNumber, user);
                            }}
                          ></span>
                        )}
                      {user && petItem.adoptionStatus === "Available" && (
                        <>
                          {" "}
                          <button
                            className="btn btn-secondary mb-1"
                            onClick={async () => {
                              handleSave(petItem.id, user);
                            }}
                          >
                            Add To Cart
                          </button>
                        </>
                      )}
                      {user && petItem.adoptionStatus === "In Cart" && (
                        <>
                          {" "}
                          <button
                            className="btn btn-secondary mb-1"
                            onClick={async () => {
                              handleDelete(petItem.id, user);
                            }}
                          >
                            Remove From Cart
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default PetList;
