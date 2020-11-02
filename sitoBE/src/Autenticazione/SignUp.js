import React from "react";
import {Form, Col, Button} from 'react-bootstrap'

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: ""
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();

  }

  render() {
    return (
      <div className="form-containerAutenticazione sign-up-containerAutenticazione">
        <form onSubmit={this.handleOnSubmit}>
          <h2>Crea account</h2>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
            <Form.Control type="name" placeholder="Nome" required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
            <Form.Control type="surname" placeholder="Cognome" required/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridIndirizzo">
            <Form.Label>Telefono</Form.Label>
            <Form.Control type="tel" placeholder="Telefono" required/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCap">
            <Form.Label>Data di nascita</Form.Label>
            <Form.Control type="date" required className="inputSignUp"/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
            <Form.Control type="email" placeholder="E-mail" required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCap">
            <Form.Control type="password" placeholder="Password" required/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
          <Form.Group as={Col} controlId="formBasicCheckbox">
          <Form.Check
          type="radio"
          label="first radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
        />
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicCheckbox">
       
        <Form.Check
          type="radio"
          label="second radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        />
          </Form.Group>
          </Form.Row>
        </form>
      </div>
    );
  }
}

export default SignUpForm;