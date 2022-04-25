import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import {Form,Button,Row,Col} from "react-bootstrap"
import $ from 'jquery';
import { useNavigate,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF,faBattleNet,faGoogle,faTwitter } from '@fortawesome/free-brands-svg-icons' 

export default function Login(){
    return(
        <Component navigate={useNavigate()}/>
    );
}
export class Component extends React.Component{
    constructor(props){
        super(props);
        this.loginHandler=this.loginHandler.bind(this);
    }
    getUserData(){
        $.ajax(
            {   
                method: 'GET',
                url: 'http://localhost:8080/company/protecteduser',
                xhrFields: {
                withCredentials: true
                },
                crossDomain: true,
            }
        );
    }
    getAdminData(){
        $.ajax(
            {   
                method: 'GET',
                url: 'http://localhost:8080/company/protectedadmin',
                xhrFields: {
                withCredentials: true
                },
                crossDomain: true,
                success:function(){
                    console.log("success")
                },
                error:function(){
                    console.log("error")
                }
            }
        )
    }
    loginHandler(event){
        event.preventDefault();
        var thisClass=this;
        $.ajax(
            {   
                method: 'POST',
                url: 'http://localhost:8080/company/authenticateUser',
                data: {email:$('#login-email').val(),password: $('#login-password').val()},
                xhrFields: {
                withCredentials: true
                },
                crossDomain: true,
                success:function(response){
                    if(response.result=="SUCCESS"){
                        localStorage.setItem("user",{userID: response.response.userID,userRole: response.response.userRole});
                        // thisClass.props.navigate('/profile');
                        // window.location.reload(false);
                    }else{
                        alert("Wrong email or password");
                }
            }
            }
        );
        // let response={result:"SUCCESS",response: {userID:"u1",userRole: "ROLE_USER"}}
        // let data={email: $('#login-email').val(),password:$('#login-password').val()}
        // console.log(data.email);
        // console.log(data.password);
        // if(response.result=="SUCCESS"){
        //     localStorage.setItem("user",{userID: response.response.userID,userRole: response.response.userRole});
        //     this.props.navigate('/profile');
        //     window.location.reload(false);
        // }else{
        //     alert("Wrong email or password");
        // }
    }
    
    render(){
        return (
        <div className='login-container'>
        <button onClick={this.getUserData}>getdatauser</button>
        <button onClick={this.getAdminData}>getdatadmin</button>
            <div className='login-form-container'>
                <Form  onSubmit={this.loginHandler}>
                    <div className='login-logo'>
                    
                    <FontAwesomeIcon style={{color: "#148eff",marginRight: "10px"}}  icon={faBattleNet} />
                    Battlle.Net
                    </div>
                    <Form.Group className="login-form-group login-email" controlId="login-email">
                        <Form.Control className='login-input' required type="email" placeholder="Enter email" />
                        {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="login-form-group login-password" controlId="login-password">
                        <Form.Control className='login-input' type="password" required placeholder="Password" />
                    </Form.Group>
                    
                    <Button className='login-submit-button' type="submit">
                        Log In
                    </Button>
                </Form>
                <div >
                    <Col>
                        <Row className='login-aternative'>
                            <Col className='login-divider'></Col>
                            <Col className='login-alternative-title'>Or login with</Col>
                            <Col className='login-divider'></Col>
                        </Row>

                        <Row className='login-brand'>
                            <Col >
                                <button className='login-facebook'>
                                <FontAwesomeIcon className='login-icon facebook' icon={faFacebookF}/>
                                </button>
                            </Col>
                            <Col >
                                <button className='login-google'>
                                <FontAwesomeIcon className='login-icon google' icon={faGoogle}/>
                                </button>
                            </Col>
                            <Col >
                                <button className='login-twitter'>
                                <FontAwesomeIcon className='login-icon twitter' icon={faTwitter}/>
                                </button>
                            </Col>
                        </Row>
                    </Col>
                    <div >
                        <Link style={{ textDecoration: 'none' }} className='login-register-link' to="/register">Create a free Battle.net Account</Link>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}