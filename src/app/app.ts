import ErrorPage from './pages/404/404';
import Autorisation from './pages/autorisation/autorisation';
import StartPage from './pages/startPage/startPage';
import CreatingBoard from './pages/workspace/createBoard/createBoard';
import Workspace from './pages/workspace/workspace';
import Server from './server/server';

export default class App {
  body: HTMLElement;

  startPage: StartPage;

  autorisation: Autorisation;

  workspace: Workspace;

  creatingBoard: CreatingBoard;

  errorPage: ErrorPage;

  constructor() {
    this.body = document.body;
    this.startPage = new StartPage();
    this.autorisation = new Autorisation();
    this.workspace = new Workspace();
    this.creatingBoard = new CreatingBoard();
    this.errorPage = new ErrorPage();
  }

  async start() {
    this.openPage();
    const server = new Server();
    try {
      {
        ('dsada');
      }
      const data = JSON.parse(await server.login('dsad', 'dsa'));
    } catch (error) {}
  }

  openPage() {
    const path = window.location.pathname;
    const routes = [/\/home\b/g, /\/login\b/g, /\/workspace\b/g, /\/user\/([\w]+?)\b/g, /signup/g];

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
