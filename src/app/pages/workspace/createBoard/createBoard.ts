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

  public board: HTMLElement;

  private boardImg: HTMLImageElement;

  private boardInfo: HTMLElement;

  private backgroundWrapper: HTMLElement;

  private backgroundTitle: HTMLElement;

  private backgrounds: HTMLElement;

  private boardTitle: HTMLLabelElement;

  private boardTitleWrapper: HTMLElement;

  public boardTitleInput: HTMLInputElement;

  private boardTitleText: HTMLElement;

  private star: HTMLElement;

  private boardVisibilityWrapper: HTMLElement;

  private visibilityTitle: HTMLLabelElement;

  private visibility: HTMLInputElement;

  private dropDownMenu: HTMLElement;

  public createButton: HTMLButtonElement;

  private options: HTMLElement;

  private privateWrapper: HTMLElement;

  private publicWrapper: HTMLElement;

  private private: HTMLElement;

  private public: HTMLElement;

  private privateTitle: HTMLElement;

  private privateDescription: HTMLElement;

  private publicTitle: HTMLElement;

  private publicDescription: HTMLElement;

  private privateIcon: HTMLElement;

  private publicIcon: HTMLElement;

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
    this.dropDownMenu = Common.createDomNode('div', ['dropdown']);
    this.visibility = Common.createDomNodeInput('Choose visibility', 'visibility', ['visibility']);
    this.visibility.readOnly = true;
    this.visibility.value = 'Private';
    this.options = Common.createDomNode('div', ['options', 'hidden']);
    this.privateWrapper = Common.createDomNode('div', ['option']);
    this.private = Common.createDomNode('div', ['private']);
    this.privateIcon = Common.createDomNode('div', ['private__icon']);
    this.privateTitle = Common.createDomNode('h3', ['option__title'], 'Private');
    this.privateDescription = Common.createDomNode(
      'p',
      ['private__description'],
      'Only board members can see and edit the board.'
    );
    this.publicWrapper = Common.createDomNode('div', ['option']);
    this.public = Common.createDomNode('div', ['public']);
    this.publicIcon = Common.createDomNode('div', ['public__icon']);
    this.publicTitle = Common.createDomNode('h3', ['option__title'], 'Public');
    this.publicDescription = Common.createDomNode(
      'p',
      ['public__description'],
      'Anyone on the internet can see this board. Only members can edit.'
    );
    this.createButton = Common.createDomNodeButton(['button', 'create__button'], 'Create');
    this.createButton.disabled = true;
    this.createBackgrounds();
  }

  public append() {
    this.board.append(this.boardImg);
    this.boardTitle.append(this.star);
    this.backgroundWrapper.append(this.backgroundTitle, this.backgrounds);
    this.boardTitleWrapper.append(this.boardTitle, this.boardTitleInput, this.boardTitleText);
    this.private.append(this.privateTitle, this.privateDescription);
    this.public.append(this.publicTitle, this.publicDescription);
    this.privateWrapper.append(this.privateIcon, this.private);
    this.publicWrapper.append(this.publicIcon, this.public);
    this.options.append(this.privateWrapper, this.publicWrapper);
    this.dropDownMenu.append(this.visibility, this.options);
    this.boardVisibilityWrapper.append(this.visibilityTitle, this.dropDownMenu);
    this.boardInfo.append(
      this.board,
      this.backgroundWrapper,
      this.boardTitleWrapper,
      this.boardVisibilityWrapper,
      this.createButton
    );
    this.titleWrapper.append(this.title, this.closeButton);
    this.wrapper.append(this.titleWrapper, this.line);
    this.section.append(this.wrapper, this.boardInfo);
    this.overlay.append(this.section);
    this.backgrounds.addEventListener('click', this.chooseBackground.bind(this));
    this.closeButton.addEventListener('click', this.closeModal.bind(this));
    this.overlay.addEventListener('click', this.closeModal.bind(this));
    this.openModal();
    this.bindEvents();

    return this.overlay;
  }

  private bindEvents() {
    this.visibility.addEventListener('click', this.toggleDropDown.bind(this));
    this.options.addEventListener('click', this.chooseVisibility.bind(this));
    this.boardTitleInput.addEventListener('input', this.setDisabled.bind(this));
  }

  private setDisabled() {
    this.createButton.disabled = !this.boardTitleInput.value.trim();
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
    if (target.closest('.background')) {
      this.resetActiveBackground();
      this.board.style.background = target.style.background;
    }
  }

  private resetActiveBackground() {
    Array.from(this.backgrounds.children).forEach((item) => {
      item.classList.remove('active');
    });
    this.backgrounds.children[0].classList.add('active');
  }

  public openModal() {
    document.body.append(this.overlay);
    this.board.style.background = 'rgb(0, 101, 255)';
  }

  public closeModal(event: Event) {
    const classes = (event.target as HTMLElement).classList;
    if (classes.contains('overlay') || classes.contains('close__button') || classes.contains('create__button')) {
      if (this.overlay) {
        this.overlay.remove();
      }
      this.boardTitleInput.value = '';
      this.visibility.value = 'Private';
      if (!this.options.classList.contains('hidden')) {
        this.options.classList.add('hidden');
      }
      this.resetActiveBackground();
      this.board.style.background = 'rgb(0, 101, 255)';
      this.setDisabled();
    }
  }

  private chooseVisibility(event: Event) {
    const target = (event.target as HTMLElement).closest('.option');
    if (target) {
      this.visibility.value = target.lastChild!.firstChild!.textContent as string;
      this.options.classList.add('hidden');
    }
  }

  private toggleDropDown() {
    this.options.classList.toggle('hidden');
  }
}
