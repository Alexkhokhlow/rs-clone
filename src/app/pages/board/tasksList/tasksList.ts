import { Socket } from 'socket.io-client';
import Lang from '../../../common/lang/lang';
import Server from '../../../server/server';
import Common from '../../../utils/common';
import AddItemButton from '../common/addItemButton';
import Task from './task/task';

export default class TasksList {
  public tasksList: HTMLElement;

  private title: HTMLElement;

  private titleInput: HTMLInputElement;

  public addCardButton: AddItemButton;

  private onClick: (event: Event) => void;

  public tasksWrapper: HTMLElement;

  private titleText: string;

  private server: Server;

  private token: string | null;

  public deleteButton: HTMLButtonElement;

  private headerTaskList: HTMLElement;

  private id: string;

  private path: string;

  private socket: Socket;

  private boardId: string;

  constructor(
    title: string,
    onClick: (event: Event) => void,
    socket: Socket,
    id: string,
    path: string,
    boardId: string
  ) {
    const text = new Lang();
    this.id = id;
    this.socket = socket;
    this.path = path;
    this.boardId = boardId;
    this.onClick = onClick;
    this.titleText = title;
    this.headerTaskList = Common.createDomNode('header', ['tasks-list__header']);
    this.tasksList = Common.createDomNode('div', ['tasks-list']);
    this.title = Common.createDomNode('span', ['tasks-list__title'], title);
    this.titleInput = Common.createDomNodeInput("Enter task's list title", '', ['tasks-list__title__input']);
    this.deleteButton = Common.createDomNodeButton(['tasks-list__delete']);
    this.server = new Server();
    this.token = localStorage.getItem('token');

    this.tasksWrapper = Common.createDomNode('div', ['tasks__wrapper']);
    this.addCardButton = new AddItemButton(
      text.text.card.listText,
      text.text.card.lestPlaceholder,
      text.text.card.listText,

      this.onAddTask.bind(this)
    );
    this.headerTaskList.append(this.title, this.deleteButton);
    this.tasksList.append(this.headerTaskList, this.tasksWrapper, this.addCardButton.container);
    this.bindEvents();
  }

  private bindEvents() {
    this.deleteButton.addEventListener('click', this.removeList.bind(this));
    this.title.addEventListener('click', () => {
      Common.clickTitle(this.headerTaskList, this.title, this.titleInput);
    });
    this.titleInput.addEventListener('focusout', async () => {
      Common.changeTitle(this.headerTaskList, this.title, this.titleInput);
      if (this.token) {
        await this.server.updateTaskList(this.token, this.id, this.titleInput.value);
        this.socket.emit('label', this.path);
      }
    });
  }

  async onAddTask() {
    const name = this.addCardButton.form.data;
    if (name) {
      const index = String(this.tasksWrapper.children.length);
      this.addCardButton.onClose();
      const { id } = this.tasksWrapper.dataset;
      if (this.token && id) {
        const data = await this.server.createTask(this.token, id, name, index);
        const task = new Task(name, this.onClick, data.task.id);
        this.socket.emit('board', this.path);
        this.tasksWrapper.append(task.task);
      }
    }
  }

  private async removeList() {
    if (this.token) {
      this.tasksList.remove();
      await this.server.deleteTaskList(this.token, this.id, this.boardId);
      this.socket.emit('board', this.path);
    }
  }
}
