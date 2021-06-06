import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>page not found </h1>
      <Link to="/">
        <p>BACK HOME</p>
      </Link>
    </div>
  );
};

export default Error;
