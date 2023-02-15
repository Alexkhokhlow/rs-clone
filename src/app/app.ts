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

  creatingBoard: CreatingBoard;

  board: Board;

  errorPage: ErrorPage;

  user: UserPage;

  constructor() {
    this.body = document.body;
    this.startPage = new StartPage();
    this.autorisation = new Autorisation();
    this.workspace = new Workspace();
    this.creatingBoard = new CreatingBoard();
    this.errorPage = new ErrorPage();
    this.board = new Board();
    this.user = new UserPage();
  }

  async start() {
    this.openPage();
  }

  openPage() {
    const path = window.location.pathname;
    const routes = [
      /\/home\b/g,
      /\/login\b/g,
      /\/board\b/g,
      /\/workspace\b/g,
      /\/user\/([\w]+?)\b/g,
      /signup/g,
      /\/user\b/g,
    ];

    let flag = true;
    routes.forEach((route) => {
      const match = path.match(route);
      if (match) {
        flag = false;
        if (match[0].includes('home')) {
          this.body.append(this.startPage.append());
          return;
        }
        if (match[0].includes('login') || match[0].includes('signup')) {
          this.body.append(this.autorisation.render());
          return;
        }
        if (match[0].includes('workspace')) {
          this.body.append(this.workspace.append());
        }
        if (match[0].includes('board')) {
          this.body.append(this.board.container);
        }

        if (match[0].includes('user')) {
          this.body.append(this.user.render());
        }
      }
    });
    if (flag) {
      if (path === '/') {
        window.location.href = 'home';
      } else {
        this.body.append(this.errorPage.render());
      }
    }
  }
}
