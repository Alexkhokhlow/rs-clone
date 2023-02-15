import Server from '../../server/server';
import Common from '../../utils/common';
import StartPageFooter from '../startPage/sections/footer';
import CreatingBoard from '../workspace/createBoard/createBoard';
import Header from '../workspace/header/header';
import AddItemButton from './common/addItemButton';
import TaskInfo from './taskInfo/taskInfo';
import Task from './tasksList/task/task';
import TasksList from './tasksList/tasksList';

let draggedEl: HTMLElement | null;

export default class Board {
  board: HTMLElement;

  addListButton: AddItemButton;

  listsContainer: HTMLElement;

  header: Header;

  container: HTMLElement;

  taskInfo: TaskInfo;

  footer: StartPageFooter;

  tasksListArray: TasksList[];

  server: Server;

  token: string | null;

  path: string;

  constructor(creatingBoard: CreatingBoard) {
    this.board = Common.createDOMNode('section', ['board']);
    this.container = Common.createDOMNode('div', ['board-page']);
    this.header = new Header();
    this.taskInfo = new TaskInfo();
    this.footer = new StartPageFooter();
    this.tasksListArray = [];
    this.server = new Server();
    this.token = localStorage.getItem('token');
    this.path = '';

    this.addListButton = new AddItemButton(
      'Add another list',
      'Enter list title...',
      'Add list',
      this.onAddList.bind(this)
    );
    this.listsContainer = Common.createDOMNode('div', ['lists__container', 'hidden']);
    this.container.append(this.header.append(creatingBoard), this.board, this.footer.append());
    this.board.append(this.listsContainer, this.addListButton.container, this.taskInfo.taskInfo);
  }

  async init(path: string) {
    if (this.token) {
      const response = await this.server.getDashboard(this.token, path);
      this.path = path;
      this.board.style.background = response.dashboard.color;
      response.dashboard.forEach((data: { name: string; id: string; tasklists: { tasks: { name: string }[] } }) => {
        const list = this.createTaskList(data.name, data.id);
        if (data.tasklists) {
          data.tasklists.tasks.forEach((task) => {
            const taskInfo = new Task(task.name, this.onShowTaskInfo.bind(this), data.name);
            list.tasksWrapper.append(taskInfo.task);
          });
        }
      });
    } else {
      window.location.pathname = 'error';
    }

    return this.container;
  }

  async onAddList() {
    const name = this.addListButton.form.data;
    if (this.token) {
      const data = await this.server.createTaskList(this.token, name, this.path);
      this.createTaskList(name, data.id);
    } else {
      window.location.pathname = 'error';
    }
  }

  createTaskList(name: string, id: string) {
    const list = new TasksList(name, this.onShowTaskInfo.bind(this));
    list.tasksList.setAttribute('data-id', id);
    this.tasksListArray.push(list);
    this.addListButton.onClose();
    this.listsContainer.classList.remove('hidden');
    this.listsContainer.append(list.tasksList);

    this.drag(list.tasksWrapper);
    return list;
  }

  onShowTaskInfo(event: Event) {
    const target = event.currentTarget as HTMLElement;
    const { title, list } = target.dataset;
    if (title && list) {
      this.taskInfo.taskInfo.classList.add('active');
      this.taskInfo.init(title, list);
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

    list.addEventListener('dragend', (event) => {
      const target = event.target as HTMLElement;
      draggedEl = null;

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
      console.log(task.getBoundingClientRect());
      const offset = mousePosition - top - height / 2;

      if (offset < 0 && offset > closestOffset) {
        closestOffset = offset;
        closestTask = task;
      }
    });

    return closestTask;
  }
}
