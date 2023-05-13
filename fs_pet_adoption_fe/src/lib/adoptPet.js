import axios from "axios";

async function adoptPet(petId, user) {
  return axios
    .post(`http://localhost:4000/pet/${petId}/adopt`, user, {
      headers: {
        Authorization: "Bearer " + user.token,
        id: user.id,
      },
    })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => {
      return { error: error, errMessage: error.response.data };
    });
}
export default adoptPet;
