import 'bootstrap/dist/css/bootstrap.min.css';
import './Store.css';
import {Carousel} from "react-bootstrap"
export default function  Fetured(){
    return(
    <div className='featured-container'>
    <Carousel>
    <Carousel.Item className="feature-promte">
        <img
        className="feature-promte-img"
        src="assets/images/promote1.jpg"
        alt="First slide"
        />
        <Carousel.Caption>
        <h3>Building</h3>
        <p>Building economy</p>
        </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item className="feature-promte">
        <img
        className="feature-promte-img"
        src="assets/images/promote2.jpg"
        alt="Second slide"
        />

        <Carousel.Caption>
        <h3>Deffend</h3>
        <p>Deffending Your Base</p>
        </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item className="feature-promte">
        <img
        className="feature-promte-img"
        src="assets/images/promote3.jpg"
        alt="Third slide"
        />

        <Carousel.Caption>
        <h3>Attack</h3>
        <p>Attack Your Enemy</p>
        </Carousel.Caption>
    </Carousel.Item>
    </Carousel>
    </div> 
    );
}