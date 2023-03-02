import App from './app/app';
import './scss/global.scss';
import { swiperAction, swiperPowerhouse } from './app/pages/startPage/constants/swiper';

const app = new App();
await app.start();

swiperPowerhouse.init();
swiperAction.init();
