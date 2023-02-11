import ErrorPage from './pages/404/404';
import Autorisation from './pages/autorisation/autorisation';
import Board from './pages/board/board';
import StartPage from './pages/startPage/startPage';
import CreatingBoard from './pages/workspace/createBoard/createBoard';
import Workspace from './pages/workspace/workspace';

export default class App {
  body: HTMLElement;

  startPage: StartPage;

  autorisation: Autorisation;

  workspace: Workspace;

  creatingBoard: CreatingBoard;

  board: Board;

  errorPage: ErrorPage;

  constructor() {
    this.body = document.body;
    this.startPage = new StartPage();
    this.autorisation = new Autorisation();
    this.workspace = new Workspace();
    this.creatingBoard = new CreatingBoard();
    this.errorPage = new ErrorPage();
    this.board = new Board();
  }

  async start() {
    this.openPage();
  }

  openPage() {
    let path = window.location.pathname;
    if (path[path.length - 1] === '/') {
      path = path.slice(0, -1);
    }
    let flag = true;

    if (this.isAuthorized()) {
      const routes = ['/workspace', '/board'];
      routes.forEach((route) => {
        if (route === path) {
          flag = false;
          switch (path) {
            case '/workspace':
              this.body.append(this.workspace.append());
              break;
            case '/board':
              this.body.append(this.board.container);
              break;
            default:
              this.body.append(this.errorPage.render());
          }
        }
      });
      if (flag) {
        switch (path) {
          case '':
            window.location.href = 'workspace';
            break;
          default:
            this.body.append(this.errorPage.render());
        }
      }
    } else {
      const routes = ['/home', '/login', '/signup'];
      routes.forEach((route) => {
        if (route === path) {
          flag = false;
          switch (path) {
            case '/home':
              this.body.append(this.startPage.append());
              break;
            case '/login':
            case '/signup':
              this.body.append(this.autorisation.render());
              break;
            default:
              this.body.append(this.errorPage.render());
          }
        }
      });
      if (flag) {
        switch (path) {
          case '':
            window.location.href = 'home';
            break;
          default:
            this.body.append(this.errorPage.render());
        }
      }
    }
  }

  private isAuthorized() {
    return !localStorage.getItem('token');
  }
}
