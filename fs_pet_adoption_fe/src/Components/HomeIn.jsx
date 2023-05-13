import React, { useContext } from "react";
import AppContext from "../context/AppContext";

function HomeIn() {
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <>
      <div className="mainPageHeader">
        <span className="siteTitle">Pet&Go</span>
        <span className="siteSubTitle">
          The Premire Place For Dog Adoption
        </span>
      </div>
      <br />
      <div>
        <span style={{ color: "steelblue" }} className="siteSubTitle">
          Welcome {fullName}
        </span>
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

export default HomeIn;
