import React from "react";

import { Link } from "react-router-dom";
import CaseVacanzaContainer from "../components/CaseVacanzaContainer";
const CaseVacanza = () => {
  return (
    <>
      
          <Link to="/" className="btn-primary">
            return home
          </Link>
     
      <CaseVacanzaContainer />
    </>
  );
};

export default CaseVacanza;
