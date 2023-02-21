import Common from '../../../../utils/common';
import TaskInfo from '../../taskInfo/taskInfo';

export default class TaskModal {
  modal: HTMLElement;

  btnDelete: HTMLElement;

  btnOpen: HTMLElement;

  btnMove: HTMLElement;

  taskInfo: TaskInfo;

  selectedTask: string;

  constructor() {
    this.modal = Common.createDomNode('ul', ['task__modal']);
    this.btnDelete = Common.createDomNode('li', ['modal__btn', 'btn-delete'], 'Delete');
    this.btnOpen = Common.createDomNode('li', ['modal__btn', 'btn-open'], 'Open task');
    this.btnMove = Common.createDomNode('li', ['modal__btn', 'btn-move'], 'Move');
    this.taskInfo = new TaskInfo();
    this.selectedTask = '';

    this.render();
  }

  public render() {
    this.modal.append(this.btnDelete, this.btnOpen, this.btnMove);

    this.addHandlers();
    return this.modal;
  }

  addHandlers() {
    this.btnDelete.addEventListener('click', (e) => {
      e.stopImmediatePropagation();

      console.log('delete');
    });

    this.btnOpen.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      this.taskInfo.init(this.selectedTask);
      document.body.append(this.taskInfo.taskInfo);
    });

    this.btnMove.addEventListener('click', (e) => {
      e.stopImmediatePropagation();

      console.log('move');
    });
  }

  setSelectedTask(id: string) {
    this.selectedTask = id;
  }
}
