import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Redirect } from "react-router-dom";
import postToServer from "../lib/postToServer";
import setWithExpiry from "../lib/userSetterr";

function Login() {
  const appContext = useContext(AppContext);
  const [tempForm, setTempForm] = useState({});
  const [form, setForm] = useState();
  const [isFormIncomplete, setIsFormIncomplete] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [redirect, setRedirect] = useState(false);

  const setUser = appContext.setUser;

  const handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "remember") {
      if (tempForm.remember === "off") {
        value = "on"
      }
      else if (tempForm.remember === "on") {
        value = "off"
      }
    }
    setTempForm({ ...tempForm, [name]: value });
  };

  useEffect(() => {
    if (tempForm.id && tempForm.password) {
      setIsFormIncomplete(false);
    } else {
      setIsFormIncomplete(true);
    }
  }, [tempForm]);

  const handleSubmit = () => {
    setForm(tempForm);
  };

  const logUser = async () => {
    setErrorMessage(undefined);
    const userToLog = {
      id: form.id,
      password: form.password,
    };
    const res = await postToServer("login", userToLog);
    if (res.token) {
      localStorage.removeItem("user");
      if(form.remember === "on"){
        setWithExpiry("user", JSON.stringify(res), 10 * 24 * 60 * 60 * 1000);
      }else{
        setWithExpiry("user", JSON.stringify(res), 30 * 60 * 1000);
      }
      setUser(res);
      setRedirect(true);
    } else if (!res.token) {
      setIsFormIncomplete(true);
      setErrorMessage(res.errMessage);
    }
  };

  useEffect(() => {
    if (form) {
      logUser();
    }
  }, [form]);

  return (
    <>
      {redirect && <Redirect to="/members" />}
      <div>Login</div>
      <form autoComplete="off">
        <input type="hidden" value="something" />
        <div className="inputContent">
          <input
            autoComplete="off"
            className="customInput"
            type="text"
            placeholder="user name"
            name="id"
            value={tempForm.id}
            onChange={handleChangeInput}
          />
        </div>
        <div className="inputContent">
          <input
            autoComplete="off"
            className="customInput"
            type="password"
            placeholder="Password"
            name="password"
            value={tempForm.password}
            onChange={handleChangeInput}
          />
        </div>
        <div className="inputContent">
          <input
            className="customInput"
            type="checkbox"
            name="remember"
            checked={tempForm.remember === "on"}
            onChange={handleChangeInput}
          />
          Remember Me
        </div>
      </form>
      <div>
        <button
          disabled={isFormIncomplete}
          onClick={handleSubmit}
          className="btn btn-primary mt-2 mb-2"
          id="loginButton"
        >
          Log in!
        </button>
      </div>
      <div className="errorMessage">{errorMessage}</div>
    </>
  );
}

export default Login;
