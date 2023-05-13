import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../context/AppContext";
import axios from "axios";
import deleteSavedPet from "../lib/deletSavedPet";

function Cart() {
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const [errorMessage, setErrorMessage] = useState();
  const [cartPetList, setCartPetList] = useState();
  const setPetList = appContext.setPetList; 
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

  async function handleDelete(petId, user) {
    try {
      const result = await deleteSavedPet(petId, user);
      if (!result.error) {
        const newList = cartPetList.filter((pet) => pet.id !== petId);
        setCartPetList(newList);
        setPetList(result);
        
      }
    } catch (error) {}
  }

  const handleCheckout = () => {
    history.push ('./Checkout');
 }   


  return (
    <>
      <h1>Cart</h1>
      <br />
      {errorMessage}
      <div className="list">
        {cartPetList && (
          <>
            {cartPetList.map((petItem) => {
              return (
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
                      <div className="petItemButtons">
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
      <div>
          <button onClick={handleCheckout} className="btn btn-primary">
            Checkout
          </button>
      </div>
    </>
  );
}

export default Cart;
