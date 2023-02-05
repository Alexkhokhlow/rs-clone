import Common from '../../../utils/common';

const logo = require('../../../../assets/startPage/svg/logo.svg') as string;

export default class StartPageHeader {
  public header: HTMLElement;

  private wrapper: HTMLElement;

  public logo: HTMLAnchorElement;

  private logoImg: HTMLImageElement;

  public links: HTMLElement;

  private logIn: HTMLAnchorElement;

  private trelloFree: HTMLAnchorElement;

  constructor() {
    this.header = Common.createDomNode('header', ['header']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'header__wrapper']);
    this.logo = Common.createDomNodeLink(['logo', 'logo__start'], 'home');
    this.logoImg = Common.createDomNodeImg(['logo__img'], logo);
    this.links = Common.createDomNode('div', ['links']);
    this.logIn = Common.createDomNodeLink(['login', 'login__start'], 'login', 'Log In');
    this.trelloFree = Common.createDomNodeLink(['signup__header'], 'signup', 'Get Trello for free');
  }

  public append() {
    this.logo.append(this.logoImg);
    this.links.append(this.logIn, this.trelloFree);
    this.wrapper.append(this.logo, this.links);
    this.header.append(this.wrapper);

    return this.header;
  }
}
