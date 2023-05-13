import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import PetList from "./PetList";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

function Search() {
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const setPetList = appContext.setPetList; 
  const [searchQuery, setSearchQuery] = useState(
    new URLSearchParams(useLocation().search)
  );
  const history = useHistory();



  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    history.push({
      pathname: "/search",
      search:
        "?" +
        new URLSearchParams({
          name: searchQuery,
        }).toString(),
    });
    const id = user? user.id : "";
    axios
      .get(`http://localhost:4000/pet/`, {
        params: {"searchQuery" : searchQuery, "id" : id},
      })
      .then((response) => {
        setPetList(response.data);
      });
  };

  const handleShowAll = async () => {
    const id = user? user.id : "";
      axios
      .get(`http://localhost:4000/pet/all`, {
        params: {"id" : id},
      })
      .then((response) => {
        setPetList(response.data);
      });
  };


  return (
    <div>
      <h1>Find A New Friend</h1>
      <br />
      <div className="searchContainer">
        <div className="searchForm">
        <div>
          <input
            className="customInput"
            type="text"
            placeholder="Name"
            name="animalName"
            value={searchQuery}
            onChange={handleQueryChange}
          />
        </div>
          <div>
            <button onClick={handleSearch} className="btn btn-primary">
              Search
            </button>
            <button onClick={handleShowAll} className="btn btn-secondary">
              Show All
            </button>
          </div>
        </div>
      </div>
      <PetList />
    </div>
  );
}

export default Search;
