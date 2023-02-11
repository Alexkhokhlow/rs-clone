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
    this.creatingBoard = new CreatingBoard();
    this.header = new Header();
    this.main = new MainWorkspace();
    this.footer = new StartPageFooter();
  }

  public append() {
    this.workspace.append(
      this.header.append(this.creatingBoard),
      this.main.append(),
      this.creatingBoard.append(),
      this.footer.append()
    );
    this.bindEvents();
    return this.workspace;
  }

  private bindEvents() {
    this.main.createButton.addEventListener('click', this.creatingBoard.openModal.bind(this.creatingBoard));
    this.creatingBoard.createButton.addEventListener('click', this.createBoard.bind(this));
  }

  private createBoard(event: Event) {
    const boardPreview = Common.createDomNode('div', ['board__preview']);
    boardPreview.style.background = this.creatingBoard.board.style.background;
    const boardTitle = Common.createDOMNode('h3', ['board__preview__title'], this.creatingBoard.boardTitleInput.value);
    boardPreview.append(boardTitle);
    this.main.boardsLayout.append(boardPreview);
    this.creatingBoard.closeModal(event);
    this.creatingBoard.boardTitleInput.value = '';
    window.location.href = '/board';
  }
}
