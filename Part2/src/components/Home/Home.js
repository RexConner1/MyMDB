import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import './Home.css'

class Home extends Component {
    render() {
        const carouselTiming = 5000;
        let  {media} = this.props
        let posterURL = "https://image.tmdb.org/t/p/w780/" ; 
         

        return (
            <div className="Carousel">
                <Carousel>
                    <Carousel.Item interval={carouselTiming}>
                        {media.length> 0 &&
                        <img
                        className="d-block w-100"
                         src={posterURL + this.props.media[0].poster_path}
                        alt="First slide"
                        /> }

                        <Carousel.Caption>
                        <h3>Playing Now</h3>
                        <p>In Theaters Near You</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={carouselTiming}>

                        {media.length> 0 && <img
                        className="d-block w-100"
                         src={posterURL + this.props.media[1].poster_path}
                        alt="Second slide"
                        />}

                        <Carousel.Caption>
                        <h3>Playing Now</h3>
                        <p>In Theaters Near You</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={carouselTiming}>

                        {media.length> 0 && <img
                        className="d-block w-100"
                         src={posterURL + this.props.media[2].poster_path}
                        alt="Third slide"
                        />}

                        <Carousel.Caption>
                        <h3>Playing Now</h3>
                        <p>In Theaters Near You</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default Home;