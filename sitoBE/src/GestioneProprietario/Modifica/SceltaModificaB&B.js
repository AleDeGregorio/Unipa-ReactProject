import React from 'react';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import './SceltaModifica.css'
import {SiCashapp} from "react-icons/si";
import {RiAccountBoxLine} from "react-icons/ri";
import {Link} from 'react-router-dom'
import {Col} from 'react-bootstrap'

function SceltaModificaBeB(){
    return(
        <div className="carte_prop" >
        <Link to= "/ModificaB&B" className="LinK">
        <Card className="propScelta">
            <Card.Body>
            <Card.Title>Modifica struttura B&B</Card.Title>
            <Card.Text>Visualizza tutti e dati della casa ed eventualmente modifica</Card.Text>
            </Card.Body>
        </Card></Link>
        <Link to = "/ElencoListaStanze" className="LinK">
            <Card className="propScelta">
            <Card.Body>
            <Card.Title>Modifica stanze B&B</Card.Title>
            <Card.Text>modifica le caratteristiche delle tue stanze.</Card.Text>
            </Card.Body>
           </Card>
        </Link>
      </div>
        );
}
export default SceltaModificaBeB;