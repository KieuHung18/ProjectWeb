import React from "react";
import { Navbar,NavDropdown,Nav,Container,Row,Col} from "react-bootstrap";
import{Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'
import $ from 'jquery';
export class NavBar extends React.Component{
    logoutHandler(){
         $.ajax(
            {   
                method: 'GET',
                url: 'http://localhost:8080/company/logout',
                xhrFields: {
                withCredentials: true
                },
                crossDomain: true
            }
        );
        localStorage.clear();
        this.setState({update: this.state.update?false:true})
    }
    
    constructor(props){
        super(props);
        this.state={update:true}
        this.logoutHandler=this.logoutHandler.bind(this);
    }
    
    render(){
        return <Navbar className="navigation" variant="dark" collapseOnSelect >
        <Container className="container">
            <Link className="logo" to="/home"></Link>
            <Nav className="link">
                <Link style={{ textDecoration: 'none' }} className="navbar-link link-main" to="/media">Media</Link>
                <Link style={{ textDecoration: 'none' }} className="navbar-link link-main" to="/news">News</Link>
                <Link style={{ textDecoration: 'none' }} className="navbar-link link-main" to="/esports">Esports</Link>
                <NavDropdown className="navbar-link link-main game" title="Game" >
                    <NavDropdown.Item className="game-item navbar-link game-link" as={Link} to="/store">
                    Store
                    </NavDropdown.Item>
                    <NavDropdown.Item className="game-item navbar-link game-link" as={Link} to="/patches">
                    Patches
                    </NavDropdown.Item>
                    <NavDropdown.Item className="game-item navbar-link game-link" as={Link} to="/gameplay-update">
                    Gameplay Update
                    </NavDropdown.Item>
                    <NavDropdown.Item className="game-item navbar-link game-link" as={Link} to="/previous-update">
                    Previous Update
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav className="user">
                <Nav className="navigation-user">
                    <Col>
                    <Row>
                    <Link style={{ textDecoration: 'none' }} className="navbar-link link-sub" to="/support">Support</Link>
                    </Row>
                    <Row>
                    {localStorage.getItem("user")?
                    <NavDropdown className="acount" title="acount" >
                        <NavDropdown.Item onClick={this.logoutHandler}
                            className="acount-item navbar-link game-link" as={Link} to="/home">
                        Logout
                        </NavDropdown.Item>

                        <NavDropdown.Item
                            className="acount-item navbar-link game-link" as={Link} to="/profile">
                        Acount Setting
                        </NavDropdown.Item>
                        
                    </NavDropdown>:
                    <NavDropdown className="acount" title="acount" >
                        <NavDropdown.Item
                        className="acount-item navbar-link game-link" as={Link} to="/login">
                        Log In
                        </NavDropdown.Item>

                        <NavDropdown.Item
                            className="acount-item navbar-link game-link" as={Link} to="/register">
                        Create Acount
                        </NavDropdown.Item>
                    </NavDropdown>
                    }
                    
                    </Row>
                    </Col>
                </Nav>
                <Link style={{ textDecoration: 'none' }} className="play-link" to="/play">Play For Free</Link>
            </Nav>
        </Container>
      </Navbar>
    }
}