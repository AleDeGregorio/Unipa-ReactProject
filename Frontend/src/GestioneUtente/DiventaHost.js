import React from 'react'
import {Card, CardDeck, Form, Jumbotron, Button, Accordion} from 'react-bootstrap'
import './DiventaHost.css'

class DiventaHost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: localStorage.getItem("email"),
            password: localStorage.getObj("user_data")[0].password_cl,
            nome: localStorage.getObj("user_data")[0].nome_cl,
            cognome: localStorage.getObj("user_data")[0].cognome_cl,
            nascita: localStorage.getObj("user_data")[0].data_nascita_cl,
            num_documento: '',
            telefono: localStorage.getObj("user_data")[0].telefono_cl,
            apiResponse: [],
            error: false,
            errorMessage: '',
            empty: false,
            success: false
        }
    }

    onChange = (e) => {
        this.setState({ num_documento: e.target.value });
    }

    onSubimit = (e) => {
        e.preventDefault();

        const data = {
            email: this.state.email,
            password: this.state.password,
            nome: this.state.nome,
            cognome: this.state.cognome,
            nascita: this.state.nascita,
            num_documento: this.state.num_documento,
            telefono: this.state.telefono
        }

        fetch('http://localhost:9000/insertProprietarioCliente/newPropCl', {
            method: "POST",
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((result) => result.text())
        .then((result)=>{
            this.setState({ apiResponse:JSON.parse(result) });
            var res = JSON.parse(result);

            if(res.length < 1 || (res.code && res.code === 404)) {
              this.setState({ empty: true, errorMessage: res.message });
            }
      
            else if(this.state.apiResponse.status === 'error') {
              this.setState({ error: true });
              this.setState({ errorMessage: this.state.apiResponse.message });
            }
            else {
                this.setState({ success: true })
            }
        });
    }

    render() {
        return(
            <div className="containerDH">
                <div className="top">
                <div className="containerFormDH">
                    
                    <h4>Inserisci i dati mancanti e inizia a registrare la tua prima struttura!</h4>
                        <Form className="formDH">
                            <Form.Group controlId="formBasicDocument">
                                <Form.Label className="colorLabel">Scegli tipo di documento</Form.Label>
                                <Form.Control as="select" id="form-select" placeholder="Scegli documento">
                                    <option></option>
                                    <option>Carta d'identità</option>
                                    <option>Tessera sanitaria</option>
                                    <option>Passaporto</option>
                                    <option>Patente</option>
                                </Form.Control>
                                <Form.Label className="colorLabel">Inserisci numero documento</Form.Label>
                                <Form.Control as = "input" id="form-select1" onChange = {this.onChange} placeholder = "Numero documento" />
                            </Form.Group>
                            <Button id="dhbutton" onClick = {this.onSubimit}>Diventa un Host</Button>
                        </Form>
                        
                </div>
                <div className="jumbo">
                    <h4>Pronto a diventare un Host?</h4>
                    <p>Noi ci prendiamo cura dei nostri  host, abbiamo tanti vantaggi per voi! </p>
                    <p>Vedi le strutture aggiunte da terzi</p>
                    <Button id="dhbutton">Vai alle strutture!</Button>
                </div>
                </div>
                <div className="containerFormSV">
                    <h4>Scopri i vantaggi di essere un Host</h4>
                        <div className="cardgroup">
                        <Card className="cdh" id="cdh1">
                            <Card.Title id="titoloCarta">Inserisci e modifica le tue strutture</Card.Title>
                            <Card.Body id="corpoCarta">
                                Pochi minuti per inserire i dati relativi e le tue strutture saranno subito pubblicizzate, non preoccuparti di nulla!
                            </Card.Body>
                        </Card>
                        <Card className="cdh" id="cdh1">
                        <Card.Title id="titoloCarta">Gestisci le prenotazioni</Card.Title>
                        <Card.Body id="corpoCarta">
                            Interfaccia molto intuitiva, potrai vedere subito le richieste da parte degli utenti, accettarle o rifiutarle, gestire le prenotazioni già accettate.
                        </Card.Body>
                        </Card>
                        <Card className="cdh" id="cdh1">
                            <Card.Title>Sarai sempre al corrente dei tuoi guadagni</Card.Title>
                            <Card.Body id="corpoCarta">
                                Abbiamo pensato tre metodologie diverse per mettervi al corrente dei vostri guadagni, entra e scoprile!
                            </Card.Body>
                        </Card>
                        <Card className="cdh"id="cdh1">
                            <Card.Title id="titoloCarta">Comunicazione automatizzata</Card.Title>
                            <Card.Body id="corpoCarta">Inviare dati agli uffici competenti? Adesso basta un click!</Card.Body>
                        </Card>
                        </div>
                </div>
            </div>
        );
    }
}
export default DiventaHost;


