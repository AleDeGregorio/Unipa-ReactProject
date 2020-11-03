import React from 'react'
import './GestionePrenotazione.css'
import {Card, CardColumn, Accordion, ListGroup, ListGroupItem, Button, Form, Col} from 'react-bootstrap'
class GestionePrenotazione extends React.Component{
    constructor(props){     //props : stati delle componenti parent
        super(props);
        this.state = {email:localStorage.getItem('email'),  //variabili di cui abbiamo bisogno
                        apiResponse: [] ,
                        error: false,
                        errorMessage: ''
                     }
                 }

    componentDidMount(){ //interrogazione che viene effettuata all'apertura della pagina
        const data = {ref_cliente: this.state.email}; //body richiesta http (in questo caso chiave primaria cioè ref_cliente)
        fetch('http://localhost:9000/searchPrenotazioneCliente/prenotazioneCliente',{ //metodo http in fetch
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(data)
        })
        .then((result)=>result.text())                  //risultato interrogazione 
        .then((result)=>{
            this.setState({apiResponse:JSON.parse(result)}); //rende array il risultato
            if (this.state.apiResponse.status==='error'){       //gestione errori
                this.setState({error:true, errorMessage:'this.state.apiResponse.message'});
            }
        })
   }
    nomeFunzione=(e)=>{
        const data = {}
    }
   
    render() {
         return(
            <div className="containerGP">
                <div>
                    <h1>Gestisci le tue prenotazioni</h1>
                    <h5>Le tue prenotazioni :</h5>
     {        this.state.apiResponse.map(((res)=>
                    <div className="containeracc">
                    <Accordion>
         <Card>
        <Card.Header>
        <div className="headcac">
        <p>{res.CAMPO}</p>
        <p>Check-in</p>
        <p>Check-out</p>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">Dettagli</Accordion.Toggle>
        </div>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
        <Card.Body>
        <h4>Dettagli struttura </h4>
        <Accordion>
            <div className="acc3">
            <Accordion.Toggle as={Button} onClick={this.nomeFunzione} variant="link" eventKey="1">Modifica data prenotazione</Accordion.Toggle>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">Elimina prenotazione</Accordion.Toggle>
            <Accordion.Toggle as={Button} variant="link" eventKey="3">Contatta il gestore</Accordion.Toggle>

            <Accordion.Collapse eventKey="1">
                <Form>
                <Form.Row>
   <Form.Group as={Col} controlId="formGridDate">
     <Form.Label>Data di inizio</Form.Label>
     <Form.Control type="date" placeholder="Inserisci data di inizio" />
   </Form.Group>
   <Form.Group as={Col} controlId="formGridDate1">
   <Form.Label>Data fine</Form.Label>
     <Form.Control type="date" placeholder="Inserisci data di inizio" />
   </Form.Group>
 </Form.Row>
            <Button>Modifica Data</Button>
                </Form>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="2">
                <div>
                <p>Sei sicuro di voler eliminare la tua prenotazione? Non riavrai indietro la caparra.</p>
                <Button>Conferma</Button>
                <Button>Annulla</Button>
                </div>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="3">
                <Form>
                    <Form.Row>
                    <Form.Group controlId="formGridContact">
                        <Form.Label>Inserisci email</Form.Label>
                        <Form.Control type="email" placeholder="Inserisci tua email" />
                        <Form.Label>Inserisci messaggio da inviare al gestore</Form.Label>
                        <Form.Control as="textarea" placeholder="Inserisci testo" />
                    </Form.Group>
                    </Form.Row>
                    <Button>Invia comunicazione</Button>
                </Form>
            </Accordion.Collapse>
            </div>
            </Accordion>
            </Card.Body>
    </Accordion.Collapse>

    </Card>
</Accordion>

                    </div>
               )) }   
                </div>
            </div>
    );
    }
}
export default GestionePrenotazione;