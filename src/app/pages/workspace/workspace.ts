import Common from '../../utils/common';
import StartPageFooter from '../startPage/sections/footer';
import CreatingBoard from './createBoard/createBoard';
import Header from './header/header';
import MainWorkspace from './main/main';

export default class Workspace {
  private workspace: HTMLElement;

  private header: Header;

  private main: MainWorkspace;

  private footer: StartPageFooter;

  private creatingBoard: CreatingBoard;

  constructor() {
    this.workspace = Common.createDomNode('div', ['workspace__page']);
    this.header = new Header();
    this.main = new MainWorkspace();
    this.footer = new StartPageFooter();
    this.creatingBoard = new CreatingBoard();
  }

  public append() {
    this.workspace.append(this.header.append(), this.main.append(), this.footer.append());
    this.bindEvents();
    return this.workspace;
  }

  private bindEvents() {
    this.main.createButton.addEventListener('click', this.creatingBoard.append.bind(this.creatingBoard));
  }
}
