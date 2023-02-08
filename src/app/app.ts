import ErrorPage from './pages/404/404';
import Login from './pages/login/login';
import StartPage from './pages/startPage/startPage';
import User from './pages/user/user';

export default class App {
  body: HTMLElement;

  startPage: StartPage;

  login: Login;

  user: User;

  errorPage: ErrorPage;

  constructor() {
    this.body = document.body;
    this.startPage = new StartPage();
    this.login = new Login();
    this.user = new User();
    this.errorPage = new ErrorPage();
  }

  start() {
    this.openPage();
  }

  openPage() {
    const path = window.location.pathname;
    const routes = [/\/home\b/g, /\/login\b/g, /\/user\/([\w]+?)\b/g];
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
        this.body.append(this.errorPage.render());
      }
    }
  }
}
