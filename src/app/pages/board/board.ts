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
  }

  onShowTaskInfo() {
    this.taskInfo.taskInfo.classList.add('active');
  }
}
