import Lang from '../../common/lang/lang';
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
    const text = new Lang();
    this.creatingBoard = creatingBoard;
    this.main = Common.createDomNode('section', ['error__page']);
    this.title = Common.createDomNode('h2', ['error__title'], text.text.errorPage.notFound);

    if (this.isAuthorized()) {
      this.header = new Header().append(creatingBoard);
      this.errorMessage = Common.createDomNode(
        'p',
        ['error__message'],
        text.text.errorPage.private
      );
    } else {
      this.header = new StartPageHeader().append();
      this.errorMessage = Common.createDOMNode(
        'p',
        ['error__message'],
        `${text.text.errorPage.sign} <a href=/signup class="message__link">${text.text.singUp}</a>.`
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
