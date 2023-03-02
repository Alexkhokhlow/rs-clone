import Lang from '../../../common/lang/lang';
import Common from '../../../utils/common';

export default class MainWorkspace {
  private section: HTMLElement;

  private wrapper: HTMLElement;

  private titleWrapper: HTMLElement;

  private title: HTMLElement;

  private titleIcon: HTMLElement;

  private titleText: HTMLElement;

  private line: HTMLElement;

  private boards: HTMLElement;

  private boardsTitle: HTMLElement;

  public boardsLayout: HTMLElement;

  public createButton: HTMLElement;

  private editWrapper: HTMLElement;

  private edit: HTMLElement;

  private nameWrapper: HTMLElement;

  private name: HTMLInputElement;

  private showedTitle: HTMLElement;

  private nameLabel: HTMLLabelElement;

  private star: HTMLElement;

  private buttons: HTMLElement;

  private saveButton: HTMLButtonElement;

  private cancelButton: HTMLButtonElement;

  public availableBoardsLayout: HTMLElement;

  private availableBoardsTitle: HTMLElement;

  private availableBoards: HTMLElement;

  constructor() {
    const text = new Lang();
    this.section = Common.createDomNode('section', ['workspace__main']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'workspace__wrapper']);
    this.titleWrapper = Common.createDomNode('div', ['workspace__title__wrapper']);
    this.editWrapper = Common.createDomNode('div', ['title__edit__wrapper']);
    this.edit = Common.createDomNode('div', ['title__edit']);
    this.showedTitle = Common.createDomNode('div', ['title__showed']);
    const name = localStorage.getItem('workspace_name') ? localStorage.getItem('workspace_name') : 'Workspace';
    this.title = Common.createDomNode('h2', ['workspace__title'], name as string);
    this.titleIcon = Common.createDomNode('div', ['workspace__title__icon']);
    this.titleText = Common.createDomNode('h3', ['workspace__title__text'], 'W');
    this.line = Common.createDomNode('hr', ['horizontal__line']);
    this.boards = Common.createDomNode('div', ['workspace__boards']);
    this.boardsTitle = Common.createDomNode('h2', ['boards__title'], text.text.workspace.board.title);
    this.boardsLayout = Common.createDomNode('div', ['boards__layout']);
    this.createButton = Common.createDomNodeButton(['button', 'board__button'], text.text.workspace.board.info);
    this.nameWrapper = Common.createDomNode('div', ['name__wrapper', 'hidden']);
    this.nameLabel = Common.createDomNodeLabel('workspace__name', text.text.name, ['workspace__name__label']);
    this.star = Common.createDomNode('span', ['label__star'], '*');
    this.name = Common.createDomNodeInput(text.text.enterName, 'workspace__name', ['workspace__name']);
    this.buttons = Common.createDomNode('div', ['edit__buttons']);
    this.saveButton = Common.createDomNodeButton(['button', 'save'], text.text.cancel);
    this.cancelButton = Common.createDomNodeButton(['button', 'cancel'], text.text.cancel);
    this.availableBoards = Common.createDomNode('div', ['workspace__boards']);
    this.availableBoardsTitle = Common.createDomNode('h2', ['boards__title'], text.text.workspace.available.title);
    this.availableBoardsLayout = Common.createDomNode('div', ['boards__layout']);
  }

  public append() {
    this.buttons.append(this.saveButton, this.cancelButton);
    this.nameLabel.append(this.star);
    this.nameWrapper.append(this.nameLabel, this.name, this.buttons);
    this.editWrapper.append(this.title, this.edit);
    this.titleIcon.append(this.titleText);
    this.showedTitle.append(this.titleIcon, this.editWrapper);
    this.titleWrapper.append(this.showedTitle, this.nameWrapper);
    this.boardsLayout.append(this.createButton);
    this.boards.append(this.boardsTitle, this.boardsLayout);
    this.availableBoards.append(this.availableBoardsTitle, this.availableBoardsLayout);
    this.wrapper.append(this.titleWrapper, this.line, this.boards, this.availableBoards);
    this.section.append(this.wrapper);
    this.edit.addEventListener('click', this.openEditForm.bind(this));
    this.cancelButton.addEventListener('click', this.openEditForm.bind(this));
    this.saveButton.addEventListener('click', this.editWorkspaceName.bind(this));

    return this.section;
  }

  private openEditForm() {
    this.nameWrapper.classList.toggle('hidden');
    if (this.title.textContent) {
      this.name.setAttribute('value', this.title.textContent);
    }
  }

  private editWorkspaceName() {
    this.title.innerText = this.name.value;
    localStorage.setItem('workspace_name', this.name.value);
    this.nameWrapper.classList.add('hidden');
  }
}
