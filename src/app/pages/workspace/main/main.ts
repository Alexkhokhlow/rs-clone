import Common from "../../../utils/common";

export default class MainWorkspace{
  private section: HTMLElement;
  private wrapper: HTMLElement;
  private titleWrapper: HTMLElement;
  private title: HTMLElement;
  private titleIcon: HTMLElement;
  private titleText: HTMLElement;
  private line: HTMLElement;
  private boards: HTMLElement;
  private boardsTitle: HTMLElement;
  private boardsLayout: HTMLElement;
  private createButton: HTMLElement;
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

  constructor() {
    this.section = Common.createDomNode('section', ['workspace__main']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'workspace__wrapper']);
    this.titleWrapper = Common.createDomNode('div', ['workspace__title__wrapper']);
    this.editWrapper = Common.createDomNode('div', ['title__edit__wrapper']);
    this.edit =  Common.createDomNode('div', ['title__edit']);
    this.showedTitle = Common.createDomNode('div', ['title__showed']);
    this.title = Common.createDomNode('h2', ['workspace__title'], 'Workspace');
    this.titleIcon = Common.createDomNode('div', ['workspace__title__icon']);
    this.titleText = Common.createDomNode('h3', ['workspace__title__text'], 'W');
    this.line = Common.createDomNode('hr', ['horizontal__line']);
    this.boards = Common.createDomNode('div', ['workspace__boards']);
    this.boardsTitle = Common.createDomNode('h2', ['boards__title'], 'Boards');
    this.boardsLayout = Common.createDomNode('div', ['boards__layout']);
    this.createButton = Common.createDomNodeButton(['button', 'board__button'], 'Create new board');
    this.nameWrapper = Common.createDomNode('div', ['name__wrapper', 'hidden']);
    this.nameLabel = Common.createDomNodeLabel('workspace__name', 'Name', ['workspace__name__label']);
    this.star = Common.createDomNode('span', ['label__star'], '*');
    this.name = Common.createDomNodeInput('Enter Name', 'workspace__name', ['workspace__name']);
    this.buttons = Common.createDomNode('div', ['edit__buttons']);
    this.saveButton = Common.createDomNodeButton(['button', 'save'], 'Save');
    this.cancelButton = Common.createDomNodeButton(['button', 'cancel'], 'Cancel');
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
    this.wrapper.append(this.titleWrapper, this.line, this.boards);
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
    this.nameWrapper.classList.add('hidden');
  }
}
