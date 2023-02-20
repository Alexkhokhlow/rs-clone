import { io, Socket } from 'socket.io-client';
import IResponseBoard, { ITaskList, TLabel } from '../../../types/types';
import Server from '../../server/server';
import Common from '../../utils/common';
import StartPageFooter from '../startPage/sections/footer';
import CreatingBoard from '../workspace/createBoard/createBoard';
import Header from '../workspace/header/header';
import AddItemButton from './common/addItemButton';
import Subheader from './subheader/subheader';
import TaskInfo from './taskInfo/taskInfo';
import Task from './tasksList/task/task';
import TasksList from './tasksList/tasksList';
import Share from './modalShare/share';

let draggedEl: HTMLElement | null;

export default class Board {
  board: HTMLElement;

  addListButton: AddItemButton;

  listsContainer: HTMLElement;

  header: Header;

  container: HTMLElement;

  private subheader: Subheader;

  private main: HTMLElement;

  private share: Share;

  taskInfo: TaskInfo;

  footer: StartPageFooter;

  tasksListArray: TasksList[];

  server: Server;

  token: string | null;

  path: string;

  socket: Socket;

  constructor(creatingBoard: CreatingBoard) {
    this.board = Common.createDOMNode('section', ['board']);
    this.container = Common.createDOMNode('div', ['board-page']);
    this.header = new Header();
    this.subheader = new Subheader();
    this.main = Common.createDomNode('div', ['board__main__wrapper']);
    this.footer = new StartPageFooter();
    this.tasksListArray = [];
    this.server = new Server();
    this.share = new Share();
    this.token = localStorage.getItem('token');
    this.path = '';
    this.socket = io(`https://trello-clone-x3tl.onrender.com`);
    this.taskInfo = new TaskInfo(this.socket);

    this.addListButton = new AddItemButton(
      'Add another list',
      'Enter list title...',
      'Add list',
      this.onAddList.bind(this)
    );
    this.listsContainer = Common.createDOMNode('div', ['lists__container', 'hidden']);
    this.buildBoard(creatingBoard);
  }

  private buildBoard(creatingBoard: CreatingBoard) {
    this.header.header.classList.add('board__header');
    this.footer.footer.classList.add('board__footer');
    this.container.append(this.header.append(creatingBoard), this.board, creatingBoard.append(), this.footer.append());
    this.main.append(this.listsContainer, this.addListButton.container, this.taskInfo.taskInfo);
    this.board.append(this.subheader.subheader, this.main);
    this.subheader.share.addEventListener('click', this.share.buildModal.bind(this.share));
  }

  async init(path: string) {
    this.socket.on('board', () => {
      this.printBoard(path);
    });
    await this.printBoard(path);

    return this.container;
  }

  async printBoard(path: string) {
    if (this.token) {
      const response = (await this.server.getDashboard(this.token, path)) as IResponseBoard;
      this.listsContainer.innerHTML = '';
      this.path = path;
      this.board.style.background = response.dashboard.color;
      this.header.header.style.background = response.dashboard.color;
      this.footer.footer.style.background = response.dashboard.color;
      this.subheader.title.textContent = response.dashboard.name;
      if (response.dashboard.public) {
        this.subheader.visibility.textContent = `Public`;
        this.subheader.visibility.classList.add('board__public');
      } else {
        this.subheader.visibility.textContent = `Private`;
        this.subheader.visibility.classList.add('board__private');
      }
      if (response.dashboard.tasklists) {
        this.renderTaskList(response.dashboard.tasklists);
      }
    } else {
      window.location.pathname = 'error';
    }
  }

  renderTaskList(taskLists: ITaskList[]) {
    taskLists.forEach(async (taskList) => {
      const list = this.createTaskList(taskList.name, taskList.id);
      taskList.tasks.forEach((task) => {
        const taskInfo = new Task(task.name, this.onShowTaskInfo.bind(this), taskList.name, task.index, task.id);
        task.labels.forEach((label) => {
          taskInfo.labelContainer.append(this.createTaskLabel(label));
        });
        list.tasksWrapper.append(taskInfo.task);
      });
    });
  }

  createTaskLabel(label: TLabel) {
    const labelElement = Common.createDomNode('span', ['task__label']);
    labelElement.setAttribute('text', label.text);
    labelElement.title = `Color: ${label.title}, title: ${label.text ? label.text : 'none'}`;
    labelElement.style.background = label.color;
    const info = localStorage.getItem('label_view');
    labelElement.textContent = info ? label.text : '';

    labelElement.addEventListener('click', (event: Event) => {
      event.stopPropagation();
      const info = localStorage.getItem('label_view');
      info ? localStorage.removeItem('label_view') : localStorage.setItem('label_view', 'true');
      const labels = document.querySelectorAll('.task__label');
      labels.forEach((data) => {
        data.textContent = data.textContent ? '' : data.getAttribute('text');
      });
    });
    return labelElement;
  }

  async onAddList(event: Event) {
    const target = event.target as HTMLButtonElement;
    const name = this.addListButton.form.data;
    this.socket.emit('board', 'change');
    if (this.token) {
      target.disabled = true;
      const data = (await this.server.createTaskList(this.token, name, this.path)) as ITaskList;
      this.createTaskList(name, data.id);
      target.disabled = false;
    } else {
      window.location.pathname = 'error';
    }
  }

  createTaskList(name: string, id: string) {
    const list = new TasksList(name, this.onShowTaskInfo.bind(this), this.socket);
    list.tasksWrapper.setAttribute('data-id', id);
    this.tasksListArray.push(list);
    this.addListButton.onClose();
    this.listsContainer.classList.remove('hidden');
    this.listsContainer.append(list.tasksList);

    this.drag(list.tasksWrapper);
    return list;
  }

  onShowTaskInfo(event: Event) {
    const target = event.currentTarget as HTMLElement;
    const { id } = target.dataset;
    if (id) {
      this.taskInfo.init(id);
    }
  }

  private drag(list: HTMLElement) {
    list.addEventListener('dragstart', (event) => {
      const target = event.target as HTMLElement;
      draggedEl = target;
      setTimeout(() => {
        target.classList.add('dragging');
      }, 0);
    });

    list.addEventListener('dragend', async (event) => {
      const target = event.target as HTMLElement;
      draggedEl = null;
      const parent = target.parentNode as HTMLElement;
      const parentId = parent.dataset.id;

      [...parent.children].forEach(async (item, index) => {
        const element = item as HTMLElement;
        const { id, title } = element.dataset;
        if (this.token && id && parentId && title) {
          await this.server.updateTask(this.token, id, parentId, title, String(index));
          this.socket.emit('board', 'change');
        }
      });

      target.classList.remove('dragging');
    });

    list.addEventListener('dragover', (event) => {
      event.preventDefault();
      const bottomTask = this.insertAboveTask(list, event.clientY);

      if (!bottomTask) {
        list.append(draggedEl as HTMLElement);
      } else {
        list.insertBefore(draggedEl as HTMLElement, bottomTask);
      }
    });
  }

  private insertAboveTask(list: HTMLElement, mousePosition: number) {
    const draggableElements = [...list.querySelectorAll('.task:not(.dragging)')] as HTMLElement[];

    let closestTask!: HTMLElement;
    let closestOffset = Number.NEGATIVE_INFINITY;

    draggableElements.forEach((task) => {
      const { top, height } = task.getBoundingClientRect();
      const offset = mousePosition - top - height / 2;
      if (offset < 0 && offset > closestOffset) {
        closestOffset = offset;
        closestTask = task;
      }
    });
    return closestTask;
  }
}
