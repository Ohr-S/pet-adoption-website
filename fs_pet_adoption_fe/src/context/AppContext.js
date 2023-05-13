import React from "react";

const AppContext = React.createContext({
  errorMessage: "",
  setErrorMessage: "",
  user: "",
  setUser: "",
  petList: "",
  setPetList: "",
  redirectHome: "",
  setRedirectHome: "",
});

export default AppContext;
