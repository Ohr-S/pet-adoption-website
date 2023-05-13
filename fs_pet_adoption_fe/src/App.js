import "./App.css";
import HomeOut from "./Components/HomeOut";
import HomeIn from "./Components/HomeIn";
import Search from "./Components/Search";
import Admin from "./Components/Admin";
import Cart from "./Components/Cart";
import Gallery from "./Components/Gallery";
import DogTips from "./Components/DogTips";
import Testimonials from "./Components/Testimonials";
import Checkout from "./Components/Checkout";
import Nav from "./Components/Nav";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppContext from "./context/AppContext";
import PrivateRoute from "./Components/PrivateRoute";
import AdminRoute from "./Components/AdminRoute";
import MyPets from "./Components/MyPets";
import getWithExpiry from "./lib/userGetter";

function App() {
  const userToSet = JSON.parse(getWithExpiry("user")) || undefined;
  const [errorMessage, setErrorMessage] = useState();
  const [user, setUser] = useState();
  const [petList, setPetList] = useState();
  const [redirectHome, setRedirectHome] = useState(false);

  useEffect(() => {
    if (userToSet) {
      setUser(userToSet);
    }
  }, []);
  
  return (
    <div className="App">
      <AppContext.Provider
        value={{
          errorMessage: errorMessage,
          setErrorMessage: setErrorMessage,
          user: user,
          setUser: setUser,
          petList: petList,
          setPetList: setPetList,
          redirectHome: redirectHome,
          setRedirectHome: setRedirectHome,
        }}
      >
        <Router>
          <Nav />
          <Switch>
            <Route path="/search" component={Search} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/testimonials" component={Testimonials} />
            <Route path="/dogtips" component={DogTips} />
            <Route exact path="/" component={HomeOut} />
            <PrivateRoute exact path="/mypets" component={MyPets} />
            <PrivateRoute exact path="/Cart" component={Cart} />
            <PrivateRoute exact path="/Checkout" component={Checkout} />
            <PrivateRoute exact path="/members" component={HomeIn} />
            <AdminRoute exact path="/admin" component={Admin} />
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
