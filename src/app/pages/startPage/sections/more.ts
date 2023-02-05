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
    this.section = Common.createDomNode('section', ['more']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'more__wrapper']);
    this.container = Common.createDomNode('div', ['more__description__wrapper']);
    this.subtitle = Common.createDomNode('h3', ['more__subtitle'], 'POWERFUL WAYS TO GROW');
    this.title = Common.createDomNode('h2', ['more__title'], 'Do more with Trello');
    this.description = Common.createDomNode(
      'p',
      ['more__description'],
      "Trello's intuitive features give any team the ability to quickly set up and customize workflows for just about anything."
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
