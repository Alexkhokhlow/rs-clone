import IResponseBoard, { ITaskList } from '../../../../../types/types';
import Server from '../../../../server/server';
import Common from '../../../../utils/common';

const server = new Server();

export class TaskModal {
  modal: HTMLElement;

  btnDelete: HTMLElement;

  btnOpen: HTMLElement;

  btnMove: HTMLElement;

  selectedTask: HTMLElement | undefined;

  moveModal: HTMLElement;

  backdrop: HTMLElement;

  token: string | null;

  constructor() {
    this.modal = Common.createDomNode('ul', ['task__modal']);
    this.btnDelete = Common.createDomNode('li', ['modal__btn', 'btn-delete'], 'Delete');
    this.btnOpen = Common.createDomNode('li', ['modal__btn', 'btn-open'], 'Open task');
    this.btnMove = Common.createDomNode('li', ['modal__btn', 'btn-move'], 'Move');
    this.selectedTask = undefined;
    this.moveModal = Common.createDomNode('div', []);
    this.backdrop = Common.createDOMNode('div', ['backdrop']);
    this.token = localStorage.getItem('token');

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

      this.selectedTask?.remove();
      if (this.selectedTask?.dataset.id) this.deleteTask(this.selectedTask?.dataset.id);

      this.removeModalWindow();
    });
  }

  public setSelectedTask(task: HTMLElement) {
    this.selectedTask = task;
  }

  public removeModalWindow() {
    this.backdrop.remove();
    this.modal.remove();
    this.moveModal?.remove();
    this.selectedTask?.classList.remove('task_selected');
  }

  async getTasksLists() {
    const taskListsNames: ITaskList[] = [];
    const path = window.location.pathname.replace('/board/', '');

    if (this.token) {
      const response = (await server.getDashboard(this.token, path)) as IResponseBoard;

      if (response.dashboard.tasklists) {
        response.dashboard.tasklists.forEach((taskList) => {
          taskListsNames.push(taskList);
        });
      }
    }

    return taskListsNames;
  }

  createMoveModal(tasksLists: ITaskList[], cb: (taskList: HTMLElement) => void, currentTaskList: HTMLElement) {
    this.moveModal = Common.createDomNode('div', ['move__modal'], 'Move card');
    const subtitle = Common.createDomNode('p', ['modal__title'], 'Select a list');
    this.moveModal.append(subtitle);
    tasksLists.forEach((tasksList) => {
      const way = Common.createDomNode('button', ['way__btn'], `${tasksList.name}`);
      if (currentTaskList.dataset.id == tasksList.id) {
        way.setAttribute('disabled', 'disabled');
      }

      way.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetList = document.querySelector(`.tasks__wrapper[data-id="${tasksList.id}"]`) as HTMLElement;
        if (this.selectedTask) targetList.append(this.selectedTask);
        cb(targetList);
        this.removeModalWindow();
      });

      this.moveModal?.append(way);
    });

    this.moveModal.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    this.modal.append(this.moveModal);
  }

  async deleteTask(id: string) {
    if (this.token && id) {
      await server.deleteTask(this.token, id);
    }
  }
}

const taskModal = new TaskModal();

export default taskModal;
