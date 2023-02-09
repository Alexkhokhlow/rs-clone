import Common from '../../utils/common';
import Footer from '../autorisation/footer';
import StartPageHeader from '../startPage/sections/header';
import Header from '../workspace/header/header';

export default class ErrorPage {
  header: HTMLElement;

  main: HTMLElement;

  title: HTMLElement;

  errorMessage: HTMLElement;

  footer: HTMLElement;

  constructor() {
    this.main = Common.createDomNode('section', ['error__page']);
    this.title = Common.createDOMNode('h2', ['error__title'], 'Page not found.');

    if (this.isAuthorized()) {
      this.header = new Header().append();
      this.errorMessage = Common.createDOMNode(
        'p',
        ['error__message'],
        'Perhaps this is a private page. Ask the person who shared the link to share the board or invite you to the workspace.'
      );
    } else {
      this.header = new StartPageHeader().append();
      this.errorMessage = Common.createDOMNode(
        'p',
        ['error__message'],
        'Perhaps this is a private page. You could see it <a href=/signup class="message__link">by signing in</a>.'
      );
    }

    this.footer = footer.render();
  }

  public render() {
    this.title.append(this.errorMessage);
    this.main.append(this.header, this.title, this.footer);

    return this.main;
  }

  private isAuthorized() {
    return !!localStorage.getItem('token');
  }
}
