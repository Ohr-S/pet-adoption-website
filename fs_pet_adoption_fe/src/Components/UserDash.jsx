import React, { useContext, useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import AppContext from "../context/AppContext";
import axios from "axios";

function UserDash() {
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const [errorMessage, setErrorMessage] = useState();
  const [userList, setUserList] = useState();
  const [filteredUserList, setFilteredUserList] = useState();
  const [expandedUser, setExpandedUser] = useState();
  const [userPetList, setUserPetList] = useState();
  const [userLogList, setUserLogList] = useState();
  const [searchQuery, setSearchQuery] = useState();


  const getUsers = () => {
    axios
      .get(`http://localhost:4000/user`, {
        headers: {
          Authorization: "Bearer " + user.token,
          id: user.id,
        },
      })
      .then((response) => {
        if (response.data.length === 0) {
          setErrorMessage("No Users Found!");
        } else {
          setUserList(response.data);
          setFilteredUserList(response.data);
        }
      });
  };

  const getPets = (id) => {
    axios.get(`http://localhost:4000/pet/user/${id}`, {
      headers: {
        Authorization: "Bearer " + user.token,
        id: user.id,
      },
    }).then((response) => {
      if (response.data.length !== 0) {
        setUserPetList(response.data);
      } else {
        setUserPetList(null);
      }
    });
  };


  const getLogs = () => {
    axios.get(`http://localhost:4000/user/log`, {
      headers: {
        Authorization: "Bearer " + user.token,
        id: user.id,
      },
    }).then((response) => {
      if (response.data.length !== 0) {
        setUserLogList(response.data);
      } else {
        setUserLogList(null);
      }
    });
  };

  const expandCard = (id) => {
    getPets(id);
    setExpandedUser(id);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getLogs();
  }, []);

  useEffect(() => {
    if(userList){
      setFilteredUserList(userList.filter((user) => user.id.toLowerCase().includes(searchQuery.toLowerCase())))
    }
  }, [searchQuery]);

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const generateLogs = (userLogs) => {
    return (<>
      {userLogs.map((log) => {
        return (
          <>
          {log}
          <br/>
          </>
        )
      })}
    </>)
  }


  return (
    <>
      {errorMessage}
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
      <div className="userList">
        {filteredUserList && userLogList &&(
          <>
            {filteredUserList.map((userItem) => {
              return (
                <>
                  <div key={userItem.id} className="userCard">
                    <div
                      className="userItem"
                      onClick={async () => {
                        expandCard(userItem.id);
                      }}
                    >
                      <div className="userSection">
                        <p className="userSectionHead">ID</p>
                        <p>{userItem.id}</p>
                      </div>
                      <div className="userSection">
                        <p className="userSectionHead">NAME</p>
                        <p>{userItem.first_name}</p>
                        <p>{userItem.last_name}</p>
                      </div>
                      <div className="userSection">
                        <p className="userSectionHead">Cart Actions</p>
                        <p className="userSenctionContent">{generateLogs(userLogList[userLogList.findIndex((user)=> user.id === userItem.id)].cartActions)}</p>
                      </div>
                      <div className="userSection">
                        <p className="userSectionHead">Log Actions</p>
                        <p className="userSenctionContent">{generateLogs(userLogList[userLogList.findIndex((user)=> user.id === userItem.id)].logActions)}</p>
                      </div>
                      <div className="userSection" style={{ borderRight: 0 }}>
                        <p className="userSectionHead">Role</p>
                        {userItem.isAdmin === "true" && <p>Admin</p>}
                        {userItem.isAdmin !== "true" && <p>User</p>}
                      </div>
                    </div>
                    {expandedUser === userItem.id && (
                      <div className="userCardPets">
                        <p>Owned Pets</p>
                        {userPetList &&
                          userPetList.length > 0 &&
                          userPetList.map((petItem) => {
                            return (
                              <div className="userCardPetList">
                                <div key={petItem.id}>
                                  <div
                                    className="userPetId"
                                    to={`/Pet/${petItem.id}`}
                                  >
                                    <img
                                      className="userPetImage"
                                      src={`${petItem.imageUrl}`}
                                    />
                                    <p>{petItem.name}</p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
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

export default UserDash;
