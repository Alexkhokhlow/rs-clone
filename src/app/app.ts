import ErrorPage from './pages/404/404';
import Autorisation from './pages/autorisation/autorisation';
import Board from './pages/board/board';
import StartPage from './pages/startPage/startPage';
import Workspace from './pages/workspace/workspace';
import Server from './server/server';

export default class App {
  body: HTMLElement;

  startPage: StartPage;

  autorisation: Autorisation;

  workspace: Workspace;

  board: Board;

  errorPage: ErrorPage;

  constructor() {
    this.body = document.body;
    this.startPage = new StartPage();
    this.autorisation = new Autorisation();
    this.workspace = new Workspace();
    this.errorPage = new ErrorPage(this.workspace.creatingBoard);
    this.board = new Board(this.workspace.creatingBoard);
  }

  async start() {
    await this.openPage();
    const server = new Server();
    const data = await server.signGoogle();
    console.log(data);
  }

  async openPage() {
    const path = window.location.pathname;
    const routes = [
      /\/home\b/g,
      /\/login\b/g,
      /\/board\/([\w]+?)\b/g,
      /\/workspace\b/g,
      /\/user\/([\w]+?)\b/g,
      /signup/g,
    ];

    let flag = true;
    routes.forEach(async (route) => {
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
          this.body.append(await this.board.init(match[0].replace('/board/', '')));
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
