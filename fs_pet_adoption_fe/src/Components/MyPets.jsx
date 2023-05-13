import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";

function MyPets() {
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const [errorMessage, setErrorMessage] = useState();
  const [petList, setPetList] = useState();
  useEffect(() => {
    axios.get(`http://localhost:4000/pet/user/${user.id}`, {
      headers: {
        Authorization: "Bearer " + user.token,
        id: user.id,
      },
    }).then((response) => {
      if (response.data.length === 0) {
        setErrorMessage("No Pet Found!");
      } else {
        setPetList(response.data);
      }
    });
  }, []);
  return (
    <>
      <h1>My Pets</h1>
      <br />
      {errorMessage}
      <div className="list">
        {petList && (
          <>
            {petList.map((petItem) => {
              return (
                <>
                  <div key={petItem.id} className="petItem">
                    <div className="petItemMeta">
                      <img className="petImage" src={`${petItem.imageUrl}`} alt="pet Img" />
                      <div>
                        <h1>
                          {petItem.name.charAt(0).toUpperCase() +
                            petItem.name.slice(1)}
                        </h1>
                      </div>
                      <div>{petItem.breed}</div>
                      <div>{petItem.adoptionStatus}</div>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

export default MyPets;
