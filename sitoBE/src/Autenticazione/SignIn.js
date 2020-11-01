import React from "react";
import {Link} from 'react-router-dom'

class SignInForm extends React.Component {

  render() {
    return (
      <div className="form-containerAutenticazione sign-in-containerAutenticazione">
        <form onSubmit={this.props.onSubmit}>
          <h1>Accedi</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={this.props.onChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.props.onChange}
          />
          <button>ACCEDI</button>
        </form>
      </div>
    );
  }
}

export default SignInForm;
