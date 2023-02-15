import Server from '../../server/server';
import Common from '../../utils/common';
import StartPageFooter from '../startPage/sections/footer';
import CreatingBoard from './createBoard/createBoard';
import Header from './header/header';
import MainWorkspace from './main/main';

type TDashboard = {
  name: string;
  color: string;
  pathName: string;
  access: boolean;
};

export default class Workspace {
  private workspace: HTMLElement;

  private header: Header;

  private main: MainWorkspace;

  private footer: StartPageFooter;

  public creatingBoard: CreatingBoard;

  private server: Server;

  private token: string | null;

  constructor() {
    this.workspace = Common.createDomNode('div', ['workspace__page']);
    this.creatingBoard = new CreatingBoard();
    this.header = new Header();
    this.main = new MainWorkspace();
    this.footer = new StartPageFooter();
    this.server = new Server();
    this.token = localStorage.getItem('token');
  }

  public append() {
    this.getDashboards();
    this.workspace.append(
      this.header.append(this.creatingBoard),
      this.main.append(),
      this.creatingBoard.append(),
      this.footer.append()
    );
    this.bindEvents();
    return this.workspace;
  }

  private async getDashboards() {
    if (this.token) {
      try {
        const dashboards = await this.server.getDashboards(this.token);
        for (let key in dashboards) {
          dashboards[key].forEach((data: TDashboard) => {
            this.renderBoard(data.name, data.color, data.pathName);
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  private bindEvents() {
    this.main.createButton.addEventListener('click', this.creatingBoard.openModal.bind(this.creatingBoard));
    this.creatingBoard.createButton.addEventListener('click', this.createBoard.bind(this));
  }

  private renderBoard(name: string, color: string, pathName: string) {
    const boardPreview = Common.createDomNode('div', ['board__preview']);
    boardPreview.setAttribute('data-pathName', pathName);
    boardPreview.style.background = color;
    const boardTitle = Common.createDOMNode('h3', ['board__preview__title'], name);
    boardPreview.append(boardTitle);
    this.main.boardsLayout.append(boardPreview);
    boardPreview.addEventListener('click', this.onOpenBoard);
  }

  onOpenBoard(event: Event) {
    const target = event.currentTarget as HTMLElement;
    const { pathname } = target.dataset;
    if (pathname) {
      window.location.pathname = `board/${pathname}`;
    }
  }

  private async createBoard(event: Event) {
    const data = {
      color: this.creatingBoard.board.style.background,
      name: this.creatingBoard.boardTitleInput.value,
      access: this.creatingBoard.visibility.value === 'Public',
    };
    if (this.token) {
      try {
        const dashboard: TDashboard = await this.server.createDashboard(this.token, data.name, data.color, data.access);
        this.creatingBoard.closeModal(event);
        this.creatingBoard.boardTitleInput.value = '';
        this.renderBoard(data.name, data.color, dashboard.pathName);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
