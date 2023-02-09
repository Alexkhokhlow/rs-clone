import Common from '../../../utils/common';
import Description from './description/description';

export default class TaskInfo {
  public taskList: HTMLElement;

  private title: HTMLElement;

  private info: HTMLElement;

  private description: Description;

  constructor() {
    this.taskList = Common.createDomNode('div', ['task-list']);
    this.title = Common.createDomNode('h2', ['task-list__title'], 'make new Page');
    this.info = Common.createDomNode('h4', ['task-list__info'], 'from list create');
    this.description = new Description();

    this.taskList.append(this.title, this.info, this.description.description);
  }
}
