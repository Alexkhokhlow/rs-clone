import Swiper, { Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import App from '../../../app';
const app = new App();

const pagination = app.startPage.powerhouse.pagination();

const swiperAction = new Swiper(".action__swiper", {
  grabCursor: true,
  effect: 'slide',
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    900: {
      slidesPerView: 3,
    },
  },
  nested: true,
  allowTouchMove: true,
  touchAngle: 45,
  simulateTouch: true,
  spaceBetween: 30,
  modules: [Pagination],
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const swiperPowerhouse = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 40,
  modules: [Pagination, Scrollbar],
  pagination: {
    el: '.cards__wrapper',
    clickable: true,
    renderBullet(index: number, className: string) {
      return `<div class="${className}">${pagination[index].outerHTML}</div>`;
    },
  },
  keyboard: true,
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

export {swiperAction, swiperPowerhouse};
