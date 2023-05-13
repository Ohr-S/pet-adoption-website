import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import adoptPet from "../lib/adoptPet";

function Checkout() {
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const [errorMessage, setErrorMessage] = useState();
  const setPetList = appContext.setPetList;
  const [cartPetList, setCartPetList] = useState();
  const history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:4000/user/getCart/${user.id}`, {
      headers: {
        Authorization: "Bearer " + user.token,
        id: user.id,
      },
    }).then((response) => {
      if (response.data.length === 0) {
        setErrorMessage("No Pet Found!");
      } else {
        setCartPetList(response.data);

      }
    });
  }, []);

  async function handleAdopt() {
    try {
      let result = [];
      for (let pet of cartPetList) {
        result = await adoptPet(pet.id, user);
      }
      setPetList(result);
      history.push('./Mypets');
    } catch (error) { }
  }




  return (
    <>
      <h1>Checkout</h1>
      <br />
      {errorMessage}
      <div className="list">
        {cartPetList && (
          <>
            {cartPetList.map((petItem) => {
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
                      <div>price: 50 ILS</div>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        )}
      </div>
      {cartPetList && (<button onClick={handleAdopt} className="btn btn-primary">
        Adopt Chosen Pets for {cartPetList.length * 50} ILS
      </button>)}
    </>
  );
}

export default Checkout;
