import Common from '../../../utils/common';
import { backgrounds } from '../../startPage/constants/constants';

const board = require('../../../../assets/workspace/create/create_board.svg') as string;

export default class CreatingBoard {
  private overlay: HTMLElement;

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

  private backgrounds: HTMLElement;

  private boardTitle: HTMLLabelElement;

  private boardTitleWrapper: HTMLElement;

  private boardTitleInput: HTMLInputElement;

  private boardTitleText: HTMLElement;

  private star: HTMLElement;

  private boardVisibilityWrapper: HTMLElement;

  private visibilityTitle: HTMLLabelElement;

  constructor() {
    this.overlay = Common.createDomNode('div', ['overlay']);
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
    this.backgrounds = Common.createDomNode('div', ['backgrounds']);
    this.boardTitleWrapper = Common.createDomNode('div', ['board__title__wrapper']);
    this.boardTitle = Common.createDomNodeLabel('board title', 'Board title', ['create__subtitle']);
    this.star = Common.createDomNode('span', ['label__star'], '*');
    this.boardTitleInput = Common.createDomNodeInput('Enter Title', 'board title', ['board__title__input']);
    this.boardTitleText = Common.createDomNode('p', ['board__title__text'], 'Board title is required');
    this.boardVisibilityWrapper = Common.createDomNode('div', ['board__visibility__wrapper']);
    this.visibilityTitle = Common.createDomNodeLabel('visibility', 'Visibility', ['create__subtitle']);
    this.createBackgrounds();
  }

  public append() {
    this.board.append(this.boardImg);
    this.boardTitle.append(this.star);
    this.backgroundWrapper.append(this.backgroundTitle, this.backgrounds);
    this.boardTitleWrapper.append(this.boardTitle, this.boardTitleInput, this.boardTitleText);
    this.boardVisibilityWrapper.append(this.visibilityTitle);
    this.boardInfo.append(this.board, this.backgroundWrapper, this.boardTitleWrapper, this.boardVisibilityWrapper);
    this.titleWrapper.append(this.title, this.closeButton);
    this.wrapper.append(this.titleWrapper, this.line);
    this.section.append(this.wrapper, this.boardInfo);
    this.overlay.append(this.section);
    this.backgrounds.addEventListener('click', this.chooseBackground.bind(this));
    this.closeButton.addEventListener('click', this.closeModal.bind(this));
    this.overlay.addEventListener('click', this.closeModal.bind(this));
    this.openModal();

    return this.overlay;
  }

  private createBackgrounds() {
    backgrounds.forEach((color) => {
      const background = Common.createDomNodeButton(['background']);
      background.title = color.title;
      background.style.background = color.color;
      this.backgrounds.append(background);
    });
    this.backgrounds.children[0].classList.add('active');
  }

  private chooseBackground(event: Event) {
    const target = event.target as HTMLButtonElement;
    Array.from(this.backgrounds.children).forEach((item) => {
      item.classList.remove('active');
    });
    target.classList.add('active');
    this.board.style.background = target.style.background;
  }

  public openModal() {
    document.body.append(this.overlay);
  }

  private closeModal(event: Event) {
    const classes = (event.target as HTMLElement).classList;
    if (classes.contains('overlay') || classes.contains('close__button')) {
      if (this.overlay) {
        this.overlay.remove();
      }
    }
  }
}
