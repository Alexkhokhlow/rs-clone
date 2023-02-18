import Server from '../../../server/server';
import Common from '../../../utils/common';
import AddItemButton from '../common/addItemButton';
import Task from './task/task';

export default class TasksList {
  public tasksList: HTMLElement;

  private title: HTMLElement;

  public addCardButton: AddItemButton;

  private onClick: (event: Event) => void;

  tasksWrapper: HTMLElement;

  titleText: string;

  server: Server;

  token: string | null;

  socket: any;

  private deleteButton: HTMLElement;

  private headerTaskList: HTMLElement;

  constructor(title: string, onClick: (event: Event) => void, socket: any) {
    this.socket = socket;
    this.onClick = onClick;
    this.titleText = title;
    this.headerTaskList = Common.createDomNode('header', ['tasks-list__header']);
    this.tasksList = Common.createDomNode('div', ['tasks-list']);
    this.title = Common.createDomNode('span', ['tasks-list__title'], title);
    this.title.contentEditable = 'true';
    this.deleteButton = Common.createDomNode('div', ['tasks-list__delete']);
    this.server = new Server();
    this.token = localStorage.getItem('token');

    this.tasksWrapper = Common.createDomNode('div', ['tasks__wrapper']);
    this.addCardButton = new AddItemButton(
      'Add a card',
      'Enter a title for this card...',
      'Add card',
      this.onAddTask.bind(this)
    );
    this.headerTaskList.append(this.title, this.deleteButton);
    this.tasksList.append(this.headerTaskList, this.tasksWrapper, this.addCardButton.container);
  }

  async onAddTask() {
    const name = this.addCardButton.form.data;
    const index = String(this.tasksWrapper.children.length);
    this.addCardButton.onClose();
    const { id } = this.tasksWrapper.dataset;
    this.socket.emit('message', 'change');
    if (this.token && id) {
      const data = await this.server.createTask(this.token, id, name, index);
      const task = new Task(name, this.onClick, this.titleText, index, data.task.id);
      this.tasksWrapper.append(task.task);
    }
  }
}
