import React from "react";
import { Carousel } from "react-bootstrap";
import first from "/images/1.jpg";
import second from "/images/2.jpg";
import third from "/images/third.jpg";

const CarouselComponent = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={first} alt="First slide" />
        <Carousel.Caption className="carousel-caption">
          <h3>Manage</h3>
          <p>Manage your project effectively</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src={second}
          alt="Second slide"
        />
        <Carousel.Caption className="carousel-caption">
          <h3>Organize</h3>
          <p>Organize the way you want</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src={third}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Collaborate</h3>
          <p>Now make you peers to collaborate</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
