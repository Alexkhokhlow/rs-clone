import StartPage from './pages/startPage/startPage';
import Login from './pages/login/login';
import User from './pages/user/user';

export default class App {
  body: HTMLElement;

  startPage: StartPage;

  login: Login;

  user: User;

  constructor(){
    this.body = document.body;
    this.startPage = new StartPage();
    this.login = new Login();
    this.user = new User();
  }

  start()  {
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
          return;
        }
      }
    });
    if (flag) {
      if (path === '/') {
        this.body.append(this.startPage.append());
      } else {
        this.body.innerHTML = 'error';
      }
    }
  }
}
