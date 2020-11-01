import React from "react";

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
          <h1>Crea account</h1>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Nome"
          />
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password"
          />
          <hr/>
          <button>ISCRIVITI COME CLIENTE</button>
          <hr/>
          <button>ISCRIVITI COME PROPRIETARIO</button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;