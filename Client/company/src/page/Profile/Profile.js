// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import{Button,Card,Row,Col,CardGroup} from "react-bootstrap"
import jquery from 'jquery';
import { useNavigate } from "react-router-dom";
import React, { Profiler } from "react";
import './Profile.css'
export default function Profile(){
    return(
        <Component navigate={useNavigate()}/>
    );
}
let user={name:'Kieu Hung',email:'kieuhungcm2015@gmail.com',DOB:'25/12/2020',gender:'male',description:'This name is your public identity in Blizzard games. The number next to your BattleTag is called your BattleTag Code. Your friends can use your BattleTag and BattleTag Code to find you on Battle.net Services.'}
class Component extends React.Component{
    constructor(props){
        super(props);
        this.logoutHandler=this.logoutHandler.bind(this);
    }
    logoutHandler(){
        //  $.ajax(
        //     {   
        //         method: 'GET',
        //         url: 'http://localhost:8080/company/logout',
        //         xhrFields: {
        //         withCredentials: true
        //         },
        //         crossDomain: true
        //     }
        // );
        this.props.navigate("/home")
        localStorage.clear();
        window.location.reload(false);
    }
    
    render(){
        
        const profileCard=[['Profile Name','Name',user.name],
                          ['Email',"Email",user.email],
                          ['Date Of Birth',"Date",user.DOB],
                          ['Gender',"Gender",user.gender],
                          ['Description',"Description",user.description],
        ];
        return(
            <div className='profile-container'>
                <div className='profile-title'>Account Setting</div>
                <CardGroup className='profile-card-group'>
                    <Col>
                    {profileCard.map(
                        (pc)=>(
                        <Row className='profile-card-row' key={pc[0]}>
                        <Card className='profile-card' >
                            <Card.Header className='profile-card-header'>
                                    {pc[0]}
                                    <button className='profile-card-button'>Update</button>
                            </Card.Header>
                            <Card.Body className='profile-card-body'>
                                    {pc[1]}
                                    {pc[2]}
                            </Card.Body>
                        </Card>
                        </Row>
                        )
                    )}
                    </Col>
                </CardGroup>
            </div>
        );
    }
}