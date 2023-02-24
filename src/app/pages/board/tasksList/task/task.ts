import Common from '../../../../utils/common';

export default class Task {
  public task: HTMLElement;

  private title: HTMLElement;

  public labelContainer: HTMLElement;

  private taskInfo: HTMLElement;

  public description: HTMLElement;

  public checklist: HTMLElement;

  constructor(title: string, onClick: (event: Event) => void, listName: string, index: string, id: string) {
    this.task = Common.createDOMNode('div', ['task']);
    this.task.draggable = true;
    this.title = Common.createDOMNode('span', ['task__title'], title);
    this.labelContainer = Common.createDomNode('div', ['task__label-container']);
    this.taskInfo = Common.createDomNode('div', ['task__info__container']);
    this.description = Common.createDomNode('div', ['task__description']);
    this.checklist = Common.createDomNode('div', ['task__checklist']);
    this.task.setAttribute('data-title', title);
    this.task.setAttribute('data-id', id);
    this.append();
    this.listen(onClick);
  }

  private append() {
    this.taskInfo.append(this.description, this.checklist);
    this.task.append(this.labelContainer, this.title, this.taskInfo);
  }

  private listen(onClick: (event: Event) => void) {
    this.task.addEventListener('click', onClick);
  }
}
