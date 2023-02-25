import Common from "../../../utils/common";

export default class UserInfo {
  public container: HTMLElement;

  private closeIcon: HTMLElement;

  private informationWrapper: HTMLElement;

  private icon: HTMLElement;

  private information: HTMLElement;

  private name: HTMLElement;

  private email: HTMLElement;

  private description: HTMLElement;

  constructor() {
    this.container = Common.createDomNode('div', ['about_user']);
    this.closeIcon = Common.createDomNode('span', ['close__button']);
    this.informationWrapper = Common.createDomNode('div', ['user__information__wrapper']);
    this.icon = Common.createDomNode('span', ['about_user__icon']);
    this.information = Common.createDomNode('div', ['user__information']);
    this.name = Common.createDomNode('h3', ['user__name']);
    this.email = Common.createDomNode('h4', ['user__email'], localStorage.getItem('data')!);
    this.description = Common.createDomNode('p', ['user__description']);

    this.append();
  }

  private append() {
    this.information.append(this.name, this.email, this.description);
    this.informationWrapper.append(this.icon, this.information);
    this.container.append(this.closeIcon, this.informationWrapper);
  }
}
