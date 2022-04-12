import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import{Card,CardGroup} from "react-bootstrap"

export class HomePage extends React.Component{
    render(){
        return (
            <div className='home-page'>
                <div className='header-section'>
                    <Card.Img src='assets/images/arts/home-page.jpg'
                    className="card-image"
                    alt="Card image" />
                    <Card.ImgOverlay >
                        <div className='slogan'>
                        The Utilmate Real-Time Stratergy Game.
                        </div>
                        <CardGroup className='blog-group'>
                            <Card className='blog-card'>
                                <Card.Img className='blog-img' src="assets/images/arts/blogcard1.jpg" />
                                <Card.ImgOverlay className='blog-frame'>
                                <Card.Body className='blog-body'>
                                    <Card.Title className='blog-title'>Wings of Liberty Campaign</Card.Title>
                                    <Card.Text className='blog-text'>
                                    The award-winning StarCraft II: Wings of Liberty story campaign is free in its entirety.
                                    </Card.Text>
                                </Card.Body>
                                </Card.ImgOverlay>
                            </Card>
                            <Card className='blog-card'>
                                <Card.Img className='blog-img' src="assets/images/arts/blogcard2.jpg" />
                                <Card.ImgOverlay className='blog-frame'>
                                <Card.Body className='blog-body'>
                                    <Card.Title className='blog-title'>Versus Mode</Card.Title>
                                    <Card.Text className='blog-text'>
                                    Access Unranked and Versus AI for free; unlock Ranked with 10 first wins of the day in Unranked or Versus AI.
                                    </Card.Text>
                                </Card.Body>
                                </Card.ImgOverlay>
                            </Card>
                            <Card className='blog-card'>
                                <Card.Img className='blog-img' src="assets/images/arts/blogcard3.jpg" />
                                <Card.ImgOverlay className='blog-frame'>
                                <Card.Body className='blog-body'>
                                    <Card.Title className='blog-title'>Commanders up to Level 5</Card.Title>
                                    <Card.Text className='blog-text'>
                                    Kerrigan, Raynor, and Artanis are completely free, and all other Commanders are free up to level 5.
                                    </Card.Text>
                                </Card.Body>
                                </Card.ImgOverlay>
                            </Card>
                        </CardGroup>
                    </Card.ImgOverlay>
                </div>
                <div className='promote'>
                <Card.Img src='assets/images/arts/promote-art.jpg'
                    className="card-image"
                    alt="Card image" /><div>something</div>
                    <Card.ImgOverlay className='background'>
                        <div>MESSAGE</div>
                    </Card.ImgOverlay>
                    <div className='intro'>
                            <div className='intro-top'>
                            Are You Ready
                            </div>
                            <div className='intro-bot'>
                            Commanders?
                            </div>
                            <span className='divider'></span>
                            <p>
                            EXPERIENCE THE GAME THAT REDEFINED THE REAL-TIME STRATEGY GENRE. TERRAN, ZERG, OR PROTOSS.
                            THE GALAXY IS YOURS TO CONQUER.
                            </p>
                    </div>
                </div>
                <div className='get-started'></div>
            </div>
        
        );
    }
}