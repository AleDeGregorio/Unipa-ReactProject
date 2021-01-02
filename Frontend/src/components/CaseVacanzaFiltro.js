import React from "react";
import { useContext } from "react";
import { CasaVacanzaContext } from "../CasaVacanza/context";
import Title from "./title";
import { SingleDatePicker } from "react-dates";

import './CaseVacanzaFiltro.css'
// get all unique values
/*const getUnique = (items, value) => {
    if(items)
  return [...new Set(items.map(item => item[value]))];
};*/

class CaseVacanzaFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      case: this.props.case ? this.props.case : [],
      type: '',
      localita: this.props.case ? this.props.case.localita : '',
      posti: this.props.posti ? this.props.posti : 1,
      checkIn: this.props.checkIn ? this.props.checkIn : '',
      checkOut: this.props.checkIn ? this.props.checkOut : '',
      searchServizi: [],
      costo: 1000,
      minCosto: 0,
      maxCosto: 1000,
      minSize: '',
      maxSize: '',
      error: false,
      errorMessage: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value }, () => {
      this.props.onChange(this.state);
    });
  }

  onChangeServizi = (e) => {
    if(e.target.checked) {
      this.setState({
        searchServizi: [...new Set(this.state.searchServizi.concat(e.target.id).sort())]
      }, () => {
        this.props.onChangeServizi(this.state);
      });
    }
    else {
      var filtraServizi = this.state.searchServizi.filter(servizio => servizio !== e.target.id);

      this.setState({
        searchServizi: filtraServizi
      }, () => {
        this.props.onChangeServizi(this.state);
      });
    }
  }

  render() {
    return (
      <section className="filter-container">
        <form className="filter-form">
          {/* select type */}
          <div className="form-group">
            <label htmlFor="type">CasaVacanza type</label>
            <select
              name="type"
              id="type"
              onChange={this.handleChange}
              className="form-control"
            >
            </select>
          </div>
          {/* end of select type */}
          <div className="form-group">
            <label htmlFor="localita">Località</label>
            <input
              type = "text"
              name="localita"
              id="localita"
              onChange={this.handleChange}
              className="form-control"
              value = {this.state.localita}
            >
            </input>
          </div>
          {/* guests  */}
          <div className="form-group">
            <label htmlFor="posti">Ospiti</label>
            <select
              name="posti"
              id="posti"
              onChange={this.handleChange}
              className="form-control"
              value={this.state.posti}
            >
              <option></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          {/* end of guests */}
          {/* casaVacanza price */}
          <div className="form-group">
            <label htmlFor="costo">costo CasaVacanza €{this.state.costo}</label>
            <input
              type="range"
              step = "50"
              name="costo"
              min={this.state.minCosto}
              max={this.state.maxCosto}
              id="costo"
              onChange={this.handleChange}
              className="form-control"
              defaultValue = {this.state.costo}
            />
          </div>
          {/* end of casaVacanza price*/}
          {/* size */}
          <div className="form-group-size">
            <label htmlFor="price">room size </label>
            <div className="size-inputs">
              <input
                type="number"
                name="minSize"
                id = "minSize"
                onChange={this.handleChange}
                className="size-input"
                placeholder = "min"
                min = '1'
                max = '10'
              />
              <input
                type="number"
                name="maxSize"
                id = "maxSize"
                onChange={this.handleChange}
                className="size-input"
                placeholder = "max"
                min = '1'
                max = '10'
              />
            </div>
          </div>
          {/* end of select type */}
        </form>
        {/* extras */}
        <div className="form-group-extra">
          {this.props.servizi.map(item => {
            return(
              <div className="single-extra">
                <input
                  type="checkbox"
                  name={item.servizio}
                  id={item.servizio}
                  onChange={this.onChangeServizi}
                />
                <label htmlFor={item.servizio}>&nbsp;{item.servizio}</label>
              </div>
            )
          })}
          </div>
          {/* end of extras type */}
      </section>
    );
  }
};

/*const CaseVacanzaFilter = ({ caseVacanza }) => {
  // react hooks
  const context = useContext(CasaVacanzaContext);
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
      <form className="filter-form">
        {/* select type }
        <div className="form-group">
          <label htmlFor="type">CasaVacanza type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            className="form-control"
            value={type}
          >
            
          </select>
        </div>
        {/* end of select type }
        <div className="form-group">
          <label htmlFor="type">Località</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            className="form-control"
            value={type}
          >
          </select>
        </div>
        {/* guests  }
        <div className="form-group">
          <label htmlFor="capacity">Ospiti</label>
          <select
            name="capacity"
            id="capacity"
            onChange={handleChange}
            className="form-control"
            value={capacity}
          >
            <option></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        {/* end of guests }
        {/* casaVacanza price }
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
        {/* end of casaVacanza price}
        {/* size }
        <div className="form-group-size">
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
        {/* end of select type }
      </form>
      {/* extras }
      <div className="form-group-extra">
          <div className="single-extra">
            <input
              type="checkbox"
              name="wifi"
              id="wifi"
              checked={wify}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">Wi-Fi</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="animali"
              checked={ariaCondizionata}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">Animali ammessi</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="ariaCondizionata"
              checked={ariaCondizionata}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">Aria condizionata</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="parcheggio"
              checked={ariaCondizionata}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">Parcheggio gratuito</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="disabili"
              checked={ariaCondizionata}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">Accesso ospiti disabili</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="salute"
              checked={ariaCondizionata}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">Misure extra per la salute</label>
          </div>
        </div>
        {/* end of extras type }
    </section>
  );
};*/

export default CaseVacanzaFilter;
