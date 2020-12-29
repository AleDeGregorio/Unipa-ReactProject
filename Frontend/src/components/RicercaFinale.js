import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap'
import DatePicker from './InputDate';
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import './RicercaFinale.css'

class RicercaFinale extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checkIn: null,
            checkOut: null,
            startDate: moment(),
            endDate: null,
            tipo: '',
            localita: '',
            posti: 1,
            apiResponse: [],
            error: false,
            errorMessage: ''
        }
    }

    set_focused_checkIn = (e) => {
        this.setState({ checkIn: e });
    }

    set_focused_checkOut = (e) => {
        this.setState({ checkOut: e });
    }

    setStartDate = (e) => {
        this.setState({ startDate: e });
    }

    setEndDate = (e) => {
        this.setState({ endDate: e });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            tipo: this.state.tipo,
            localita: this.state.localita,
            provincia: '',
            servizi: '',
            posti: this.state.posti,
            tariffa: ''
        };

        fetch('http://localhost:9000/ricercaAlloggio/risultati', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((result) => result.text())
        .then((result) => {
            console.log(JSON.parse(result));
            this.setState({ apiResponse: JSON.parse(result) });

            if(this.state.apiResponse.status === 'error') {
                this.setState({ error: true });
                this.setState({ errorMessage: this.state.apiResponse.message });
            }
            else {
                // redirect
            }
        });
    }
    
    /*const [focused, set_focused] = useState({
        checkIn: null,
        chceckOut: null
      });

    const [dates, set_dates] = useState({
        startDate: moment(),
        endDate: null
      });

    const setStartDate = startDate => {
        set_dates({
          ...dates,
          startDate
        });
      };
    
      const setEndDate = endDate => {
        set_dates({
          ...dates,
          endDate
        });
      }; */

    render() {
        return(
            <form onSubmit = {this.onSubmit}>
                <div class="product-search">
                    <div class="search-element">
                        <label class="search-label">Dove</label>
                        <input class="search-input" type="text" autocomplete="on" 
                            placeholder="Dove vuoi andare?" id = 'localita' name="localita" onChange = {this.onChange}
                        >
                        </input>
                    </div>
                    <div class="search-element">
                    <label class="search-label" htmlFor="start_date">Check-in</label>
                        <SingleDatePicker
                            class="search-element"
                            date={this.state.startDate}
                            onDateChange={date => this.setStartDate(date)}
                            focused={this.state.checkIn}
                            onFocusChange={({ focused }) => this.set_focused_checkIn(focused)}
                            id="start_date"
                            numberOfMonths={1}
                            placeholder="gg/mm/aaaa"
                            daySize={32}
                            hideKeyboardShortcutsPanel={true}
                            displayFormat="DD/MM/YYYY"
                            block={true}
                            verticalSpacing={8}
                            showClearDate={this.state.checkIn}
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
                            focused={this.state.checkOut}
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
                            showClearDate={this.state.checkOut}
                            reopenPickerOnClearDate={true}
                            noBorder={true}
                        />
                    </div>
                    <div class="search-element">
                        <label class="search-label">Tipo struttura</label>
                        <select class="search-input" placeholder="Struttura" id = 'tipo' name = 'tipo' onChange = {this.onChange}>
                            <option></option>
                            <option value="cv">Casa Vacanza</option>
                            <option value="bb">B&B</option>
                        </select>
                    </div>
                    <div class="search-element-ospiti">
                        <label class="search-label">Ospiti</label>
                        <select class="search-input-ospiti" placeholder="Ospiti" id = 'posti' name = 'posti' onChange = {this.onChange}>
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
                <button type="submit" class="search-button">Ricerca</button>
            </form>
        );
    }

    /*
    return(
        <form action="" method="get">
            <div class="product-search">
                <div class="search-element">
                    <label class="search-label">Dove</label>
                    <input class="search-input" type="text" autocomplete="on" placeholder="Dove vuoi andare?" name="query"></input>
                </div>
                <div class="search-element">
                <label class="search-label" htmlFor="start_date">Check-in</label>
                    <SingleDatePicker
                        class="search-element"
                        date={dates.startDate}
                        onDateChange={date => setStartDate(date)}
                        focused={focused.checkIn}
                        onFocusChange={({ focused }) =>
                        set_focused({
                            ...focused,
                            checkIn: focused
                        })
                        }
                        id="start_date"
                        numberOfMonths={1}
                        placeholder="gg/mm/aaaa"
                        daySize={32}
                        hideKeyboardShortcutsPanel={true}
                        displayFormat="DD/MM/YYYY"
                        block={true}
                        verticalSpacing={8}
                        showClearDate={focused.checkIn}
                        reopenPickerOnClearDate={true}
                        noBorder={true}
                    />
                </div>
                <div class="search-element">
                <label class="search-label" htmlFor="end_date">Check-out</label>
                    <SingleDatePicker
                        class="search-element"
                        date={dates.endDate}
                        onDateChange={date => setEndDate(date)}
                        focused={focused.checkOut}
                        onFocusChange={({ focused }) =>
                        set_focused({
                            ...focused,
                            checkOut: focused
                        })
                        }
                        id="end_date"
                        numberOfMonths={1}
                        placeholder="gg/mm/aaaa"
                        daySize={32}
                        hideKeyboardShortcutsPanel={true}
                        displayFormat="DD/MM/YYYY"
                        block={true}
                        isDayHighlighted={day =>
                        day.isAfter(dates.startDate) && day.isBefore(dates.endDate)
                        }
                        verticalSpacing={8}
                        anchorDirection="right"
                        isDayBlocked={day => day.isBefore(dates.startDate)}
                        showClearDate={focused.checkOut}
                        reopenPickerOnClearDate={true}
                        noBorder={true}
                    />
                </div>
                <div class="search-element">
                    <label class="search-label">Tipo struttura</label>
                    <select class="search-input" placeholder="Struttura">
                        <option></option>
                        <option value="CV">Casa Vacanza</option>
                        <option value="BnB">B&B</option>
                    </select>
                </div>
                <div class="search-element-ospiti">
                    <label class="search-label">Ospiti</label>
                    <select class="search-input-ospiti" placeholder="Ospiti">
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
            <button type="submit" class="search-button">Ricerca</button>
        </form>
    );
    */
}

export default RicercaFinale;