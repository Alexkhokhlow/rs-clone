import Common from '../../utils/common';
const logo = require('../../../assets/startPage/svg/logo.svg');

export default class StartPageHeader {
  header: HTMLElement;
  logo: HTMLAnchorElement;
  logoImg: HTMLImageElement;
  links: HTMLElement;
  logIn: HTMLAnchorElement;
  trelloFree: HTMLAnchorElement;
  
  constructor() {
    this.header = Common.createDomNode('header', ['header']);
    this.logo = Common.createDomNodeLink(['logo', 'logo__start'], 'home');
    this.logoImg = Common.createDomNodeImg(['logo__img'], logo);
    this.links = Common.createDomNode('div', ['links']);
    this.logIn = Common.createDomNodeLink(['login', 'login__start'], 'login', 'Log In');
    this.trelloFree = Common.createDomNodeLink(['signup__header'], 'signup', 'Get Trello for free');
    this.append();
  }

  private append() {
    this.logo.append(this.logoImg);
    this.links.append(this.logIn, this.trelloFree);
    this.header.append(this.logo, this.links);
  }
}
