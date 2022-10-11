
import React from 'react';
import './App.css';
import Shapoopy from './search';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      const remoteHost = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.userQuery}&format=json`;
      const remoteReturn = await axios.get(remoteHost);
      this.setState({ city: remoteReturn.data[0], errorMsg: false});
    } catch (error) {
      this.setState({ city: {}, errorMsg: true });
    };
  }

  render() {
    return (
      <div className="App">
        <Container className='beginSearch'>
          <h1>City Explorer</h1>
          <Shapoopy
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
