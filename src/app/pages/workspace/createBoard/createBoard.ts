import Common from "../../../utils/common";

const board = require('../../../../assets/workspace/create/create_board.svg');

export default class CreatingBoard {
  private section: HTMLElement;
  private titleWrapper: HTMLElement;
  private closeButton: HTMLElement;
  private title: HTMLElement;
  private wrapper: HTMLElement;
  private line: HTMLElement;
  private board: HTMLElement;
  private boardImg: HTMLImageElement;
  private boardInfo: HTMLElement;
  private backgroundWrapper: HTMLElement;
  private backgroundTitle: HTMLElement;


  constructor() {
    this.section = Common.createDomNode('section', ['create']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'create__wrapper']);
    this.titleWrapper = Common.createDomNode('div', ['create__title__wrapper']);
    this.closeButton = Common.createDomNode('div', ['close__button']);
    this.title = Common.createDomNode('h3', ['create__title'], 'Create board');
    this.line = Common.createDomNode('hr', ['horizontal__line']);
    this.boardInfo = Common.createDomNode('div', ['board__inform']);
    this.board = Common.createDomNode('div', ['board__background']);
    this.boardImg = Common.createDomNodeImg(['board__icon'], board);
    this.backgroundWrapper = Common.createDomNode('div', ['background__wrapper']);
    this.backgroundTitle = Common.createDomNode('div', ['create__subtitle'], 'Background');
  }

  public append() {
    this.board.append(this.boardImg);
    this.backgroundWrapper.append(this.backgroundTitle);
    this.boardInfo.append(this.board, this.backgroundWrapper);
    this.titleWrapper.append(this.title, this.closeButton);
    this.wrapper.append(this.titleWrapper, this.line, this.boardInfo);
    this.section.append(this.wrapper);

    return this.section;
  }
}
