import React from "react";
import {Tabs,Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css';
import jquery  from 'jquery';
import ProductList from "./ProductList";
import UserList from "./UserList";
import Transaction from "./Transaction";
export default function Admin(){
    return <Component/>;
}

class Component extends React.Component{

    render(){
    return (
    <div className="admin-container">
    <Tabs defaultActiveKey="productList" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="productList" title="Product List">
        <ProductList/>
        </Tab>

        <Tab eventKey="userlist" title="User List">
        <UserList/>
        </Tab>

        <Tab eventKey="Transaction" title="Transaction">
        <Transaction/>
        </Tab>
        
    </Tabs>
    </div>
    );
    }
}

