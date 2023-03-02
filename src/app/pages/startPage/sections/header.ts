import Lang from '../../../common/lang/lang';
import Common from '../../../utils/common';

const logo = require('../../../../assets/startPage/svg/logo.svg') as string;

export default class StartPageHeader {
  public header: HTMLElement;

  private wrapper: HTMLElement;

  public logo: HTMLElement;

  private logoImg: HTMLImageElement;

  public links: HTMLElement;

  private logIn: HTMLElement;

  private trelloFree: HTMLElement;

  constructor() {
    const text = new Lang();
    this.header = Common.createDomNode('header', ['header']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'header__wrapper']);
    this.logo = Common.createDomNode('span', ['logo', 'logo__start']);
    this.logoImg = Common.createDomNodeImg(['logo__img'], logo);
    this.links = Common.createDomNode('div', ['links']);
    this.logIn = Common.createDomNode('span', ['login', 'login__start'], text.text.header.logIn);
    this.trelloFree = Common.createDomNode('span', ['signup__header'], text.text.header.trelloFree);
  }

  public append() {
    this.logo.append(this.logoImg);
    this.links.append(this.logIn, this.trelloFree);
    this.wrapper.append(this.logo, this.links);
    this.header.append(this.wrapper);
    this.addHandlers();

    return this.header;
  }

  private addHandlers() {
    this.logIn.addEventListener('click', () => {
      window.location.pathname = 'login';
    });

    this.trelloFree.addEventListener('click', () => {
      window.location.pathname = 'signup';
    });

    this.logo.addEventListener('click', () => {
      window.location.pathname = 'home';
    });
  }
}
