import { TUser } from '../../../../types/types';
import Server from '../../../server/server';
import Common from '../../../utils/common';

export default class UserModal {
  modal: HTMLElement;

  title: HTMLElement;

  userInfo: HTMLElement;

  userDescription: HTMLElement;

  name: HTMLElement;

  mail: HTMLElement;

  accountSwitcher: HTMLButtonElement;

  profileBtn: HTMLButtonElement;

  logOutBtn: HTMLButtonElement;

  server: Server;

  token: string;

  constructor() {
    this.modal = Common.createDomNode('div', ['user__modal', 'hidden']);
    this.title = Common.createDomNode('h2', ['user__title', 'title'], 'Account');
    this.userInfo = Common.createDomNode('div', ['user__info']);
    // this.userImg = Common.createDomNode('div', ['user__image']);
    this.userDescription = Common.createDomNode('div', ['user__description']);
    this.server = new Server();
    this.token = localStorage.getItem('token') as string;
    this.name = Common.createDomNode('p', ['user__name', 'subtitle']);
    this.mail = Common.createDomNode('p', ['user__mail', 'subtitle']);

    this.accountSwitcher = Common.createDomNodeButton(['user__btn'], 'Switch account');
    this.profileBtn = Common.createDomNodeButton(['user__btn'], 'Profile');
    this.logOutBtn = Common.createDomNodeButton(['user__btn'], 'Log out');
  }

  async init() {
    const data = await this.server.getUserInfo(this.token) as TUser;
    const user = Common.createUserIcon(data.email, data.name, 'user__image', data.color);
    this.userInfo.insertBefore(user, this.userDescription);
    this.name.textContent = data.name;
    this.mail.textContent = data.email;
  }

  public render() {
    this.modal.append(this.title, this.userInfo, this.accountSwitcher, this.profileBtn, this.logOutBtn);
    this.userInfo.append(this.userDescription);
    this.userDescription.append(this.name, this.mail);
    this.init();
    this.addHandlers();
    return this.modal;
  }

  private addHandlers() {
    this.accountSwitcher.addEventListener('click', () => this.leaveAccount());
    this.logOutBtn.addEventListener('click', () => this.leaveAccount());

    this.profileBtn.addEventListener('click', () => {
      window.location.pathname = 'user';
    });
  }

  private leaveAccount() {
    localStorage.removeItem('token');
    localStorage.removeItem('data');
    window.location.pathname = 'login';
  }

  private async createUserIcon() {
    const response  = await this.server.getUserInfo(this.token);
    
  }
}
