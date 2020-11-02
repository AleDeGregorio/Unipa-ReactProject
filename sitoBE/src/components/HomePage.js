import React from 'react';
import Carousello from './Carousel';
import './HomePage.css';
import {Card, CardDeck} from 'react-bootstrap'
import ProvaRicerca from '../ProvaRicerca/ProvaRicerca';
import SecondaRicerca from '../secondaRicerca/secondaRicerca'

function HomePage(){
    return(
        <div className="HomePage">
            <div>
                <ProvaRicerca/>
            </div>
            <div>
                <Carousello/>
            </div>
            <br/>
            <div>
            <CardDeck>
            <Card>
                <Card.Title>Le nostre case vacanza</Card.Title>
            </Card>
            <Card>
                <Card.Title>I nostri B&B</Card.Title>
            </Card>
            </CardDeck>
            </div>
        </div>
    );
}

export default HomePage;
