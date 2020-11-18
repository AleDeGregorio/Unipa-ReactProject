import React from "react";
import { useContext } from "react";
import { CasaBandbContext } from "../B&B/context";
import Title from "./title";
// get all unique values
const getUnique = (items, value) => {
    if(items)
  return [...new Set(items.map(item => item[value]))];
};

const CaseBandbFilter = ({ caseBandb }) => {
  // react hooks
  const context = useContext(CasaBandbContext);
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    wify,
    ariaCondizionata
  } = context;

  // get unique types

  // get unique capacity

  return (
    <section className="filter-container">
      <Title title="search caseVacanza" />
      <form className="filter-form">
        {/* select type */}
        <div className="form-group">
          <label htmlFor="type">CasaBandb type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            className="form-control"
            value={type}
          >
            
          </select>
        </div>
        {/* end of select type */}
        {/* guests  */}
        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select
            name="capacity"
            id="capacity"
            onChange={handleChange}
            className="form-control"
            value={capacity}
          >
            
          </select>
        </div>
        {/* end of guests */}
        {/* casaVacanza price */}
        <div className="form-group">
          <label htmlFor="price">prezzo CasaVacanza ${price}</label>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            id="price"
            value={price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* end of casaVacanza price*/}
        {/* size */}
        <div className="form-group">
          <label htmlFor="price">room size </label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              value={minSize}
              onChange={handleChange}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              value={maxSize}
              onChange={handleChange}
              className="size-input"
            />
          </div>
        </div>
        {/* end of select type */}
        {/* extras */}
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="wifi"
              id="breakfast"
              checked={wify}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="ariaCondizionata"
              checked={ariaCondizionata}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">pets</label>
          </div>
        </div>
        {/* end of extras type */}
      </form>
    </section>
  );
};

export default CaseBandbFilter;
