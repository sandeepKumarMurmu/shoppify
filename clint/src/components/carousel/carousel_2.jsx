import "./carousel.css";
import { Carousel } from "react-bootstrap";
export const AppearCarousel = ({ image }) => {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <img className="d-block w-100" src={image[0]} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image[1]} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image[2]} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </>
  );
};
