import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import {Form,Button,Row,Col} from "react-bootstrap"
import $ from 'jquery';
import { useNavigate,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF,faBattleNet,faGoogle,faTwitter } from '@fortawesome/free-brands-svg-icons' 

export default function Login(){
    const [invalid=false,setInvalid]=useState()
    const [loading=false,setLoading]=useState();
    const navigate=useNavigate();
    function reset(){
        setLoading(false)
        setInvalid(false)
    }
    function loginHandler(event){
        event.preventDefault();
        setLoading(true)
        $.ajax(
            {   
                method: 'POST',
                url: 'http://localhost:8080/company/authenticateUser',
                data: {email:$('#login-email').val(),password: $('#login-password').val()},
                success:function(response){
                    if(response.result=="SUCCESS"){
                        reset();
                        localStorage.setItem("authorization",response.response)
                        navigate("/profile")
                        window.location.reload(false);
                    }else{
                        reset();
                        setInvalid(true)
                    }  
                },
                error:function(){
                    reset()
                    alert("connection error")
                }
            }
        );
       
    }
    function user(){
        $.ajax(
            {   
                method: 'GET',
                headers: {"authorization": localStorage.getItem("authorization")},
                url: 'http://localhost:8080/company/protecteduser',
               
            }
        ); 
    }
    return (
    <div className='login-container'>
        {/* <button onClick={user}>user</button> */}
        <div className='login-form-container'>
            <Form  onSubmit={loginHandler}>
                <div className='login-logo'>
                <></>
                <FontAwesomeIcon style={{color: "#148eff",marginRight: "10px"}}  icon={faBattleNet} />
                Battlle.Net
                </div>
                <Form.Group className="login-form-group login-email" controlId="login-email">
                    <Form.Control className='login-input' required type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group className="login-form-group login-password" controlId="login-password">
                    <Form.Control className='login-input' type="password" required placeholder="Password" />
                </Form.Group>
                
                {loading?
                <button style={{width:"100%",height:"40px",marginTop: "30px",marginBottom: "50px"}} className='loading-button' disabled >
                <img style={{height:"40px"}} src="assets/images/arts/spining.gif"></img>
                </button>
                :
                <>
                {invalid&&<div className='field-alert'>Wrong email or password</div>}
                <Button className='login-submit-button' type="submit">
                    Log In
                </Button>
                </>
                }
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