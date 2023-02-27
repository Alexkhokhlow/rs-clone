import Common from '../../../utils/common';

export default class UserInfo {
  private container: HTMLElement;

  private closeButton: HTMLElement;

  private closeIcon: HTMLElement;

  private informationWrapper: HTMLElement;

  private icon: HTMLElement;

  private information: HTMLElement;

  private name: HTMLElement;

  private email: HTMLElement;

  private description: HTMLElement;

  public wrapper: HTMLElement;

  constructor(name: string, email: string, description: string) {
    this.wrapper = Common.createDomNode('div', ['about_user__wrapper']);
    this.container = Common.createDomNode('div', ['about_user']);
    this.closeButton = Common.createDomNode('div', ['close__button__wrapper']);
    this.closeIcon = Common.createDomNode('div', ['close__button']);
    this.informationWrapper = Common.createDomNode('div', ['about_user__information__wrapper']);
    this.icon = Common.createDomNode('div', ['about_user__icon'], Common.getAbbreviation(name));
    this.information = Common.createDomNode('div', ['about_user__information']);
    this.name = Common.createDomNode('h3', ['user__name'], name);
    this.email = Common.createDomNode('h4', ['user__email'], email);
    this.description = Common.createDomNode('p', ['user__description'], description);

    this.append();
    this.closeButton.addEventListener('click', this.closeModal.bind(this));
  }

  private append() {
    this.closeButton.append(this.closeIcon);
    this.information.append(this.name, this.email, this.description);
    this.informationWrapper.append(this.icon, this.information);
    this.container.append(this.closeButton, this.informationWrapper);
    this.wrapper.append(this.container);
  }

  public openModal(parent: HTMLElement) {
    parent.append(this.wrapper);
  }

  private closeModal(event: Event) {
    const classes = (event.target as HTMLElement).classList;
    if (classes.contains('close__button__wrapper') || classes.contains('close__button')) {
      this.wrapper.remove();
    }
  }
}
