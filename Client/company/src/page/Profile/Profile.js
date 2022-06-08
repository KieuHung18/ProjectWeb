// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import{Card,Row,Col,CardGroup} from "react-bootstrap"
import jquery from 'jquery';
import { useNavigate } from "react-router-dom";
import React from "react";
import './Profile.css'
export default function Profile(){
    return(
        <Component navigate={useNavigate()}/>
    );
}
let user={name:'Kieu Hung',email:'kieuhungcm2015@gmail.com',DOB:'25/12/2020',gender:'male',country:'Vietnam'}
class Component extends React.Component{
    

    render(){
        
        const profileCard=[['Profile Name','Name',user.name],
                          ['Email',"Email",user.email],
                          ['Date Of Birth',"Date",user.DOB],
                          ['Gender',"Gender",user.gender],
                          ['Country',"Country",user.country],
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
                                    <button className='profile-card-button'><FontAwesomeIcon style={{marginRight:"3px",transform: "scale(0.8)"}} icon={faPen} />Update</button>
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
            </div>
        );
    }
}