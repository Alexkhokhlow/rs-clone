import { TUser } from '../../../../types/types';
import Lang from '../../../common/lang/lang';
import Server from '../../../server/server';
import Common from '../../../utils/common';
import CreatingBoard from '../createBoard/createBoard';
import UserModal from './userModal';

export default class Header {
  public header: HTMLElement;

  private wrapper: HTMLElement;

  private logo: HTMLAnchorElement;

  private logoImg: HTMLElement;

  private navigation: HTMLElement;

  public workspace: HTMLButtonElement;

  public create: HTMLButtonElement;

  public user: HTMLElement;

  private userModal: HTMLElement;

  private server: Server;

  token: string | null;

  constructor() {
    const text = new Lang();
    this.token = localStorage.getItem('token');
    this.header = Common.createDomNode('header', ['header', 'main__header']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'wrapper__header']);
    this.logo = Common.createDomNodeLink(['logo', 'header__logo'], '/');
    this.logoImg = Common.createDomNode('div', ['header__logo__img']);
    this.navigation = Common.createDomNode('nav', ['navigation', 'header__navigation']);
    this.workspace = Common.createDomNodeButton(['header__button'], text.text.workspaceTitle);
    this.create = Common.createDomNodeButton(['header__button'], text.text.create);
    this.user = Common.createDomNodeButton(['header__button', 'user__button']);
    this.userModal = new UserModal().render();
    this.server = new Server();
  }

  public append(creatingBoard: CreatingBoard) {
    this.logo.append(this.logoImg);
    this.navigation.append(this.logo, this.workspace, this.create);
    this.wrapper.append(this.navigation, this.user);
    this.header.append(this.wrapper, this.userModal);
    if (creatingBoard) {
      this.create.addEventListener('click', creatingBoard.openModal.bind(creatingBoard));
    }
    this.getUser();
    this.addHandlers();
    return this.header;
  }

  private addHandlers() {
    this.workspace.addEventListener('click', () => {
      window.location.pathname = 'workspace';
    });

    this.user.addEventListener('click', () => {
      this.userModal.classList.toggle('hidden');
    });
  }

  private async getUser() {
    if (this.token) {
      const response = await this.server.getUserInfo(this.token);
      const user = Common.createUserIcon(response.email, response.name, 'user__header', response.color);
      this.user.append(user);
    }
  }
}
