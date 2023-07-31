import Lang from '../../../common/lang/lang';
import Common from '../../../utils/common';
import { actions } from '../constants/constants';

export default class Action {
  public section: HTMLElement;

  private wrapper: HTMLElement;

  private subtitle: HTMLElement;

  private title: HTMLElement;

  private swiper: HTMLElement;

  private swiperWrapper: HTMLElement;

  private swiperPagination: HTMLElement;

  constructor() {
    const text = new Lang();
    this.section = Common.createDomNode('section', ['action']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'action__wrapper']);
    this.subtitle = Common.createDomNode('h3', ['subtitle', 'action__subtitle'], text.text.actions.subtitle);
    this.title = Common.createDomNode('h2', ['title', 'action__title'], text.text.actions.title);
    this.swiper = Common.createDomNode('div', ['action__swiper']);
    this.swiperWrapper = Common.createDomNode('div', ['swiper-wrapper']);
    this.swiperPagination = Common.createDomNode('div', ['swiper-pagination']);
    this.createSwiper();
  }

  public append() {
    this.wrapper.append(this.subtitle, this.title, this.swiper);
    this.swiper.append(this.swiperWrapper, this.swiperPagination);
    this.section.append(this.wrapper);

    return this.section;
  }

  private createSwiper() {
    actions.forEach((item) => {
      const wrapper = Common.createDomNode('article', ['swiper-slide']);
      const colorLine = Common.createDomNode('div', ['action__color']);
      colorLine.style.background = item.color;
      const descriptionWrapper = Common.createDomNode('div', ['action__description__wrapper']);
      const icon = Common.createDomNode('div', ['action__icon']);
      icon.style.background = `url(${item.icon}) center center/contain no-repeat, white`;
      const title = Common.createDomNode('h2', ['action__card__title'], item.title);
      const description = Common.createDomNode('p', ['action__card__description'], item.description);
      descriptionWrapper.append(icon, title, description);
      wrapper.append(colorLine, descriptionWrapper);
      this.swiperWrapper.append(wrapper);
    });
  }
}
