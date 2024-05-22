import { settingsBasic, settingsAdvanced } from "@/types/types";

export const settings: settingsBasic = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

export const settings2: settingsAdvanced = {
  dots: true,
  infinite: true,
  speed: 1500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1500,
  responsive: [
    {
      breakpoint: 1450,
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 900,
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
