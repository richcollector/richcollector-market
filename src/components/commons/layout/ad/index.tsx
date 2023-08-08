import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const breakpoints = [768, 1024];

const [Phone, Monitor] = breakpoints;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  background-color: rgb(47, 78, 124, 0.1);
  padding: 0;
  margin: 0;

  @media screen and (max-width: ${Phone - 1}px) {
    display: none;
  }
`;

const SliderItem = styled.img`
  width: 1320px;
  height: 500px;
  margin: auto;

  @media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
    height: 300px;
    width: 100vw;
    min-width: fit-content;
  }
`;

export default function LayoutBannerUI(): JSX.Element {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Wrapper>
      <Slider {...settings}>
        <div>
          <SliderItem src="/shoes.jpg" />
        </div>
        <div>
          <SliderItem src="/sports.jpg" />
        </div>
      </Slider>
    </Wrapper>
  );
}
