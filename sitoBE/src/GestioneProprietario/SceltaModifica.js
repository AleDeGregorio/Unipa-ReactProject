import React from 'react';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import './SceltaModifica.css'
import {SiCashapp} from "react-icons/si";
import {RiAccountBoxLine} from "react-icons/ri";
import {Link} from 'react-router-dom'
import {Col} from 'react-bootstrap'

function SceltaModifica(){
    return(
        <div className="row carte_prop" >
            <Col>
            <Link to= "/ElencoCasaVacanza">
        <Card className="propScelta">
            <Card.Title>Modifica Casa Vacanza</Card.Title>
            <Card.Text>Visualizza tutti e dati della casa ed eventualmente modifica</Card.Text>
        </Card></Link>
        </Col>
        <Col>
        <Link to = "/ElencoB&B" className="LinK">
            <Card className="propScelta">
            <Card.Body>
            <Card.Title>Modifica B&B</Card.Title>
            <Card.Text>modifica dati della struttura ed eventualmente le sue stanze.</Card.Text>
            </Card.Body>
           </Card>
        </Link>
        </Col>

      </div>
        );
}
export default SceltaModifica;