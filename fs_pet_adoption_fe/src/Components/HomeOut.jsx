import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import AppContext from "../context/AppContext";

function HomeOut() {
  const appContext = useContext(AppContext);
  const [redirect, setRedirect] = useState(false);

  const user = appContext.user;

  useEffect(() => {
    if (user) {
      setRedirect(true);
    } else if (!user) {
      setRedirect(false);
    }
  }, [user]);

  return (
    <>
      {redirect && <Redirect to="/members" />}
      <div className="mainPageHeader">
        <span className="siteTitle">Pet&Go</span>
        <span className="siteSubTitle">
          The Premire Place For Dog Adoption
        </span>
      </div>
      <div>
        <br />
        <h4>
          There are a lot of dogs who need forever homes, and this is your
          chance to give it to them.
        </h4>
        <h4> We will handle all the logistics for you, you just need to choose your new best friend!</h4>
      </div>
    </>
  );
}

export default HomeOut;
