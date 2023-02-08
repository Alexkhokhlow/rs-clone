import Autorisation from './pages/autorisation/autorisation';
import StartPage from './pages/startPage/startPage';
import User from './pages/user/user';

export default class App {
  body: HTMLElement;

  startPage: StartPage;

  autorisation: Autorisation;

  user: User;

  constructor() {
    this.body = document.body;
    this.startPage = new StartPage();
    this.autorisation = new Autorisation();
    this.user = new User();
  }

  start() {
    this.openPage();
  }

  openPage() {
    const path = window.location.pathname;
    const routes = [/\/home\b/g, /\/login\b/g, /\/user\/([\w]+?)\b/g, /signup/g];

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
        if (match[0].includes('user')) {
          this.user.init(match[0]);
          this.body.append(this.user.user);
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
