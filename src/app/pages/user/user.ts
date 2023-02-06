import Header from './header/header';

export default class User {
  user: HTMLDivElement;

  header: Header;

  constructor() {
    this.user = document.createElement('div');
    this.header = new Header();
    this.user.append(this.header.header);
  }

  init(path: string) {
    console.log(path);
  }
}
