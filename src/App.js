
import React from 'react';
import './App.css';
import search from './search';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userQuery: '',
      city: {},
      errorMsg: ''
    }
  }



  // event handlers 

  handleUserQuery = (event) => {//sets userQuery to whatever the user put into the search bar 
    event.preventDefault();
    this.setState({ userQuery: event.target.value })
  }

  locationReturn = async (event) => { //async added to handler to prevent issue with loading before return.
    event.preventDefault();
    try { //remember to ask what this is preventing
      const remoteHost = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
      const remoteReturn = await axios.get(remoteHost);
      this.setState({ city: remoteReturn.data[0].display_name, lat: remoteReturn[0].lat, lon: remoteReturn[0].lon, errorMsg: false })
    } catch (error) {
      this.setState({ city: {}, errorMsg: true });
    };
  }

  render() {
    return (
      <div className="App">
        <Container className='beginSearch'>
          <h1>City Explorer</h1>
          <search
            city={this.state.city}
            handleUserQuery={this.handleUserQuery}
            locationReturn={this.locationReturn}
            errorMsg={this.state.errorMsg} />
        </Container>
      </div>
    );
  }
}

export default App;
