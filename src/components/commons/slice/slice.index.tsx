import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import type { ReactNode } from 'react';

const settings = {
	dots: true,
	infinite: true,
	autoplay: true,
	speed: 500,
	autoplaySpeed: 5000,
	slidesToShow: 1,
	slidesToScroll: 1,
};

export function MySlider({ children }: { children: ReactNode }) {
	return <Slider {...settings}>{children}</Slider>;
}
