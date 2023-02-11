import Common from '../../utils/common';
import StartPageFooter from '../startPage/sections/footer';
import Header from '../workspace/header/header';
import AddItemButton from './common/addItemButton';
import TaskInfo from './taskInfo/taskInfo';
import TasksList from './tasksList/tasksList';

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

    this.drag(list.tasksList);
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
      const target = (event.target as HTMLElement).closest('.task') as HTMLElement;
      event.dataTransfer!.setData('data', target.id);
      event.dataTransfer!.effectAllowed = "move";

      setTimeout(() => {
        target.classList.add('hidden');
      }, 0);
    });

    list.addEventListener('dragend', (event) => {
      const target = (event.target as HTMLElement).closest('.task') as HTMLElement;
      target.classList.remove('hidden');
    });

    list.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.dataTransfer!.dropEffect = "move";
    });
    
    list.addEventListener("dragenter", (event) => {
      const target = event.target as HTMLElement
      if (target.classList.contains('tasks__wrapper')) {
        target.classList.add("hovered");

      }
    });

    list.addEventListener("dragleave", (event) => {
      const target = event.target as HTMLElement
      if (target.classList.contains('tasks__wrapper')) {
        target.classList.remove("hovered");
      }
    });
    
    list.addEventListener("drop", (event) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      const data = event.dataTransfer!.getData("data");
      if (target.classList.contains('hovered')) {
        target.classList.remove("hovered");
      }
      if (target.closest('.tasks__wrapper')) {
        target.append(document.getElementById(data) as HTMLElement)
      }
    });
  }
}
