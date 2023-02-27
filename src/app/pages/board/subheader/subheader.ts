import Lang from '../../../common/lang/lang';
import { TUser } from '../../../../types/types';
import Server from '../../../server/server';
import Common from '../../../utils/common';
import UserInfo from '../userInfo/userInfo';

export default class Subheader {
  public subheader: HTMLElement;

  public title: HTMLElement;

  public visibility: HTMLElement;

  private wrapper: HTMLElement;

  private shareWrapper: HTMLElement;

  public share: HTMLButtonElement;

  public members: HTMLElement;

  private token: string | null;

  private server: Server;

  constructor() {
    const text = new Lang();
    this.token = localStorage.getItem('token');
    this.server = new Server();
    this.subheader = Common.createDomNode('div', ['subheader']);
    this.wrapper = Common.createDomNode('div', ['subheader__wrapper']);
    this.title = Common.createDomNode('h1', ['board__title']);
    this.visibility = Common.createDomNode('div', ['board__visibility']);
    this.shareWrapper = Common.createDomNode('div', ['share__wrapper']);
    this.share = Common.createDomNodeButton(['share'], text.text.share.share);
    this.members = Common.createDOMNode('div', ['share__members']);

    this.append();
  }

  private async append() {
    this.wrapper.append(this.title, this.visibility);
    this.shareWrapper.append(this.members, this.share);
    this.subheader.append(this.wrapper, this.shareWrapper);
   // await this.getUser();
  }

  // private async getUser() {
  //   if (this.token) {
  //     const response = (await this.server.getUserInfo(this.token)) as TUser;
  //     const user = Common.createUserIcon(response.email, response.name, 'user__you', response.color);
  //     this.members.append(user);
  //     user.addEventListener('click', () => {
  //       this.showInfo(response);
  //     });
  //   }
  // }

  // private showInfo(response: Partial<TUser>) {
  //   const userInfo = new UserInfo(response.name as string, response.email as string, response.info as string);
  //   userInfo.openModal(this.members);
  // }
}
