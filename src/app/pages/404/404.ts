import Common from '../../utils/common';
import Footer from '../autorisation/footer';
import StartPageHeader from '../startPage/sections/header';
import CreatingBoard from '../workspace/createBoard/createBoard';
import Header from '../workspace/header/header';

export default class ErrorPage {
  header: HTMLElement;

  main: HTMLElement;

  title: HTMLElement;

  errorMessage: HTMLElement;

  footer: HTMLElement;

  creatingBoard: CreatingBoard;

  constructor(creatingBoard: CreatingBoard) {
    this.creatingBoard = creatingBoard;
    this.main = Common.createDomNode('section', ['error__page']);
    this.title = Common.createDomNode('h2', ['error__title'], 'Page not found.');

    if (this.isAuthorized()) {
      this.header = new Header().append(creatingBoard);
      this.errorMessage = Common.createDomNode(
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

    this.footer = new Footer().render();
  }

  public render() {
    this.title.append(this.errorMessage);
    this.main.append(this.header, this.title, this.creatingBoard.append(), this.footer);

    return this.main;
  }

  private isAuthorized() {
    return !!localStorage.getItem('token');
  }
}
