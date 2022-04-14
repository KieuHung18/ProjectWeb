import React from "react";
import { Card,Button,NavLink,Col,Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'
export class Footer extends React.Component{
    render(){
        return (
        <Card className="card">
        <Card.Img src='assets/images/arts/footer.jpg'
                className="card-image"
                alt="Card image" />
            <Card.ImgOverlay>
                <div className="header">
                    <Card.Title className="first-title">Join The</Card.Title>
                    <Card.Title className="sec-title">Battle</Card.Title>
                    <div className="divider"></div>
                    <Button className="button">Play Free Now</Button>
                </div>
            </Card.ImgOverlay>
            <Card.Footer className="footer">
                    <Row>
                    <Col><NavLink className="company-logo"></NavLink></Col>
                    <Col><NavLink className="game-logo"></NavLink></Col>
                    </Row>
                    <Card.Text className="copyright">
                        ©2022 BLIZZARD ENTERTAINMENT, INC. ALL RIGHTS RESERVED.
                    </Card.Text>
                    <Card.Text className="copyright">
                        All trademarks referenced herein are the properties of their respective owners.
                    </Card.Text>
                </Card.Footer>
        </Card>
      
      );
    }
}