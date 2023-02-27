import ErrorPage from './pages/404/404';
import Autorisation from './pages/autorisation/autorisation';
import Board from './pages/board/board';
import StartPage from './pages/startPage/startPage';
import UserPage from './pages/user/user';
import Workspace from './pages/workspace/workspace';
import Server from './server/server';

export default class App {
  private body: HTMLElement;

  private startPage: StartPage;

  private autorisation: Autorisation;

  private workspace: Workspace;

  private board: Board;

  private errorPage: ErrorPage;

  private user: UserPage;

  private server: Server;

  constructor() {
    this.body = document.body;
    this.startPage = new StartPage();
    this.autorisation = new Autorisation();
    this.workspace = new Workspace();
    this.user = new UserPage(this.workspace.creatingBoard);
    this.errorPage = new ErrorPage(this.workspace.creatingBoard);
    this.board = new Board(this.workspace.creatingBoard);
    this.server = new Server();
  }

  public async start() {
    await this.openPage();
  }

  private async openPage() {
    let path = window.location.pathname;
    if (path[path.length - 1] === '/') {
      path = path.slice(0, -1);
    }
    let flag = true;

    if (this.isAuthorized()) {
      const routes = ['/workspace', '/board', '/user'];
      if (/\/board\/([\w]+?)\b/g.test(path)) {
        flag = false;
        try {
          this.body.append(await this.board.init(path.replace('/board/', '')));
        } catch (e) {
          console.log(e);
          this.body.append(this.errorPage.render());
        }
      } else {
        routes.forEach(async (route) => {
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
                this.body.append(await this.user.render());
                break;
              default:
                this.body.append(this.errorPage.render());
            }
          }
        });
      }
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
          case '': {
            const { hash } = window.location;
            if (hash.includes('token=')) {
              localStorage.setItem('token', hash.replace(/#token=/, ''));
              window.location.hash = '';
              window.location.pathname = '/workspace';
            } else {
              window.location.pathname = '/home';
            }
            break;
          }
          default:
            this.body.append(this.errorPage.render());
        }
      }
    }
  }

  private isAuthorized() {
    return !!localStorage.getItem('token');
  }
}
