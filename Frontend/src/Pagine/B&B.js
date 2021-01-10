import React from "react";

import { Link } from "react-router-dom";
import AlloggiContainer from "../components/AlloggiContainer";
const CaseVacanza = () => {
  return (
    <>
      
          <Link to="/" className="btn-primary">
            return home
          </Link>
     
      <AlloggiContainer />
    </>
  );
};

export default CaseVacanza;
