/* eslint-disable react/jsx-no-undef */
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';


class Shapoopy extends React.Component {

    render() {
        return (
            <>
                <Container>
                    <Form onSubmit={this.props.locationReturn}>
                        <Form.Control type="text" onChange={this.props.handleUserQuery} placeholder="Search for a city"/>
                        <Button type="submit">Explore...</Button>
                        {this.props.errorMsg &&
                            <Alert key='primary' type='warning'>
                                <p>Enter a valid query</p>
                            </Alert>}
                    </Form>
                </Container>

                {this.props.city.display_name &&
                    <>
                        <div className="map">
                            <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.props.city.lat},${this.props.city.lon}&zoom=12`} />
                        </div>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>City</Accordion.Header>
                                <Accordion.Body>
                                    <h2>{this.props.city.display_name}</h2>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Latitude and Longitude</Accordion.Header>
                                <Accordion.Body>
                                    <h2>{this.props.city.lat}</h2>
                                    <h2>{this.props.city.lon}</h2>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </>}
            </>
        )
    }
}

export default Shapoopy;
