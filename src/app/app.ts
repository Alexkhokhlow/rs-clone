import StartPage from './pages/startPage/startPage';

export default class App {
  body: HTMLElement;

  startPage: StartPage;

  constructor() {
    this.body = document.body;
    this.startPage = new StartPage();
  }

  start() {
    this.body.append(this.startPage.container);
  }
}
