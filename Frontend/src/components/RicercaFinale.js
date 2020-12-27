import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap'
import DatePicker from './InputDate';
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import './RicercaFinale.css'

const RicercaFinale = () => {
    
    const [focused, set_focused] = useState({
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
      };

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
}

export default RicercaFinale;