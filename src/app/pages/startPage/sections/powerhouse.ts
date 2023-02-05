import Common from '../../../utils/common';
import { cardsDescription } from '../constants/constants';

export default class Powerhouse {
  private subtitle: HTMLElement;

  public section: HTMLElement;

  private wrapper: HTMLElement;

  private title: HTMLElement;

  private description: HTMLElement;

  private container: HTMLElement;

  private swiper: HTMLElement;

  public cardsWrapper: HTMLElement;

  private imagesWrapper: HTMLElement;

  private swiperWrapper: HTMLElement;

  private swiperScrollBar: HTMLElement;

  constructor() {
    this.section = Common.createDomNode('section', ['powerhouse']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'powerhouse__wrapper']);
    this.container = Common.createDomNode('div', ['powerhouse__description__wrapper']);
    this.subtitle = Common.createDomNode('h3', ['powerhouse__subtitle'], 'Trello 101');
    this.title = Common.createDomNode('h2', ['powerhouse__title'], 'A productivity powerhouse');
    this.description = Common.createDomNode(
      'p',
      ['powerhouse__description'],
      "Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who's doing what and what needs to get done."
    );
    this.swiperWrapper = Common.createDomNode('div', ['swiper__wrapper']);
    this.swiper = Common.createDomNode('div', ['swiper']);
    this.cardsWrapper = Common.createDomNode('div', ['cards__wrapper', 'swiper-pagination']);
    this.imagesWrapper = Common.createDomNode('div', ['images__wrapper', 'swiper-wrapper']);
    this.swiperScrollBar = Common.createDomNode('div', ['swiper-scrollbar']);
    this.createSlider();
    this.append();
  }

  private createSlider() {
    cardsDescription.forEach((item) => {
      const image = Common.createDomNodeImg(['slider__image', 'swiper-slide'], item.img);
      this.imagesWrapper.append(image);
    });
  }

  public pagination() {
    const arr = [] as HTMLElement[];
    cardsDescription.forEach((item) => {
      const cardWrapper = Common.createDomNode('div', ['card__wrapper']);
      const cardTitle = Common.createDomNode('h3', ['card__title'], item.title);
      const cardDescription = Common.createDomNode('p', ['card__description'], item.description);
      cardWrapper.append(cardTitle, cardDescription);
      arr.push(cardWrapper);
    });
    return arr;
  }

  private append() {
    this.swiper.append(this.imagesWrapper);
    this.container.append(this.subtitle, this.title, this.description);
    this.swiperWrapper.append(this.cardsWrapper, this.swiper, this.swiperScrollBar,);
    this.wrapper.append(this.container, this.swiperWrapper);
    this.section.append(this.wrapper);
  }
}
