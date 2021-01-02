import React from "react";

import { Link } from "react-router-dom";
import CaseVacanzaContainer from "../components/CaseVacanzaContainer";

class CaseVacanza extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      case: this.props.history.location.state.case ? this.props.history.location.state.case : [],
      posti: this.props.history.location.state.posti ? this.props.history.location.state.posti : 1,
      checkIn: this.props.history.location.state.checkIn ? this.props.history.location.state.checkIn : '',
      checkOut: this.props.history.location.state.checkOut ? this.props.history.location.state.checkOut : '',
      localita: this.props.history.location.state.localita ? this.props.history.location.state.localita : ''
    }
  }

  render() {
    return (
      <>
        <CaseVacanzaContainer 
          case = {this.state.case} 
          posti = {this.state.posti} 
          checkIn = {this.state.checkIn} 
          checkOut = {this.state.checkOut}
          localita = {this.state.localita}
        />
      </>
    );
  }
};

export default CaseVacanza;
