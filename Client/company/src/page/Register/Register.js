import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import{Form,Dropdown,DropdownButton,Button,Card,Row,Col} from "react-bootstrap"
import $ from 'jquery'

function eventListener() {
    console.log('active')
}
export class Register extends React.Component{
    // https://images.blz-contentstack.com/v3/assets/blt2ef8b4fee426fd3e/bltbf0363971f4eabb2/5f468e698ea4aa55f232a5d2/Wallpaper-9-1920.jpg
    render(){
        return(
            <div className='register'>
                <Card.Img src='https://images.blz-contentstack.com/v3/assets/blt2ef8b4fee426fd3e/bltbf0363971f4eabb2/5f468e698ea4aa55f232a5d2/Wallpaper-9-1920.jpg'
                    className="card-image"
                    alt="Card image" />
                    <Card.ImgOverlay >
                    <Card.Body className='register-body'>
                        <div className='form-container'>
                            <div className='title'>CREATE YOUR ACCOUNT</div>
                                <Form className='register-form'>
                                    <Row>
                                        <Col className='input-field'>
                                        <Form.Group className="email" controlId="id-email">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control type="email" placeholder="name@example.com" />
                                        </Form.Group>

                                        <Form.Group className="password" controlId="id-password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="input your password" />
                                        </Form.Group>

                                        <Form.Group className="confirm-password" controlId="id-confirm-password">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control type="password" placeholder="confirm your password" />
                                        </Form.Group>
                                        
                                        <Form.Group className="date-of-birth" controlId="id-DOB">
                                            <Form.Label>Date Of Birth</Form.Label>
                                            <Form.Control type="date"/>
                                        </Form.Group>

                                        </Col>

                                        <Col className='input-field'>
                                        <Form.Group className="gender" controlId="id-gender">
                                            <Form.Label>Gender</Form.Label>
                                            <br/>
                                            <Form.Check
                                                inline
                                                label="Male"
                                                name="group1"
                                                type='radio'
                                            />
                                            <Form.Check
                                                inline
                                                label="Female"
                                                name="group1"
                                                type='radio'
                                            />
                                            <Form.Group inline className="country" controlId="id-country">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="secondary">
                                                Country
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu variant="dark">
                                                <Dropdown.Item href="#/action-1" active>Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Form.Group>
                                        </Form.Group>

                                        <Form.Group className="description" controlId="id-description">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows={3} />
                                        </Form.Group>
                                        </Col>
                                    </Row>
                                    
                                    <Form.Group className="agree" controlId="id-agree">
                                        <Form.Check type="checkbox" label="I am 13 years of age or older and agree to the terms of the Steam Subscriber Agreement and the Company Privacy Policy." />
                                    </Form.Group>

                                    <Button className='register-button' variant="primary" type="submit">
                                        Register
                                    </Button>
                                    
                                </Form>
                            </div>
                    </Card.Body>
                </Card.ImgOverlay>
            </div>
            
        );

    }
}