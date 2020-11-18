import React, { Component } from "react";
import items from "./data";

const CasaVacanzaContext = React.createContext();

export default class CasaVacanzaProvider extends Component {
  state = {
    caseVacanza: [],
    sortedCaseVacanza: [],
    featuredCaseVacanza: [],
    loading: true,
    //
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    wify: false,       //servizi
    ariaCondizionata: false
  };

  // getData = async () => {
  //   try {
  //     let response = await Client.getEntries({
  //       content_type: "beachResortRoom"
  //     });
  //     let rooms = this.formatData(response.items);

  //     let featuredRooms = rooms.filter(room => room.featured === true);
  //     //
  //     let maxPrice = Math.max(...rooms.map(item => item.price));
  //     let maxSize = Math.max(...rooms.map(item => item.size));
  //     this.setState({
  //       rooms,
  //       featuredRooms,
  //       sortedRooms: rooms,
  //       loading: false,
  //       //
  //       price: maxPrice,
  //       maxPrice,
  //       maxSize
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  componentDidMount() {
    // this.getData();
    let caseVacanza = this.formatData(items);   //costruisco il vettore delle case
    let featuredCaseVacanza =caseVacanza.filter((casaVacanza) => casaVacanza.featured === true);
    //
    let maxPrice = Math.max(...caseVacanza.map((item) => item.price));
    this.setState({
      caseVacanza,
      featuredCaseVacanza,
      sortedCaseVacanza: caseVacanza,
      loading: false,
      //
      price: maxPrice,
      maxPrice,
      
    });
  }

  formatData(items) {      //costruisco l'oggetto casaVacanza
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);

      let casaVacanza = { ...item.fields, images, id };
      return casaVacanza;
    });
    return tempItems;
  }
  getCasaVacanza = (slug) => {      //restituisce casa vacanza
    let tempCaseVacanza = [...this.state.caseVacanza];
    const casaVacanza = tempCaseVacanza.find((casaVacanza) => casaVacanza.slug === slug);
    return casaVacanza;
  };
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);

    this.setState(
      {
        [name]: value
      },
      this.filterCaseVacanza
    );
  };
  filterCaseVacanza = () => {
    let {
      caseVacanza,
      type,
      capacity,
      price,
      wifi,
      ariaCondizionata
    } = this.state;

    let tempCaseVacanza = [...caseVacanza];
    // transform values
    // get capacity
    capacity = parseInt(capacity);
    price = parseInt(price);
    // filter by type
    if (type !== "all") {
      tempCaseVacanza = tempCaseVacanza.filter((casaVacanza) => casaVacanza.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
      tempCaseVacanza = tempCaseVacanza.filter((casaVacanza) => casaVacanza.capacity >= capacity);
    }
    // filter by price
    tempCaseVacanza = tempCaseVacanza.filter((casaVacanza) => casaVacanza.price <= price);
   
    //filter by wifi
    if (wifi) {
      tempCaseVacanza = tempCaseVacanza.filter((casaVacanza) => casaVacanza.wifi === true);
    }
    //filter by ariaCondizionata
    if (ariaCondizionata) {
      tempCaseVacanza = tempCaseVacanza.filter((casaVacanza) => casaVacanza.ariaCondizionata === true);
    }
    this.setState({
      sortedCaseVacanza: tempCaseVacanza
    });
  };
  render() {
    return (
      <CasaVacanzaContext.Provider
        value={{
          ...this.state,
          getCasaVacanza: this.getCasaVacanza,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </CasaVacanzaContext.Provider>
    );
  }
}
const CasaVacanzaConsumer = CasaVacanzaContext.Consumer;

export { CasaVacanzaProvider, CasaVacanzaConsumer, CasaVacanzaContext };

export function withCasaVacanzaConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <CasaVacanzaConsumer>
        {(value) => <Component {...props} context={value} />}
      </CasaVacanzaConsumer>
    );
  };
}
