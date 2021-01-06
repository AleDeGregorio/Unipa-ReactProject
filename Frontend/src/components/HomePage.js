import React from 'react';
import Carousello from './Carousel';
import './HomePage.css';
import {Card} from 'react-bootstrap'
//import { CardDeck } from 'react-bootstrap'
//import ProvaRicerca from '../ProvaRicerca/ProvaRicerca';
//import Carta from './Carta'
//import SecondaRicerca from '../secondaRicerca/secondaRicerca'
//import SearchPage from '../RicercaVecchia/SearchPage'
import RicercaFinale from './RicercaFinale'

function HomePage(){
    return(
        <div className="HomePage">
            <div className="ricerca">
                <RicercaFinale/>
            </div>
            <div className="scritta">
                <h1>Enjoy A Luxury Experience</h1>
            </div>
        </div>
    );
}

export default HomePage;
