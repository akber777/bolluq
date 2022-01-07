import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import PropTypes from "prop-types";
import "../../assets/css/_multiSlider.scss";

const MultiSlider = ({ items, title, id }) => {
  return (
    <div className="multiSlider" id={id}>
      <h2 className="title">{title}</h2>
      <Splide
        options={{
          gap: "39px",
          perPage: 4,
          type: "loop",
          interval: 3000,
          autoplay: true,
          pagination: false,
          arrows: items.length > 4 ? true : false,
          breakpoints: {
            1265: {
              perPage: 2,
            },
            992: {
              perPage: 1,
            },
          },
        }}
      >
        {items.map((item) => (
          <SplideSlide key={item.id}>
            <div className="productSlider__items">
              <div className="productSlider__items--img">
                <a href={item?.link} target={"_blank"}>
                  <img id={id} src={item.image} alt={item.title} />
                </a>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

MultiSlider.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default MultiSlider;
