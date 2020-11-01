import React from 'react';
import Carousello from './Carousel';
import Carta from './Carta';
import './HomePage.css';
import ProvaRicerca from '../ProvaRicerca/ProvaRicerca';
import SecondaRicerca from '../secondaRicerca/secondaRicerca'

function HomePage(){
    return(
        <div className="HomePage">
            <div>
                <SecondaRicerca/>
            </div>
            <div>
                <Carousello/>
            </div>
            <br/>
            <div>
                    <Carta/>
            </div>
        </div>
    );
}

export default HomePage;
