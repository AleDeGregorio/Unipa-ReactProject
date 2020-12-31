import React from "react";

import { Link } from "react-router-dom";
import CaseVacanzaContainer from "../components/CaseVacanzaContainer";

class CaseVacanza extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      case: this.props.history.location.state.case ? this.props.history.location.state.case : [],
      posti: this.props.history.location.state.ospiti ? this.props.history.location.state.ospiti : 1
    }
  }

  render() {
    return (
      <>
        <CaseVacanzaContainer case = {this.state.case} posti = {this.state.posti}/>
      </>
    );
  }
};

export default CaseVacanza;
