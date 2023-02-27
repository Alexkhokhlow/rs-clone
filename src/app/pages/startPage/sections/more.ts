import Lang from '../../../common/lang/lang';
import Common from '../../../utils/common';
import { articles } from '../constants/constants';

export default class More {
  private subtitle: HTMLElement;

  public section: HTMLElement;

  private wrapper: HTMLElement;

  private container: HTMLElement;

  private title: HTMLElement;

  private description: HTMLElement;

  private featuresWrapper: HTMLElement;

  constructor() {
    const text = new Lang()
    this.section = Common.createDomNode('section', ['more']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'more__wrapper']);
    this.container = Common.createDomNode('div', ['more__description__wrapper']);
    this.subtitle = Common.createDomNode('h3', ['more__subtitle'], text.text.more.subtitle);
    this.title = Common.createDomNode('h2', ['more__title'], text.text.more.title);
    this.description = Common.createDomNode(
      'p',
      ['more__description'],
      text.text.more.description
    );
    this.featuresWrapper = Common.createDomNode('div', ['features']);
  }

  private createFeatures() {
    articles.forEach((article) => {
      const wrapper = Common.createDomNode('article', ['feature']);
      const icon = Common.createDomNode('div', ['feature__icon']);
      icon.style.background = `url(${article.icon}) center center/contain no-repeat`;
      const title = Common.createDomNode('h3', ['feature__title'], article.title);
      const description = Common.createDomNode('p', ['feature__description'], article.description);
      wrapper.append(icon, title, description);
      this.featuresWrapper.append(wrapper);
    });
  }

  public append() {
    this.createFeatures();
    this.container.append(this.subtitle, this.title, this.description);
    this.wrapper.append(this.container, this.featuresWrapper);
    this.section.append(this.wrapper);

    return this.section;
  }
}
