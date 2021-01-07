import React from "react";
import { SingleDatePicker } from "react-dates";
import './CaseVacanzaFiltro.css'
import moment from "moment";

class CaseVacanzaFilter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      case: this.props.case ? this.props.case : [],
      tipo: this.props.tipo ? this.props.tipo : '',
      localita: this.props.localita ? this.props.localita : '',
      posti: this.props.posti ? this.props.posti : 1,
      checkIn: this.props.checkIn ? this.props.checkIn : '',
      checkOut: this.props.checkOut ? this.props.checkOut : '',
      checkInFocus: null,
      checkOutFocus: null,
      startDate: this.props.checkIn ? moment(this.props.checkIn, "DD-MM-YYYY") : null,
      endDate: this.props.checkOut ? moment(this.props.checkOut, "DD-MM-YYYY") : null,
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

  componentDidMount() {
    var ngiorni = this.state.endDate.diff(this.state.startDate, 'days');

    if(ngiorni < 1) {
      ngiorni = 1;
    }

    this.setState({
      maxCosto: ngiorni * 150,
      costo: ngiorni*150
    })
  }

  set_focused_checkIn = (e) => {
    this.setState({ checkInFocus: e });
  }

  set_focused_checkOut = (e) => {
      this.setState({ checkOutFocus: e });
  }

  setStartDate = (e) => {
    this.setState({ startDate: e }, () => {

      var ngiorni = this.state.endDate.diff(this.state.startDate, 'days');

      if(ngiorni > 1) {
        ngiorni = 1;

        this.setState({
          maxCosto: ngiorni * 150,
          costo: ngiorni*150
        }, () => {
          this.props.onChange(this.state);
        });
      }
      
      if(this.state.startDate.isAfter(this.state.endDate)) {
        this.setState({ endDate: this.state.startDate.add(1, 'days'), startDate: this.state.startDate.subtract(1, 'days') }, () => {
          var ngiorni = this.state.endDate.diff(this.state.startDate, 'days');

          this.setState({
            maxCosto: ngiorni * 150,
            costo: ngiorni*150
          }, () => {
            this.props.onChange(this.state);
          })
        })
      }
    });
  }

  setEndDate = (e) => {
      this.setState({ endDate: e }, () => {
        var ngiorni = this.state.endDate.diff(this.state.startDate, 'days');

        if(ngiorni < 1) {
          ngiorni = 1;
        }

        this.setState({
          maxCosto: ngiorni * 150,
          costo: ngiorni*150
        }, () => {
          this.props.onChange(this.state);
        })
      });
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
        <div class="product-search">
                    <div class="search-element">
                        <label class="search-label">Località</label>
                        <input class="search-input" type="text" autocomplete="on" 
                          placeholder="Località" id = 'localita' name="localita" onChange = {this.handleChange} defaultValue = {this.state.localita}
                        >
                        </input>
                    </div>
                    <div class="search-element">
                    <label class="search-label" htmlFor="start_date">Check-in</label>
                        <SingleDatePicker
                            class="search-element"
                            date={this.state.startDate}
                            onDateChange={date => this.setStartDate(date)}
                            focused={this.state.checkInFocus}
                            onFocusChange={({ focused }) => this.set_focused_checkIn(focused)}
                            id="start_date"
                            numberOfMonths={1}
                            placeholder="gg/mm/aaaa"
                            daySize={32}
                            hideKeyboardShortcutsPanel={true}
                            displayFormat="DD/MM/YYYY"
                            block={true}
                            verticalSpacing={8}
                            showClearDate={this.state.checkInFocus}
                            reopenPickerOnClearDate={true}
                            noBorder={true}
                        />
                    </div>
                    <div class="search-element">
                    <label class="search-label" htmlFor="end_date">Check-out</label>
                        <SingleDatePicker
                            class="search-element"
                            date={this.state.endDate}
                            onDateChange={date => this.setEndDate(date)}
                            focused={this.state.checkOutFocus}
                            onFocusChange={({ focused }) => this.set_focused_checkOut(focused)}
                            id="end_date"
                            numberOfMonths={1}
                            placeholder="gg/mm/aaaa"
                            daySize={32}
                            hideKeyboardShortcutsPanel={true}
                            displayFormat="DD/MM/YYYY"
                            block={true}
                            isDayHighlighted={day =>
                                day.isAfter(this.state.startDate) && day.isBefore(this.state.endDate)
                            }
                            verticalSpacing={8}
                            anchorDirection="right"
                            isDayBlocked={day => day.isBefore(this.state.startDate)}
                            showClearDate={this.state.checkOutFocus}
                            reopenPickerOnClearDate={true}
                            noBorder={true}
                        />
                    </div>
                    <div class="search-element">
                        <label class="search-label">Tipo struttura</label>
                        <select class="search-input" placeholder="Struttura" id = 'tipo' name = 'tipo' onChange = {this.handleChange} defaultValue = {this.state.tipo}>
                            <option></option>
                            <option value="cv">Casa Vacanza</option>
                            <option value="bb">B&B</option>
                        </select>
                    </div>
                    <div class="search-element-ospiti">
                        <label class="search-label">Ospiti</label>
                        <select class="search-input-ospiti" placeholder="Ospiti" id = 'posti' name = 'posti' onChange = {this.handleChange} defaultValue = {this.state.posti}>
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
                  </div>
          {/* end of casaVacanza price*/}
          {/* end of select type */}
        </form>
        {/* extras */}
        <div className="form-gruppo">
            <label htmlFor="costo">Costo €{this.state.costo}</label>
              <input
                type="range"
                step = "20"
                name="costo"
                min={this.state.minCosto}
                max={this.state.maxCosto}
                id="costo"
                onChange={this.handleChange}
                className="form-control"
                defaultValue = {this.state.costo}
              />
        </div>
        <div className="form-gruppo-extra">
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
