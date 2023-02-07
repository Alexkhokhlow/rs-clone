import StartPage from './pages/startPage/startPage';
import Login from './pages/login/login';
import Workspace from './pages/workspace/workspace';

export default class App {
  body: HTMLElement;

  startPage: StartPage;

  login: Login;

  workspace: Workspace;

  constructor() {
    this.body = document.body;
    this.startPage = new StartPage();
    this.login = new Login();
    this.workspace = new Workspace();
  }

  start() {
    // this.openPage();
    this.body.append(this.workspace.append());

  }

  openPage() {
    const path = window.location.pathname;
    const routes = [/\/home\b/g, /\/login\b/g, /\/workspace\/([\w]+?)\b/g];
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
          // this.workspace.init(match[0]);
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
