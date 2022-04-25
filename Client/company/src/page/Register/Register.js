import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import{Form,Dropdown,DropdownButton,Button,Card,Row,Col} from "react-bootstrap"
import $ from 'jquery'

export class Register extends React.Component{
    handleSubmmit(event){
        event.preventDefault();
        if($("#id-password").val()==$("#id-confirm-password").val()){
            let data={email:$("#id-email").val(),
                name:$("#id-name").val(),
                password:$("#id-password").val(),
                dateOfBirth:$("#id-DOB").val(),
                gender: $('input[name="register-gender"]:checked').val(),
                description:$("#id-description").val(),
            };
            console.log(data.email)
            console.log(data.name)
            console.log(data.password)
            console.log(data.dateOfBirth)
            console.log(data.gender)
            console.log(data.description)
           ;
        }else{
            alert("Confirm password incorrect")
        }
        
        
        // console.log($("#id-email").val());
        // $.ajax(
        //     {   
        //         data: {name :'hung',
        //         pass:'123'},
        //         method: 'POST',
        //         url: 'http://localhost:8080/company/register',
        //         crossDomain: true,
        //         success: function(response){
                    
        //         }
        //     }
        // );
    }
    render(){
        return(
            <div className='register'>
                <Card.Img src='assets/images/arts/login-register.jpg'
                    className="card-image"
                    alt="Card image" />
                    <Card.ImgOverlay >
                    <Card.Body className='register-body'>
                        <div className='register-form-container'>
                            <div className='title'>CREATE YOUR ACCOUNT</div>
                                <Form onSubmit={this.handleSubmmit}className='register-form'>
                                    <Row>
                                        <Col name ="email" className='input-field'>
                                        <Form.Group className="email" controlId="id-email">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control type='email' required placeholder="name@example.com" />
                                        </Form.Group>

                                        <Form.Group className="name" controlId="id-name">
                                            <Form.Label>Profile Name</Form.Label>
                                            <Form.Control required placeholder="input your profile name" />
                                        </Form.Group>

                                        <Form.Group className="password" controlId="id-password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" required placeholder="input your password" />
                                        </Form.Group>

                                        <Form.Group className="confirm-password" controlId="id-confirm-password">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control type="password" required placeholder="confirm your password" />
                                        </Form.Group>

                                        </Col>
                                        
                                        <Col className='input-field'>
                                        <Form.Group className="date-of-birth" controlId="id-DOB">
                                            <Form.Label>Date Of Birth</Form.Label>
                                            <Form.Control type="date"/>
                                        </Form.Group>    

                                        <Form.Group className="gender" >
                                            <Form.Label>Gender</Form.Label>
                                            <br/>
                                            <Form.Check value={true}
                                                inline
                                                label="Male"
                                                name="register-gender"
                                                type='radio'
                                            />
                                            <Form.Check value={false}
                                                inline
                                                label="Female"
                                                name="register-gender"
                                                type='radio'
                                            />
                                        </Form.Group>

                                        {/* <Form.Group className="country" controlId="id-country">
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
                                        </Form.Group> */}

                                        <Form.Group className="description" controlId="id-description">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows={3} />
                                        </Form.Group>
                                        </Col>
                                    </Row>
                                    
                                    <Form.Group className="agree" >
                                        <Form.Check required type="checkbox" label="I agree to the terms of the Company Subscriber Agreement and the Company Privacy Policy." />
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