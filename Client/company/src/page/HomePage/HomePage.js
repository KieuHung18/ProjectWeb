import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import{Card,CardGroup,Row,Col} from "react-bootstrap"
import jquery from 'jquery';

function reveal() {
    
    var reveals = jquery(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
    
  }
  window.addEventListener("scroll", reveal);

export class HomePage extends React.Component{
    
    render(){
        //test maping for coding shop product later
        // const videocard=[['assets/images/arts/videocard1.jpg', 'assets/images/arts/videocard2.jpg', 'assets/images/arts/videocard3.jpg'],
        //                  ['Story Campaign', 'Versus Mode', 'Co-op Missions'],
        //                  ['Follow StarCraft II’s three races in a cinematic struggle for survival in the Koprulu Sector.',
        //                  'Battle opponents of similar skill on maps from all corners of the galaxy. Climb the ladder and secure your legacy!',
        //                  'Team up with a friend to tackle intense missions and upgrade your commander with powerful units and abilities.']
        // ];
        const videocard=[['assets/images/arts/videocard1.jpg', 'Story Campaign','Follow StarCraft II’s three races in a cinematic struggle for survival in the Koprulu Sector.'],
                         ['assets/images/arts/videocard2.jpg','Versus Mode','Battle opponents of similar skill on maps from all corners of the galaxy. Climb the ladder and secure your legacy!'],
                         ['assets/images/arts/videocard3.jpg','Co-op Missions','Team up with a friend to tackle intense missions and upgrade your commander with powerful units and abilities.']
        ];
        
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
                        {/*default coding card no maping*/}
                        <CardGroup className='blog-group'>
                            <Card className='blog-card'>
                                <Card.Img className='blog-img' src="assets/images/arts/blogcard1.jpg" />
                                <Card.ImgOverlay className='blog-frame'>
                                <Card.Body className='blog-body'>
                                    <Col>
                                    <Row>
                                    <Card.Title className='blog-title'>Wings of Liberty Campaign</Card.Title>
                                    </Row>
                                    <Row>
                                    <Card.Text className='blog-text'>
                                    The award-winning StarCraft II: Wings of Liberty story campaign is free in its entirety.
                                    </Card.Text>
                                    </Row>
                                    </Col>
                                </Card.Body>
                                </Card.ImgOverlay>
                            </Card>
                            <Card className='blog-card'>
                                <Card.Img className='blog-img' src="assets/images/arts/blogcard2.jpg" />
                                <Card.ImgOverlay className='blog-frame'>
                                <Card.Body className='blog-body'>
                                    <Col>
                                    <Row>
                                    <Card.Title className='blog-title'>Versus Mode</Card.Title>
                                    </Row>
                                    <Row>
                                    <Card.Text className='blog-text'>
                                    Access Unranked and Versus AI for free; unlock Ranked with 10 first wins of the day in Unranked or Versus AI.
                                    </Card.Text>
                                    </Row>
                                    </Col>
                                </Card.Body>
                                </Card.ImgOverlay>
                            </Card>
                            <Card className='blog-card'>
                                <Card.Img className='blog-img' src="assets/images/arts/blogcard3.jpg" />
                                <Card.ImgOverlay className='blog-frame'>
                                <Card.Body className='blog-body'>
                                    <Col>
                                    <Row>
                                    <Card.Title className='blog-title'>Commanders up to Level 5</Card.Title>
                                    </Row>
                                    <Row>
                                    <Card.Text className='blog-text'>
                                    Kerrigan, Raynor, and Artanis are completely free, and all other Commanders are free up to level 5.
                                    </Card.Text>
                                    </Row>
                                    </Col>
                                </Card.Body>
                                </Card.ImgOverlay>
                            </Card>
                        </CardGroup>
                    </Card.ImgOverlay>
                </div>
                <div className='promote'>
                    <Card>
                        <Card.Img src='assets/images/arts/promote-art.jpg'
                        className="card-image"
                        alt="Card image" />
                        <Card.ImgOverlay className='background'>
                            <div className='promote-intro'>
                                <div className='top reveal'>
                                Join The
                                </div>
                                <div className='bot reveal'>
                                Battle Of The Galaxy
                                </div>
                                <div className='divider'></div>
                                <p className='info'>
                                EXPERIENCE THE GAME THAT REDEFINED THE REAL-TIME STRATEGY GENRE. TERRAN, ZERG, OR PROTOSS.
                                THE GALAXY IS YOURS TO CONQUER.
                                </p>
                            </div>
                            <div className='ads-intro'>
                                <div className='top '>
                                Game Play
                                </div>
                                <div className='bot '>
                                Play It Your Way
                                </div>
                                <p className='info'>
                                Experience intergalactic warfare through an epic story campaign, best-in-class multiplayer competition, and collaborative co-op missions.
                                </p>
                            </div>
                            <CardGroup className='video-group'>
                                {videocard.map(
                                    (vc)=>(
                                    <Card className='video-card' >
                                        <Card.Img className='video-img' src={vc[0]}/>
                                        <Card.ImgOverlay className='video-frame'>
                                        <Card.Body className='video-body'>
                                            <Col>
                                            <Row>
                                            <button className='video-button'></button>
                                            </Row>
                                            <Row>
                                            <Col>
                                            <Row>
                                            <Card.Title className='video-title'>{vc[1]}</Card.Title>
                                            </Row>
                                            <Row>
                                            <Card.Text className='video-text'>{vc[2]}</Card.Text>
                                            </Row>
                                            </Col>
                                            </Row>
                                            </Col>
                                        </Card.Body>
                                        </Card.ImgOverlay>
                                    </Card>
                                    )
                                )}
                                
                            </CardGroup>
                        </Card.ImgOverlay>
                    </Card>
                </div>

                <div className='get-started'></div>
            </div>
        
        );
    }
}