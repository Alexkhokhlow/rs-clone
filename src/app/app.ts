import Home from './pages/home/home';
import Login from './pages/login/login';
import User from './pages/user/user';

export default class App {
  home: Home;
  login: Login;
  body: HTMLElement;
  user: User;

  constructor() {
    this.home = new Home();
    this.login = new Login();
    this.user = new User();
    this.body = document.body;
  }

  start() {
    this.openPage();
  }

  openPage() {
    console.log('fsdfsd');
    const path = window.location.pathname;
    const routes = [/home/g, /login/g, /user\/([\w]+?)\b/g];
    let flag = true;
    routes.forEach((route) => {
      const match = path.match(route);
      if (match) {
        flag = false;
        if (match[0].includes('home')) {
          this.body.append(this.home.home);
          return;
        }
        if (match[0].includes('login')) {
          this.body.append(this.login.login);
          return;
        }
        if (match[0].includes('user')) {
          this.body.append(this.user.user);
          return;
        }
      }
    });
    if (flag) {
      if (path === '/') {
        this.body.append(this.home.home);
      } else {
        this.body.innerHTML = 'error';
      }
    }
  }
}
