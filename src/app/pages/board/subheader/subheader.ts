import Common from '../../../utils/common';
import Server from '../../../server/server';

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
    this.token = localStorage.getItem('token');
    this.server = new Server();
    this.subheader = Common.createDomNode('div', ['subheader']);
    this.wrapper = Common.createDomNode('div', ['subheader__wrapper']);
    this.title = Common.createDomNode('h1', ['board__title']);
    this.visibility = Common.createDomNode('div', ['board__visibility']);
    this.shareWrapper = Common.createDomNode('div', ['share__wrapper']);
    this.share = Common.createDomNodeButton(['share'], 'Share');
    this.members = Common.createDOMNode('div', ['share__members']);

    this.append();
  }

  private append() {
    this.wrapper.append(this.title, this.visibility);
    this.shareWrapper.append(this.members, this.share);
    this.subheader.append(this.wrapper, this.shareWrapper);
    this.getUser();
  }

  private async getUser() {
    if (this.token) {
      const response = await this.server.getUserInfo(this.token);
      Common.createUserIcon(this.members, response.name);
      (this.members.firstChild as HTMLElement).classList.add('user__subheader');
    }
  }
}
