import { io, Socket } from 'socket.io-client';
import IResponseBoard, { ITaskList, TLabel, TUser } from '../../../types/types';
import Server from '../../server/server';
import Common from '../../utils/common';
import StartPageFooter from '../startPage/sections/footer';
import CreatingBoard from '../workspace/createBoard/createBoard';
import Header from '../workspace/header/header';
import AddItemButton from './common/addItemButton';
import Share from './modalShare/share';
import Subheader from './subheader/subheader';
import TaskInfo from './taskInfo/taskInfo';
import Task from './tasksList/task/task';
import taskModal, { TaskModal } from './tasksList/task/TaskModal';
import TasksList from './tasksList/tasksList';
import UserInfo from './userInfo/userInfo';

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

  id: string;

  socket: Socket;

  taskModal: TaskModal;

  constructor(creatingBoard: CreatingBoard) {
    this.taskModal = taskModal;
    this.id = '';
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
    if (this.token) {
      this.socket.emit('boardConnection', path);
      this.socket.on('board', async () => {
        if (this.token) {
          const response = (await this.server.getDashboard(this.token, path)) as IResponseBoard;
          await this.printBoard(response);
        }
      });
      this.path = path;
      this.taskInfo.path = path;
      this.taskInfo.description.path = path;
      this.taskInfo.comment.path = path;
      this.share.path = path;
      const response = (await this.server.getDashboard(this.token, path)) as IResponseBoard;
      this.id = response.id;
      response.users.forEach(async (user) => {
        await this.getSharedUser(user.email, user.userName, user.color);
      });
      await this.taskInfo.sidebar.modalLabels.createLabels(response.labels, this.id);
      await this.printBoard(response);
      this.subheader.members.addEventListener('click', (event: Event) => {
        this.openUserInfo(event, response);
      });
    } else {
      window.location.pathname = 'error';
    }

    return this.container;
  }

  async printBoard(response: IResponseBoard) {
    this.listsContainer.innerHTML = '';
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
    await this.taskInfo.sidebar.modalLabels.changeLabels(response.labels);
    if (!response.access) {
      this.share.submit.disabled = true;
      this.addListButton.button.disabled = true;
      this.taskInfo.container.style.pointerEvents = 'none';
    }
    if (response.dashboard.tasklists) {
      this.renderTaskList(response);
    }

    this.taskModal.modal.addEventListener('click', async (e) => {
      if ((e.target as HTMLElement).classList.contains('btn-move')) {
        e.stopImmediatePropagation();
        const currentTaskList = (e.target as HTMLElement).closest('.tasks__wrapper') as HTMLElement;
        this.taskModal.getTasksLists().then((response) => {
          this.taskModal.createMoveModal(response, this.rewriteTaskList.bind(this), currentTaskList);
        });
      }
      if ((e.target as HTMLElement).classList.contains('btn-open')) {
        if (this.taskModal.selectedTask?.dataset.id) {
          await this.taskInfo.init(this.taskModal.selectedTask?.dataset.id, this.id);
        }
        document.body.append(this.taskInfo.taskInfo);

        this.taskModal.removeModalWindow();
      }
    });
  }

  renderTaskList(response: IResponseBoard) {
    const taskLists = response.dashboard.tasklists;
    taskLists.forEach(async (taskList) => {
      const list = this.createTaskList(taskList.name, taskList.id);
      list.addCardButton.button.disabled = !response.access;
      list.deleteButton.disabled = !response.access;
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
      const infoLabel = localStorage.getItem('label_view');
      if (infoLabel) {
        localStorage.removeItem('label_view');
      } else {
        localStorage.setItem('label_view', 'true');
      }
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
    if (this.token) {
      target.disabled = true;
      const data = (await this.server.createTaskList(this.token, name, this.path)) as ITaskList;
      this.createTaskList(name, data.id);
      this.socket.emit('board', this.path);
      target.disabled = false;
    } else {
      window.location.pathname = 'error';
    }
  }

  createTaskList(name: string, id: string) {
    const list = new TasksList(name, this.onShowTaskInfo.bind(this), this.socket, id, this.path, this.id);
    list.tasksWrapper.setAttribute('data-id', id);
    this.tasksListArray.push(list);
    this.addListButton.onClose();
    this.listsContainer.classList.remove('hidden');
    this.listsContainer.append(list.tasksList);

    this.drag(list.tasksWrapper);
    return list;
  }

  async onShowTaskInfo(event: Event) {
    const target = event.currentTarget as HTMLElement;
    const { id } = target.dataset;
    if (id) {
      await this.taskInfo.init(id, this.id);
    }
  }

  private async getSharedUser(id: string, name: string, color: string) {
    if (this.token) {
      const user = Common.createUserIcon(id, name, 'user__subheader', color);
      this.subheader.members.append(user);
    }
  }

  private openUserInfo(event: Event, response: IResponseBoard) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('user__subheader')) {
      const user = response.users.find((item) => item.email === target.id) as TUser;
      const userInfo = new UserInfo(user.userName, user.email, user.info);
      userInfo.openModal(target);
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

      for (const [index, item] of [...parent.children].entries()) {
        const element = item as HTMLElement;
        const { id, title } = element.dataset;
        if (this.token && id && parentId && title) {
          this.server.updateTask(this.token, id, parentId, title, String(index));
        }
      }
      this.socket.emit('board', this.path);

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

  public rewriteTaskList(taskList: HTMLElement) {
    const parentId = taskList.dataset.id;

    [...taskList.children].forEach(async (item, index) => {
      const element = item as HTMLElement;
      const { id, title } = element.dataset;
      if (this.token && id && parentId && title) {
        await this.server.updateTask(this.token, id, parentId, title, String(index));
        this.socket.emit('message', 'change');
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
