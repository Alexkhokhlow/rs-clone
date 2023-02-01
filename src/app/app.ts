import Home from './pages/home/home';
import Login from './pages/login/login';

export default class App {
  home: Home;
  login: Login;
  body: HTMLElement;
  constructor() {
    this.home = new Home();
    this.login = new Login();
    this.body = document.body;
  }

  start() {
    this.openPage();
  }

  openPage() {
    const path = window.location.pathname;
    switch (path) {
      case '/home': {
        this.body.append(this.home.home);
        break;
      }
      case '/login': {
        this.body.append(this.login.login);
        break;
      }
      case '/': {
        this.body.append(this.home.home);
        break;
      }
      default: {
        this.body.innerHTML = 'error';
      }
    }
  }
}
