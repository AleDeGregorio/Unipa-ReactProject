import React, { Component } from "react";
import items from "./data";

const CasaBandbContext = React.createContext();

export default class CasaBandbProvider extends Component {
  state = {
    caseBandb: [],
    sortedCaseBandb: [],
    featuredCaseBandb: [],
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
    let caseBandb = this.formatData(items);   //costruisco il vettore delle case
    let featuredCaseBandb =caseBandb.filter((casaBandb) => casaBandb.featured === true);
    //
    let maxPrice = Math.max(...caseBandb.map((item) => item.price));
    this.setState({
      caseVacanza,
      featuredCaseBandb,
      sortedCaseBandb: caseBandb,
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

      let casaBandb = { ...item.fields, images, id };
      return casaBandb;
    });
    return tempItems;
  }
  getCasaBandb = (slug) => {      //restituisce casa vacanza
    let tempCaseBandb = [...this.state.caseBandb];
    const casaBandb = tempCaseBandb.find((casaBandb) => casaBandb.slug === slug);
    return casaBandb;
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
      this.filterCaseBandb
    );
  };
  filterCaseBandb = () => {
    let {
      caseBandb,
      type,
      capacity,
      price,
      wifi,
      ariaCondizionata
    } = this.state;

    let tempCaseBandb = [...caseBandb];
    // transform values
    // get capacity
    capacity = parseInt(capacity);
    price = parseInt(price);
    // filter by type
    if (type !== "all") {
      tempCaseBandb = tempCaseBandb.filter((casaBandb) => casaBandb.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
      tempCaseBandb = tempCaseBandb.filter((casaBandb) => casaBandb.capacity >= capacity);
    }
    // filter by price
    tempCaseBandb = tempCaseBandb.filter((casaBandb) => casaBandb.price <= price);
   
    //filter by wifi
    if (wifi) {
      tempCaseBandb = tempCaseBandb.filter((casaBandb) => casaBandb.wifi === true);
    }
    //filter by ariaCondizionata
    if (ariaCondizionata) {
      tempCaseBandb = tempCaseBandb.filter((casaBandb) => casaBandb.ariaCondizionata === true);
    }
    this.setState({
      sortedCaseBandb: tempCaseBandb
    });
  };
  render() {
    return (
      <CasaBandbContext.Provider
        value={{
          ...this.state,
          getCasaBandb: this.getCasaBandb,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </CasaBandbContext.Provider>
    );
  }
}
const CasaBandbConsumer = CasaBandbContext.Consumer;

export { CasaBandbProvider, CasaBandbConsumer, CasaBandbContext };

export function withCasaBandbConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <CasaBandbConsumer>
        {(value) => <Component {...props} context={value} />}
      </CasaBandbConsumer>
    );
  };
}
