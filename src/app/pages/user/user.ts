import Common from '../../utils/common';
import StartPageFooter from '../startPage/sections/footer';
import Header from '../workspace/header/header';

export default class UserPage {
  header: HTMLElement;

  main: HTMLElement;

  footer: HTMLElement;

  userInfo: HTMLElement;

  userImg: HTMLElement;

  userDescription: HTMLElement;

  name: HTMLElement;

  mail: HTMLElement;

  constructor() {
    this.main = Common.createDomNode('section', ['user__page']);
    this.header = new Header().append();
    this.userInfo = Common.createDomNode('div', ['user__info']);
    this.userImg = Common.createDomNode('div', ['user__image']);
    this.userDescription = Common.createDomNode('div', ['user__description']);
    // получать по токену информацию (name, mail);
    this.name = Common.createDomNode('p', ['user__name', 'subtitle'], 'Name');
    this.mail = Common.createDomNode('p', ['user__mail', 'subtitle'], 'mail@mail.ru');
    this.footer = new StartPageFooter().append();
  }

  public render() {
    this.main.append(this.header, this.userInfo, this.footer);
    this.userInfo.append(this.userImg, this.userDescription);
    this.userDescription.append(this.name, this.mail);

    this.addHandlers();
    return this.main;
  }

  private addHandlers() {}
}
