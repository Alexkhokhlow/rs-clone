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
    //  const data = JSON.stringify({ email: 'ssfcs@gmail.com', password: 'dasdas', userName: 'sdvfnf' });
    //   fetch('http://localhost:8081/api/users/signup', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: data,
    //     credentials:'same-origin'
    //   })
    //     .then((response) => {
    //       return response.text();
    //     })
    //     .then((text: string) => console.log(text))
    //     .catch((err: Error) => console.error(err));
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
          this.body.append(this.home.home);
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
        this.body.append(this.home.home);
      } else {
        this.body.innerHTML = 'error';
      }
    }
  }
}
