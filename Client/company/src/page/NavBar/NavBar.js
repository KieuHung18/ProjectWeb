import React from "react";
import { Navbar,NavDropdown,Nav,Container,Row,Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'

export class NavBar extends React.Component{
    render(){
        return <Navbar className="navigation" variant="dark"  expand="lg">
        <Container className="container">
            <Navbar.Brand className="logo" href="#home"/>
            <Nav className="link">
                <Nav.Link className="link-main" href="#home">Media</Nav.Link>
                <Nav.Link className="link-main" href="#link">News</Nav.Link>
                <Nav.Link className="link-main" href="#link">Esports</Nav.Link>
                <NavDropdown className="link-main game" title="Game" >
                    <NavDropdown.Item className="game-item" href="#action/3.1">Store</NavDropdown.Item>
                    <NavDropdown.Item className="game-item" href="#action/3.2">Patches</NavDropdown.Item>
                    <NavDropdown.Item className="game-item" href="#action/3.3">Gameplay Updates</NavDropdown.Item>
                    <NavDropdown.Item className="game-item" href="#action/3.4">Previous Update</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav className="user">
                <Nav className="navigation-user">
                    <Col>
                    <Row>
                    <Nav.Link className="link-sub" href="#link">Suport</Nav.Link>
                    </Row>
                    <Row>
                    <NavDropdown className="acount" title="acount" >
                        <NavDropdown.Item className="acount-item" href="#action/3.1">Log In</NavDropdown.Item>
                        <NavDropdown.Divider style={{color: 'rgba(255,255,255,.6)'}} />
                        <NavDropdown.Item className="acount-item" href="#action/3.1">Acount Setting</NavDropdown.Item>
                        <NavDropdown.Item className="acount-item" href="#action/3.1">Create Acount</NavDropdown.Item>
                    </NavDropdown>
                    </Row>
                    </Col>
                </Nav>
                <Nav.Link className="play" href="#link">Play For Free</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    }
}