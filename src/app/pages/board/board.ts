import Common from '../../utils/common';
import StartPageFooter from '../startPage/sections/footer';
import Header from '../workspace/header/header';
import AddItemButton from './common/addItemButton';
import TaskInfo from './taskInfo/taskInfo';
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

  constructor() {
    this.board = Common.createDOMNode('section', ['board']);
    this.container = Common.createDOMNode('div', ['board-page']);
    this.header = new Header();
    this.taskInfo = new TaskInfo();
    this.footer = new StartPageFooter();
    this.tasksListArray = [];
    this.addListButton = new AddItemButton(
      'Add another list',
      'Enter list title...',
      'Add list',
      this.onAddList.bind(this)
    );
    this.listsContainer = Common.createDOMNode('div', ['lists__container', 'hidden']);
    this.container.append(this.header.append(), this.board, this.footer.append());
    this.board.append(this.listsContainer, this.addListButton.container, this.taskInfo.taskInfo);
  }

  onAddList() {
    const list = new TasksList(this.addListButton.form.data, this.onShowTaskInfo.bind(this));
    this.tasksListArray.push(list);
    this.addListButton.onClose();
    this.listsContainer.classList.remove('hidden');
    this.listsContainer.append(list.tasksList);

    this.drag(list.tasksWrapper);
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
