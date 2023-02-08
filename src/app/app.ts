import StartPage from './pages/startPage/startPage';
import Login from './pages/login/login';
import Workspace from './pages/workspace/workspace';
import CreatingBoard from './pages/workspace/createBoard/createBoard';

export default class App {
  body: HTMLElement;

  startPage: StartPage;

  login: Login;

  workspace: Workspace;

  creatingBoard: CreatingBoard;

  constructor() {
    this.body = document.body;
    this.startPage = new StartPage();
    this.login = new Login();
    this.workspace = new Workspace();
    this.creatingBoard = new CreatingBoard();
  }

  start() {
    // this.openPage();
    this.body.append(this.creatingBoard.append());

  }

  openPage() {
    const path = window.location.pathname;
    const routes = [/\/home\b/g, /\/login\b/g, /\/workspace\b/g];
    let flag = true;
    routes.forEach((route) => {
      const match = path.match(route);
      if (match) {
        flag = false;
        if (match[0].includes('home')) {
          this.body.append(this.startPage.append());
          return;
        }
        if (match[0].includes('login')) {
          this.body.append(this.login.login);
          return;
        }
        if (match[0].includes('workspace')) {
          this.body.append(this.workspace.append());
          return;
        }
      }
    });
    if (flag) {
      if (path === '/') {
        window.location.href = 'home';
      } else {
        this.body.innerHTML = 'error';
      }
    }
  }
}
