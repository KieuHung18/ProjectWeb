// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen,faSave } from '@fortawesome/free-solid-svg-icons';
import{Card,Row,Col,CardGroup,Form,Dropdown,FormControl, Button} from "react-bootstrap"
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './Profile.css'
import country from '../Register/country.json'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { textValiDate } from '../../validate';

export default function Profile(){
    var valid=true;
    const columns = [
        { dataField: 'id', text: 'Transaction Id', filter: textFilter()},
        { dataField: 'productName', text: 'Product Name',filter: textFilter()},
        { dataField: 'transactionDate', text: 'Transaction Date'},
        { dataField: 'price', text: 'Price'},
        ];
    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        hideSizePerPage: true
        });
    const [user={id: 0,name:'',email:'',dob:'',male: true,country:'',balance:0, }, setUser] = useState();
    const [update=false, setUpdate] = useState();
    const [transaction=[], setTransaction] = useState();
    const [email="",setEmail]=useState();
    const [password="",setPassword]=useState();
    const [name="",setName]=useState();
    const [loading=false,setLoading]=useState();
    const [currentCountry="Country",setCurrentCountry]=useState();
    const profileCard=[['Profile Name','Name',user.name],
                          ['Email',"Email",user.email],
                          ['Date Of Birth',"Date",(new Date(user.dob)).getDate()+"/"
                                                +parseInt(new Date(user.dob).getMonth()+1)+"/"
                                                +(new Date(user.dob)).getFullYear()],
                          ['Gender',"Gender",user.male?"Male":"Female"],
                          ['Country',"Country",user.country],
        ];
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
    function reset(){
        setEmail("")
        setPassword("")
        setLoading(false)
        setName("")
    }
    function updateInfo(event){
        event.preventDefault();
        console.log("true")
        if(valid){
            setLoading(true)
            $.ajax(
                {
                headers: {
                    'authorization':localStorage.getItem("authorization"),
                },
                data: {email:$("#id-email").val(),
                name:$("#id-name").val(),
                dob:$("#id-DOB").val(),
                male: $("#id-male").is(":checked"),
                country:currentCountry},
                method: 'POST',
                url: 'http://localhost:8080/company/users/'+user.id,
                crossDomain: true,
                success: function(res){
                    if(res.result==="SUCCESS"){
                        reset();
                        loadUser();
                        setUpdate(false)
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
    function validate(event) {
        if(textValiDate(event.target.value))
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
    function loadUser(){
        $.ajax({
            headers: {
                'authorization':localStorage.getItem("authorization"),
            },
            method: "GET",
            url: "http://localhost:8080/company/profile",
            data: {token:localStorage.getItem("authorization")},
            success: function(res){
                setUser(res.response)
                getTransaction(res.response.id)
            },
            error: function(){
                console.log("err")
            }
        });
    }
    function getTransaction(id){
        $.ajax({
            headers: {
              'authorization':localStorage.getItem("authorization"),
            },
            type: "GET",
            url: "http://localhost:8080/company/transactions/"+id,
            success: function(res){
              if(res.result!="FAIL"){
                let t=[];
                for (let i = 0; i < res.response.length; i++) {
                  t.push({
                    id:res.response[i].id,
                    userName:res.response[i].userName,
                    productName:res.response[i].productName,
                    transactionDate:new Date(res.response[i].transactionDate).toLocaleString(),
                    price:res.response[i].price
                    });
                }
            setTransaction(t)
            console.log(transaction)
            }
              else{console.log("fail");
                //redirect
              }
              },
             error: function(){
               console.log("error");
             }
          });
    }
    useEffect(() => {
        loadUser();
      }, []);


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
    function test(){
        console.log(transaction)
    }
    return(
        <div className='profile-container'>
            <div className='profile-title'>Account Setting
            <button className='profile-card-button' onClick={()=>{update?setUpdate(false):setUpdate(true);setCurrentCountry(user.country?user.country:"Country")}} style={{transform: "scale(0.75)"}}><FontAwesomeIcon  icon={faPen}/>Update</button>
            </div>
            <CardGroup className='profile-card-group'>
                <Col>
                {
                update?
                <Form onSubmit={updateInfo}>
                    <Row className='profile-card-row'>
                    <Card className='profile-card' >
                        <Card.Header className='profile-card-header'>
                        Email
                        </Card.Header>
                        <Card.Body className='profile-card-body'>
                                Email: 
                                <Form.Group className="email" controlId="id-email">
                                    <Form.Control defaultValue={user.email} onKeyUp={validate} minLength={10} maxLength={20} required className='' type='email' placeholder="name@example.com" />
                                </Form.Group>
                                {email!=""&&<div className='field-alert'>{email}</div>}
                        </Card.Body>
                    </Card>
                    </Row>
                    
                    <Row className='profile-card-row'>
                    <Card className='profile-card' >
                        <Card.Header className='profile-card-header'>
                        Profile Name
                        </Card.Header>
                        <Card.Body className='profile-card-body'>
                                Name: 
                                <Form.Group className="name" controlId="id-name">
                                        <Form.Control defaultValue={user.name} onKeyUp={validate} required maxLength={20} />
                                    </Form.Group>
                                    {name!==""&&<div className='field-alert'>{name}</div>}
                        </Card.Body>
                    </Card>
                    </Row>

                    <Row className='profile-card-row'>
                    <Card className='profile-card' >
                        <Card.Header className='profile-card-header'>
                        date of birth
                        </Card.Header>
                        <Card.Body className='profile-card-body'>
                            Date: 
                                <Form.Group className="date-of-birth" controlId="id-DOB">
                                    <Form.Control  defaultValue={(new Date(user.dob)).toISOString().substring(0,10)} className='register-input' type="date"/>
                                </Form.Group>    
                        </Card.Body>
                    </Card>
                    </Row>

                    <Row className='profile-card-row'>
                    <Card className='profile-card' >
                        <Card.Header className='profile-card-header'>
                        Male
                        </Card.Header>
                        <Card.Body className='profile-card-body'>
                                Is Male: 
                                <Form.Group  controlId="id-male" className="male" >
                                <Form.Check defaultChecked={user.male?"checked":""} type="checkbox" label="Male" />
                                </Form.Group>
                        </Card.Body>
                    </Card>
                    </Row>

                    <Row className='profile-card-row'>
                    <Card className='profile-card' >
                        <Card.Header className='profile-card-header'>
                        Country
                        </Card.Header>
                        <Card.Body className='profile-card-body'>
                                Country: 
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
                        </Card.Body>
                    </Card>
                    </Row>
                    <Button style={{margin:"10px"}} type="submit"><FontAwesomeIcon  icon={faSave} />Save</Button>
                </Form>:
                profileCard.map(
                    (pc)=>(
                    <Row className='profile-card-row' key={pc[0]}>
                    <Card className='profile-card' >
                        <Card.Header className='profile-card-header'>
                                {pc[0]}
                        </Card.Header>
                        <Card.Body className='profile-card-body'>
                                {pc[1]+": "}
                                {pc[2]}
                        </Card.Body>
                    </Card>
                    </Row>
                    )
                )}
                </Col> 
            </CardGroup>
            {!update&&
                (
                <>
                {test()

                }
                <div className='profile-title'>Transaction</div>
                <BootstrapTable 
                rowClasses="product-list-row"  
                bootstrap4 keyField='id' 
                data={transaction} 
                columns={columns}   
                pagination={pagination}
                filter={ filterFactory() }
                />
                </>
                )
            }
           
        </div>
    );
}

