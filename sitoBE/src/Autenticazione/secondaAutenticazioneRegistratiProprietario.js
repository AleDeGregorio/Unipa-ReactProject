import React from 'react';    
import {Form, Col, Row, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './secondaAutenticazione.css'

class SecondaAutenticazioneRegistratiProprietario extends React.Component {
    constructor(){
        super();
        this.state={
            email_prop:'',
            password_prop:'',
            nome_prop:'',
            cognome_prop:'',
            data_nascita_prop:'',
            telefono_prop:'',
            apiResponse: [],
            error:false,
            errorMessage:''
        };
    }
    onChange=(e)=>{
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmitInsert = (e) => {
        e.preventDefault();
        const data={
            email_prop: this.state.email_prop,
            password_prop: this.state.password_prop,
            nome_prop:this.state.nome_prop,
            cognome_prop:this.state.cognome_prop,
            data_nascita_prop:this.state.data_nascita_prop,
            telefono_prop:this.state.telefono_prop
        }
        fetch('http://localhost:9000/insertCliente/new',{
            method:"POST",
            headers:{
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((result) => result.text())
        .then((result)=>{
            this.setState({apiResponse:JSON.parse(result) });
            if(this.state.apiResponse.status === 'error') {
              this.setState({ error: true });
              this.setState({ errorMessage: this.state.apiResponse.message });
            }
        })
      } //manca num documento ed eventualmente foto e tipologia
    render(){
    return(
        <Form className="contenitoreAutenticazione" onSubmit={onSubmitInsert}>
            <div className="contentNewCheckAutenticazione">
                <h2>Iscriviti</h2>
        <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="name" placeholder="Nome" onChange={this.props.onChange} required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridSurname">
                <Form.Label>Cognome</Form.Label>
                    <Form.Control type="surname" placeholder="Cognome" onChange={this.props.onChange} required/>
                </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" placeholder="E-mail" onChange={this.props.onChange} required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.props.onChange} required/>
                </Form.Group>
            <Form.Group as={Col} controlId="formGridIndirizzo">
            <Form.Label>Telefono</Form.Label>
            <Form.Control type="tel" placeholder="Telefono" onChange={this.props.onChange} required/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridIndirizzo">
            <Form.Label>Documento</Form.Label>
            <Form.Control type="tel" placeholder="Documento" onChange={this.props.onChange} required/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCap">
            <Form.Label>Data di nascita</Form.Label>
            <Form.Control type="date" required className="inputSignUp" onChange={this.props.onChange} />
            </Form.Group>
            <Link to="/secondaAutenticazioneRegistrati">Torna indietro</Link>
          </div>
          
          <Button variant="primary" type="submit" className="pulsante">
                    Registrati
            </Button>
        </Form>
    );}
}
export default SecondaAutenticazioneRegistratiProprietario