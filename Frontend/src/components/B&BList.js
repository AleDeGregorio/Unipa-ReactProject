import React from "react";
import CasaBandb from "./B&B";
const CaseBandbList = ({ caseBandb }) => {
  if (caseBandb.length === 0) {
    return (
      <div className="empty-search">
        <h3>unfortunately no rooms matched your search parameters</h3>
      </div>
    );
  }
  return (
    <section className="caseVacanzalist">
      <div className="caseVacanzalist-center">
        {caseBandb.map(item => {
          return <CasaBandb key={item.id} casaBandb={item} />;
        })}
      </div>
    </section>
  );
};

export default CaseBandbList;
