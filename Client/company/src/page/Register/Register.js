import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import{Form,Dropdown,FormControl,Button,Card,Row,Col} from "react-bootstrap"
import $ from 'jquery'
import { useState } from 'react';
import country from './country.json';
import { useNavigate } from 'react-router-dom';
var valid;
export default  function Register (){
    const [email="",setEmail]=useState();
    const [password="",setPassword]=useState();
    const [name="",setName]=useState();
    const [loading=false,setLoading]=useState();
    const [currentCountry="Country",setCurrentCountry]=useState();
    const navigate=useNavigate();
    function reset(){
        setEmail("")
        setPassword("")
        setLoading(false)
        setName("")
    }
    function confirm(){
        if($("#id-password").val()===$("#id-confirm-password").val()){
            return true
        }
        else{
            setPassword("Confirm password incorrect")
            return false
        }
        
    }
    function validate(event) {
        let allow=/^[a-zA-Z0-9@.]+$/;
        if(event.target.value.match(allow))
        {
            if(event.target.id=="id-password"){
                setPassword("")
                if(email===""&&name===""){valid=true}
            }
            if(event.target.id=="id-name"){
                setName("")
                if(email===""&&password===""){valid=true}
            }
            if(event.target.id=="id-email"){
                setEmail("")
                if(password===""&&name===""){valid=true}
            }
        }
        else
        {   
            if(event.target.id=="id-password"){setPassword("Invalid data type")}
            if(event.target.id=="id-name"){setName("Invalid data type")}
            if(event.target.id=="id-email"){setEmail("Invalid data type")}
            valid=false;
        }
    };
    
    function handleSubmmit(event){
        event.preventDefault();
        if(confirm()&&valid){
            // let data={email:$("#id-email").val(),
            //     name:$("#id-name").val(),
            //     password:$("#id-password").val(),
            //     dateOfBirth:$("#id-DOB").val(),
            //     gender: $('input[name="register-gender"]:checked').val(),
            //     country:currentCountry,
            // };
            // console.log(data.email)
            // console.log(data.name)
            // console.log(data.password)
            // console.log(data.dateOfBirth)
            // console.log(data.gender)
            // console.log(data.country)
            setLoading(true)

            $.ajax(
                {
                data: {email:$("#id-email").val(),
                name:$("#id-name").val(),
                password:$("#id-password").val(),
                DOB:$("#id-DOB").val(),
                gender: null,
                country:currentCountry},
                method: 'POST',
                url: 'http://localhost:8080/company/register',
                crossDomain: true,
                success: function(res){
                    if(res.result==="SUCCESS"){
                        reset();
                        navigate("/login")
                    }
                    else{
                        reset()
                        setEmail("Duplicate email")
                    }
                },
                error: function(){
                    reset();
                    alert("connection error")
                }
                }
            );
        }
        
    }

    function contain(find,text){
        let findlen=find.split("").length
        let textlen=text.split("").length;
        for(let i=0;i<=textlen-findlen;i++){
            if(text.slice(i, findlen+i)===find){
                return true;
            }
        }
        return false;
    }
    const CustomMenu = React.forwardRef(
        ({ children, style, className}, ref) => {
            const [value, setValue] = useState('');
        
            return (
            <div
                ref={ref}
                style={style}
                className={className}
            >
                <FormControl
                autoFocus
                className="country-filter"
                placeholder="Type to filter..."
                onChange={(e) => setValue(e.target.value)}
                value={value}
                />
                <ul className="list-country">
                {React.Children.toArray(children).filter(
                    (child) =>
                    !value || contain(value,child.props.children.toLowerCase())
                )}
                </ul>
            </div>
            );
        },
    );

    return(
        <div className='register'>
            <Card.Img src='assets/images/arts/login-register.jpg'
                className="card-image"
                alt="Card image" />
                <Card.ImgOverlay >
                <Card.Body className='register-body'>
                    <div className='register-form-container'>
                        <div className='title'>CREATE YOUR ACCOUNT</div>
                            <Form onSubmit={handleSubmmit}className='register-form'>
                                <Row>
                                    <Col name ="email" className='input-field'>
                                    <Form.Group className="email" controlId="id-email">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control onKeyUp={validate} minLength={10} maxLength={20} required className='register-input' type='email' placeholder="name@example.com" />
                                    </Form.Group>
                                    {email!=""&&<div className='field-alert'>{email}</div>}

                                    <Form.Group className="name" controlId="id-name">
                                        <Form.Label>Profile Name</Form.Label>
                                        <Form.Control onKeyUp={validate} maxLength={20} className='register-input' />
                                    </Form.Group>
                                    {name!==""&&<div className='field-alert'>{name}</div>}

                                    <Form.Group className="password" controlId="id-password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control onKeyUp={validate} minLength={10} maxLength={20} className='register-input' type="password" />
                                    </Form.Group>

                                    <Form.Group className="confirm-password" controlId="id-confirm-password">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control onKeyUp={validate} className='register-input' type="password"/>
                                    </Form.Group>
                                    {password!==""&&<div className='field-alert'>{password}</div>}
                                    </Col>
                                    
                                    <Col className='input-field'>
                                    <Form.Group className="date-of-birth" controlId="id-DOB">
                                        <Form.Label>Date Of Birth</Form.Label>
                                        <Form.Control  className='register-input' type="date"/>
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

                                    <Form.Group className="country" controlId="id-country">
                                        <Dropdown>
                                            <Dropdown.Toggle className='country-btn'  variant="secondary">
                                            {currentCountry}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="menu-country" as={CustomMenu}  variant="dark">
                                            {Object.values(country).map((c,i)=>(
                                                <Dropdown.Item onClick={()=>{setCurrentCountry(c)}} key={i} eventKey={i}>{c}</Dropdown.Item>
                                            ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Form.Group>
                                    </Col>
                                </Row>
                                
                                <Form.Group className="agree" >
                                    <Form.Check required type="checkbox" label="I agree to the terms of the Company Subscriber Agreement and the Company Privacy Policy." />
                                </Form.Group>
                                
                                {loading?
                                <button style={{width:"150px",height:"40px"}} className='loading-button' disabled >
                                <img style={{height:"40px"}} src="assets/images/arts/spining.gif"></img>
                                </button>
                                :
                                <Button className='register-button' variant="primary" type="submit">
                                    Register
                                </Button>
                                }
                            </Form>
                        </div>
                </Card.Body>
            </Card.ImgOverlay>
        </div>
        
    );

}