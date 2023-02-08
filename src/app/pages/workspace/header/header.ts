import Common from "../../../utils/common";

export default class Header {
  public header: HTMLElement;

  private wrapper: HTMLElement;

  private logo: HTMLAnchorElement;

  private logoImg: HTMLElement;

  private navigation: HTMLElement;

  public workspace: HTMLButtonElement;

  public create: HTMLButtonElement;

  public user: HTMLButtonElement;

  private userImg: HTMLElement;

  constructor() {
    this.header = Common.createDomNode('header', ['header', 'workspace__header']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'wrapper__header']);
    this.logo = Common.createDomNodeLink(['logo', 'header__logo'], '/');
    this.logoImg = Common.createDomNode('div', ['header__logo__img']);
    this.navigation = Common.createDomNode('nav', ['navigation', 'header__navigation']);
    this.workspace = Common.createDomNodeButton(['header__button', 'workspace__button'], 'Workspace');
    this.create = Common.createDomNodeButton(['header__button', 'create__button'], 'Create');
    this.user = Common.createDomNodeButton(['header__button', 'user__button']);
    this.userImg = Common.createDomNode('div', ['user__image']);
  }

  public append() {
    this.logo.append(this.logoImg);
    this.navigation.append(this.logo, this.workspace, this.create);
    this.user.append(this.userImg);
    this.wrapper.append(this.navigation, this.user);
    this.header.append(this.wrapper);

    return this.header;
  }
}
