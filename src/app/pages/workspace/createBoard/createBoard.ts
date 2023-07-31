import Lang from '../../../common/lang/lang';
import Server from '../../../server/server';
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

  public visibility: HTMLInputElement;

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

  private server: Server;

  private token: string | null;

  private text: Lang;

  constructor() {
    this.text = new Lang();
    this.overlay = Common.createDomNode('div', ['overlay', 'hidden']);
    this.section = Common.createDomNode('section', ['create']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'create__wrapper']);
    this.titleWrapper = Common.createDomNode('div', ['create__title__wrapper']);
    this.closeButton = Common.createDomNode('div', ['close__button']);
    this.title = Common.createDomNode('h3', ['create__title'], this.text.text.createBoard.createBoard);
    this.line = Common.createDomNode('hr', ['horizontal__line']);
    this.boardInfo = Common.createDomNode('div', ['board__inform']);
    this.board = Common.createDomNode('div', ['board__background']);
    this.boardImg = Common.createDomNodeImg(['board__icon'], board);
    this.backgroundWrapper = Common.createDomNode('div', ['background__wrapper']);
    this.backgroundTitle = Common.createDomNode('div', ['create__subtitle'], this.text.text.createBoard.background);
    this.backgrounds = Common.createDomNode('div', ['backgrounds']);
    this.boardTitleWrapper = Common.createDomNode('div', ['board__title__wrapper']);
    this.boardTitle = Common.createDomNodeLabel(
      this.text.text.createBoard.boardTitle,
      this.text.text.createBoard.boardTitle,
      ['create__subtitle']
    );
    this.star = Common.createDomNode('span', ['label__star'], '*');
    this.boardTitleInput = Common.createDomNodeInput(
      this.text.text.createBoard.enter,
      this.text.text.createBoard.boardTitle,
      ['board__title__input']
    );
    this.boardTitleText = Common.createDomNode('p', ['board__title__text'], this.text.text.createBoard.require);
    this.boardVisibilityWrapper = Common.createDomNode('div', ['board__visibility__wrapper']);
    this.visibilityTitle = Common.createDomNodeLabel(
      this.text.text.createBoard.visibility,
      this.text.text.createBoard.visibility,
      ['create__subtitle']
    );
    this.dropDownMenu = Common.createDomNode('div', ['dropdown']);
    this.visibility = Common.createDomNodeInput(this.text.text.createBoard.visibilityChoose, 'visibility', [
      'visibility',
    ]);
    this.visibility.readOnly = true;
    this.visibility.value = this.text.text.private;
    this.options = Common.createDomNode('div', ['options', 'hidden']);
    this.privateWrapper = Common.createDomNode('div', ['option']);
    this.private = Common.createDomNode('div', ['private']);
    this.privateIcon = Common.createDomNode('div', ['private__icon']);
    this.privateTitle = Common.createDomNode('h3', ['option__title'], this.text.text.private);
    this.privateDescription = Common.createDomNode(
      'p',
      ['private__description'],
      this.text.text.createBoard.privateDescription
    );
    this.publicWrapper = Common.createDomNode('div', ['option']);
    this.public = Common.createDomNode('div', ['public']);
    this.publicIcon = Common.createDomNode('div', ['public__icon']);
    this.publicTitle = Common.createDomNode('h3', ['option__title'], this.text.text.public);
    this.publicDescription = Common.createDomNode(
      'p',
      ['public__description'],
      this.text.text.createBoard.publicDescription
    );
    this.createButton = Common.createDomNodeButton(['button', 'create__button'], this.text.text.create);
    this.createButton.disabled = true;
    this.server = new Server();
    this.createBackgrounds();
    this.token = localStorage.getItem('token');
    this.bindEvents();
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

    return this.overlay;
  }

  private bindEvents() {
    this.visibility.addEventListener('click', this.toggleDropDown.bind(this));
    this.options.addEventListener('click', this.chooseVisibility.bind(this));
    this.boardTitleInput.addEventListener('input', this.setDisabled.bind(this));
    this.backgrounds.addEventListener('click', this.chooseBackground.bind(this));
    this.closeButton.addEventListener('click', this.closeModal.bind(this));
    this.overlay.addEventListener('click', this.closeModal.bind(this));
    this.createButton.addEventListener('click', this.createBoard.bind(this));
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
      Array.from(this.backgrounds.children).forEach((item) => {
        item.classList.remove('active');
      });
      target.classList.add('active');
      this.board.style.background = target.style.background;
    }
  }

  public openModal() {
    this.overlay.classList.remove('hidden');
    this.board.style.background = 'rgb(0, 101, 255)';
  }

  public closeModal(event: Event) {
    const classes = (event.target as HTMLElement).classList;
    if (classes.contains('overlay') || classes.contains('close__button') || classes.contains('create__button')) {
      this.resetOptions();
      this.setDisabled();
    }
  }

  private resetOptions() {
    if (this.overlay) {
      this.overlay.classList.add('hidden');
    }
    this.boardTitleInput.value = '';
    this.visibility.value = this.text.text.private;
    if (!this.options.classList.contains('hidden')) {
      this.options.classList.add('hidden');
    }
    Array.from(this.backgrounds.children).forEach((item) => {
      item.classList.remove('active');
    });
    this.backgrounds.children[0].classList.add('active');
    this.board.style.background = 'rgb(0, 101, 255)';
  }

  private chooseVisibility(event: Event) {
    const target = (event.target as HTMLElement).closest('.option');
    if (target) {
      this.visibility.value = ((target.lastChild as HTMLElement).firstChild as HTMLElement).textContent as string;
      this.options.classList.add('hidden');
    }
  }

  private toggleDropDown() {
    this.options.classList.toggle('hidden');
  }

  public async createBoard(event: Event) {
    const data = {
      color: this.board.style.background,
      name: this.boardTitleInput.value,
      access: this.visibility.value === this.text.text.public,
    };
    if (this.token) {
      try {
        const dashboard = await this.server.createDashboard(this.token, data.name, data.color, data.access);
        this.closeModal(event);
        this.boardTitleInput.value = '';
        window.location.pathname = `board/${dashboard.pathName}`;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
