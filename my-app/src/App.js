import './App.css';
import React, { Component } from 'react';
import { Col, Row, Card, CardHeader, CardBody } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: {},   // JSON object
      beers: [],  // Array of JSON objects
    };
  }

  componentDidMount() {

    setTimeout(() => { // Simulate slow API call
      var requestOptions1 = {
        method: 'GET',
        redirect: 'follow'
      };
      fetch("https://random.dog/woof.json", requestOptions1)
        .then(response => response.text())
        .then(result => this.setState({ dogs: JSON.parse(result) }))
        .catch(error => console.log('error', error));
    }, 5000);

    var requestOptions2 = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://api.punkapi.com/v2/beers", requestOptions2)
      .then(response => response.text())
      .then(result => { 
        this.setState({ beers: JSON.parse(result) })
      })
      .catch(error => console.log('error', error));

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <h3>
              Information fetch with conditional rendering JSON object
            </h3>
            <h4>
              {
                this.state.dogs.url ? // if dogs.url is not null JSON object
                  <>
                    {
                      this.state.dogs.url.indexOf(".mp4") > -1 ? // if isVideo is true
                        <video width="auto" height="300px" controls>
                          <source src={this.state.dogs.url} type="video/mp4" />
                        </video>
                        :
                        <div>
                          <img
                            style={{
                              border: "1px solid black",
                              borderRadius: "25px",
                            }}
                            width="auto"
                            height="300px"
                            src={this.state.dogs.url}
                            alt="logo"
                          />
                        </div>
                    }
                  </>
                  : // Render Until API call is complete
                  <>
                    Loading...
                    <br />
                    (Slow API call)
                  </>
              }
            </h4>
          </div>
          <br />
          <div>
            <h3>
              Information fetch with conditional rendering and maps array of JSON objects
            </h3>
            <h4 style={{
              height: "48vh",
              overflowX: "hidden",
              overflowY: "scroll",
              padding: "10px"
            }} >
              {
                this.state.beers.length > 0 ? // if beers.length is greater than 0 Array of JSON objects
                  <Row md="5">
                    {
                      this.state.beers.map((beer, index) => { // map beers array
                        return (
                          <Col key={"Beer" + index} style={{
                            padding: "10px"
                          }}>
                            <Card style={{
                              backgroundColor: "DeepSkyBlue",
                            }}>
                              <CardHeader>
                                {beer.name.substring(0, 10)}
                              </CardHeader>
                              <CardBody>
                                <img width="auto" height="100px" src={beer.image_url} alt="logo" />
                              </CardBody>
                            </Card>
                          </Col>
                        )
                      })
                    }
                  </Row>
                  : // Render Until API call is complete
                  <> 
                    Loading... 
                  </>
              }
            </h4>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
