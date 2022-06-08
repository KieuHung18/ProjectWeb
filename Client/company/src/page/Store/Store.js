
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Store.css';
import {Form,Dropdown,Row,Col,Tab,Nav,Button, Card,CardGroup} from "react-bootstrap"
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons' 
import Fetured from './Feature';

export default function  Store(){
    function productTable(row,col,products){
        return(
        <CardGroup className=''>
            
        <Col>
        {Array.from({ length: (products.length+products.length%col)/col}).map((_,rowidx)=>(
            <Row>
                {products.slice(col*rowidx,(rowidx+1)*col).map((_,colidx)=>(
                    <Col style={{display: "contents"}}>
                        <Card key={"store_"+products[col*rowidx+colidx].name}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                            <Card.Title style={{fontSize:"14px"}}>
                                {products[col*rowidx+colidx].name}
                            </Card.Title>
                            <Card.Text>
                                {products[col*rowidx+colidx].type}
                            </Card.Text>
                            <Card.Text>
                                {products[col*rowidx+colidx].price}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        ))}
        </Col>
        {/* {products.map((p)=>(
        <Card key={"store_"+p.name}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
            <Card.Title>
                {p.name}
            </Card.Title>
            <Card.Text>
                {p.type}
            </Card.Text>
            <Card.Text>
                {p.price}
            </Card.Text>
            </Card.Body>
        </Card>
        ))} */}
        </CardGroup>
        )
    }
    function gen(num){
        let items=[];
        for(let i=0;i<num;i++){
            items.push({name:"name_"+i,type:"type_"+i,price:0})
        }
        return items
    }
    const prs=gen(5);
    return(
    <div className='store-container'>
    <Tab.Container id="left-tabs-example" defaultActiveKey="games">
    <Row>
    <Col>
        <Nav className='store-nav'>
            {["games","commanders","annoucers","bundels","premium arcade",
            ].map((items)=>(
            <Nav.Item key={"store_"+items}>
            <Nav.Link className='store-nav-link' eventKey={items}>{items}</Nav.Link>
            </Nav.Item>
            ))}
            <Dropdown>
                <Dropdown.Toggle className=''  variant="secondary">
                Fetured
                </Dropdown.Toggle>
                <Dropdown.Menu className="" variant="dark">
                {["Fetured","Name","Prices: Lowest","Prices: Highest","Discount"
                ].map((items)=>(
                <Dropdown.Item  key={"store_"+{items}} >{items}</Dropdown.Item>
                ))}
                
                </Dropdown.Menu>
            </Dropdown>
            <Form>
            <Form.Control required className='search-input'  placeholder="Search" />
            </Form>
            <Button variant="secondary">
            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
            </Button>
        </Nav>
        
        <Tab.Content>
            <Tab.Pane eventKey="games">
            <Fetured/>
            {(productTable(2,3,prs))}
            </Tab.Pane>
            <Tab.Pane eventKey="commanders">
            commanders
            </Tab.Pane>
            <Tab.Pane eventKey="annoucers">
            annoucers
            </Tab.Pane>
            <Tab.Pane eventKey="bundels">
            bundels
            </Tab.Pane>
            <Tab.Pane eventKey="premium arcade">
            arcade
            </Tab.Pane>
        </Tab.Content>

    </Col>
    </Row>
    </Tab.Container>
    </div>
    );
    
}