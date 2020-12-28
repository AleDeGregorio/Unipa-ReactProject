import React from 'react';
import {Tabs, Tab, Button, Accordion,Table} from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import ListPrAccettare from './ListPrAccettare';
import ElencoCheck from './ElencoCheck';
import './Accettazione.css'
class Testina extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            apiResponse_accettazione: [],
            apiResponse_accettate: [],
            email_prop: localStorage.getItem('email'),
            error: false,
            errorMessage: ''
        }
    }

    componentDidMount() {
        const data = {
            ref_proprietario: this.state.email_prop
        };

        fetch('http://localhost:9000/getPrenotazioniAccettazione/prenotazioniAccettazione', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((result) => result.text())
        .then((result) => {
            this.setState({ apiResponse_accettazione: JSON.parse(result) });
        
            if(this.state.apiResponse_accettazione.status === 'error') {
                this.setState({ error: true });
                this.setState({ errorMessage: this.state.apiResponse_accettazione.message });
            }
        });

        fetch('http://localhost:9000/getPrenotazioniAccettate/prenotazioniAccettate', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((result) => result.text())
        .then((result) => {
            this.setState({ apiResponse_accettate: JSON.parse(result) });
        
            if(this.state.apiResponse_accettate.status === 'error') {
                this.setState({ error: true });
                this.setState({ errorMessage: this.state.apiResponse_accettate.message });
            }
        });
    }
    render(){  if(!localStorage.getItem('logged') || !localStorage.getItem('proprietario')) {
        return <Redirect
            to={{
                pathname: "/ErrorPage",
                state: { 
                    error: true,
                    errorMessage: "Utente non autorizzato" 
                }
            }}
        />
    }
    else if(this.state.error) {
        return <Redirect
            to={{
                pathname: "/ErrorPage",
                state: { 
                    error: true,
                    errorMessage: this.state.errorMessage 
                }
            }}
        />
    }
    else {
        return( <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="vogliostilizzarti">
        <Tab eventKey="home" title="Accetta Prenotazioni" className="vogliostilizzarti2">
            <ListPrAccettare />       
        </Tab>
        <Tab eventKey="profile" title="Check-in" className="vogliostilizzarti2">
            <ElencoCheck />
        </Tab>
      </Tabs>
      )
    }

}  
}
export default Testina;