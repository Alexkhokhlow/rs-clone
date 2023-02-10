import Common from '../../utils/common';
import Header from '../workspace/header/header';
import AddItemButton from './addItemButton';
import TaskInfo from './taskInfo/taskInfo';
import TasksList from './tasksList/tasksList';

export default class Board {
  board: HTMLElement;

  addListButton: AddItemButton;

  listsContainer: HTMLElement;

  header: Header;

  container: HTMLElement;

  taskInfo: TaskInfo;

  tasksListArray : TasksList[];

  constructor() {
    this.board = Common.createDOMNode('section', ['board']);
    this.container = Common.createDOMNode('div', ['board-page']);
    this.header = new Header();
    this.taskInfo = new TaskInfo();
    this.tasksListArray = [];

    this.addListButton = new AddItemButton(
      'add another list',
      'Enter list title...',
      'Add list',
      this.onAddList.bind(this)
    );
    this.listsContainer = Common.createDOMNode('div', ['lists__container']);
    this.container.append(this.header.append(), this.board);
    this.board.append(this.listsContainer, this.addListButton.container, this.taskInfo.taskList);
  }

  onAddList() {
    const list = new TasksList(this.addListButton.form.data);
    this.tasksListArray.push(list);
    this.addListButton.onClose();
    this.listsContainer.append(list.tasksList);
  }
}
