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
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 800,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 900,
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 680,
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};
