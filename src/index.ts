import './scss/global.scss';
import App from './app/app';
import Home from './app/pages/home/home';
import Login from './app/pages/login/login';
import User from './app/pages/user/user';

const home = new Home();
const login = new Login();
const user = new User();
const body = document.body;

const handleLocation = () => {
  const path = window.location.pathname;
  const routes = [/home/g, /login/g, /user\/([\w]+?)\b/g];
  let flag = true;
  routes.forEach((route) => {
    const match = path.match(route);
    if (match) {
      flag = false;
      if (match[0].includes('home')) {
        body.append(home.home);
        return;
      }
      if (match[0].includes('login')) {
        body.append(login.login);
        return;
      }
      if (match[0].includes('user')) {
        user.init(match[0]);
        body.append(user.user);
        return;
      }
    }
  });
  if (flag) {
    if (path === '/') {
      body.append(home.home);
    } else {
      body.innerHTML = 'error';
    }
  }
};
window.onpopstate = handleLocation;
handleLocation();
