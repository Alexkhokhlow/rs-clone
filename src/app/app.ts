import ErrorPage from './pages/404/404';
import Autorisation from './pages/autorisation/autorisation';
import Board from './pages/board/board';
import StartPage from './pages/startPage/startPage';
import UserPage from './pages/user/user';
import CreatingBoard from './pages/workspace/createBoard/createBoard';
import Workspace from './pages/workspace/workspace';

export default class App {
  body: HTMLElement;

  startPage: StartPage;

  autorisation: Autorisation;

  workspace: Workspace;

  board: Board;

  errorPage: ErrorPage;

  user: UserPage;

  constructor() {
    this.body = document.body;
    this.startPage = new StartPage();
    this.autorisation = new Autorisation();
    this.workspace = new Workspace();
    this.user = new UserPage();
    this.errorPage = new ErrorPage();
    this.board = new Board(this.workspace.creatingBoard);
  }

  async start() {
    await this.openPage();
  }

  async openPage() {
    let path = window.location.pathname;
    if (path[path.length - 1] === '/') {
      path = path.slice(0, -1);
    }
    let flag = true;

    if (this.isAuthorized()) {
      const routes = ['/workspace', '/board', '/user'];
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
            case '/user':
              this.body.append(this.user.render());
              break;
            default:
              this.body.append(this.errorPage.render());
          }
        } else if (/\/board\/([\w]+?)\b/g.test(path)) {
          this.body.append(await this.board.init(match[0].replace('/board/', '')));
        } else {
          this.body.append(this.errorPage.render());
        }
      });
      if (flag) {
        switch (path) {
          case '':
          case '/home':
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
