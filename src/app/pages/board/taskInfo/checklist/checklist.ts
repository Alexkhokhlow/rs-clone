import Common from "../../../../utils/common";

export default class Checklist {
  public checklist: HTMLElement;

  private checklistHeader: HTMLElement;

  public checklistTitle: HTMLElement;

  private checklistDelete: HTMLButtonElement;

  constructor() {
    this.checklist = Common.createDomNode('div', ['checklist__info']);
    this.checklistHeader = Common.createDomNode('div', ['checklist__header__wrapper']);
    this.checklistTitle = Common.createDomNode('h4', ['checklist__title__info', 'title__info']);
    this.checklistDelete = Common.createDomNodeButton(['checklist__delete'], 'Delete');

    this.append();
  }

  private append() {
    this.checklistHeader.append(this.checklistTitle, this.checklistDelete);
    this.checklist.append(this.checklistHeader);
    this.bindEvents();
  }


  private bindEvents() {
    this.checklistDelete.addEventListener('click', this.removeChecklist.bind(this))
  }

  private removeChecklist() {
    this.checklist.remove()
  }
}
